
var Module = function(container, fullName) {
	this.children = {};
	this.eventHelper = new EventHelper();
	if ( container && fullName ) {
		this.isUIModule = true;
		this.processTemplate(container, fullName);
	} else {
		this.isUIModule = false;
	}
};

Module.prototype.destroy = function() {
	if ( this.beforeDestroy ) {
		this.beforeDestroy();
	}
	for ( var prop in this.children ) {
		this.removeChild(prop);
	}
	this.eventHelper.destroy();
	if ( this.isUIModule ) {
		this.container.removeChild(this.element);
	}
	if ( this.afterDestroy ) {
		this.afterDestroy();
	}
};

Module.prototype.removeChild = function(childName) {
	if ( !this.children[childName] ) {
		return;
	}	
	this.children[childName].destroy();
	delete this.children[childName];
};

Module.prototype.processTemplate = function(container, fullName) {	
	this.container = container;
	this.element = this.templateToElement(this.container, fullName);
	this.container.appendChild(this.element);
	this.parseDOM(this.element);
	this.bindHandlers();
};

Module.prototype.templateToElement = function(container, fullName) {
	var element, div = Domutils.createElem(container, "DIV");
	div.innerHTML = jsloader.load("template/" + fullName.replace(/\./g, "/") + ".html");
	for ( var child = div.firstChild; child; child = child.nextSibling ) {
		if ( element ) {
			if ( 1 == child.nodeType ) {
				throw new Error("Template Error, more than one root element: " + fullName);
			} else {
				;
			}
		} else {
			if ( 1 == child.nodeType ) {
				element = child;
			} else {
				;
			}
		}
	}
	if ( !element ) {
		throw new Error("Template Error, no root element found: " + fullName);
	}
	container.removeChild(div);
	return element;
};

Module.prototype.parseDOM = function(elem) {
	if ( 1 != elem.nodeType ) { //is not an element
		return;
	}
	var hmsid = elem.getAttribute("hmsid");
	if ( hmsid ) {
		this["elem" + hmsid.charAt(0).toUpperCase() + hmsid.substring(1)] = elem;
	}
	for ( var child = elem.firstChild; child; child = child.nextSibling ) {
		this.parseDOM(child);
	}
};

Module.prototype.bindHandlers = function() {
	for ( var prop in this ) {
		if ( "function" != typeof this[prop] ) {
			continue;
		}
		if ( /_handler$/.test(prop) ) {
			var target = prop.substring(0, prop.indexOf("_"));
			var type = prop.substring(prop.indexOf("_")+1, prop.lastIndexOf("_"));
			if ( /^elem/.test(target) )
				this.eventHelper.attachListener(this[target], type, this[prop], this);
			else if ( !this.children[target] )
				throw new Error("Child component not found: " + target);
			else if ( !this.children[target][type] )
				throw new Error("CustomEvent not found on " + target + ": " + type);
			else 
				this.children[target][type].addListener(this[prop], this);
		}
	}
};
