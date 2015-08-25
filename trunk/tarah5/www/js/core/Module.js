
var Module = function() {
	this.__module = true;
	this.children = {};
	this.eventHelper = new EventHelper();
};

Module.prototype.destroy = function() {
	if ( this.beforeDestroy ) {
		this.beforeDestroy();
	}
	for ( var prop in this.children ) {
		this.children[prop].destroy();
		delete this.children[prop];
	}
	this.eventHelper.destroy();
	if ( this.container && this.element && this.element.parentNode == this.container) {
		this.container.removeChild(this.element);
	}
	if ( this.afterDestroy ) {
		this.afterDestroy();
	}
};

// ---------------------------------------- //
// Public Methods
// ---------------------------------------- //

Module.prototype.parseDOM = function(elem) {	
	for ( var child = elem.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType ) { //is not an element
			continue;
		}
		var hmsid = child.getAttribute("hmsid");
		if ( hmsid ) {
			this["elem" + hmsid.charAt(0).toUpperCase() + hmsid.substring(1)] = child;
		}
		this.parseDOM(child);
	}
};

Module.prototype.bindHandlers = function() {
	for ( var prop in this ) {
		if ( "function" != typeof this[prop] ) {
			continue;
		}
		if ( /_handler$/.test(prop) ) {
			var type = prop.substring(prop.indexOf("_")+1, prop.lastIndexOf("_"));
			var child = prop.substring(0, prop.indexOf("_"));
			if ( /^elem/.test(child) )
				this.eventHelper.attachListener(this[child], type, this[prop], this);
			else if ( !this.children[child] )
				throw new Error("Child component not found: " + child);
			else if ( !this.children[child][type] )
				throw new Error("CustomEvent not found on " + child + ": " + type);
			else 
				this.children[child][type].addListener(this[prop], this);
		}
	}
};
