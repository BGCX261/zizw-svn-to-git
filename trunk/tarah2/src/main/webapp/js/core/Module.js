
var Module = function(container) {
	// create element
	this.container = container;
	this.element = document.createElement("div");
	this.container.appendChild(this.element);
	// init element
	this.config = this.getConfig();
	this.element.style.position = "absolute";
	this.element.style.width = "100%";
	this.element.style.height = "100%";
	this.element.setAttribute("hmsid", this.config.hmsid);
	this.element.innerHTML = this.config.template;
	// init members
	this.eventHelper = new EventHelper();
	this.children = {};
	// bind elements
	this.bindElements(this.element);
	this.bindHandlers();	
	// reset
	this.reset();
	// after init
	this.afterInit();
	//
	// create sub modules
	//
	this.bindChildren(this.element);
	if ( this.config.children ) {
		for ( var i = 0; i < this.config.children.length; i++ ) {
			var id = this.config.children[i].id;
			var type = this.config.children[i].type;
			var slot = this.config.children[i].slot();
			this.children[id] = new (jsloader.resolve(type))(slot);
		}
	}
	domutils.log("CREATED: " + this.config.hmsid);
};

Module.prototype.destroy = function() {
	if ( this.destroyed )
		return;
	for ( var prop in this.children )
		this.children[prop].destroy();
	this.eventHelper.detachAllListeners();
	this.container.removeChild(this.element);
	this.destroyed = true;
	domutils.log("DESTROYED: " + this.config.hmsid);
};

Module.prototype.bindElements = function(elem) {
	for ( var child = elem.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType ) { //is not an element
			continue;
		}
		var hmsid = child.getAttribute("hmsid");
		if ( hmsid ) {
			this["elem" + hmsid.charAt(0).toUpperCase() + hmsid.substring(1)] = child;
		}
		this.bindElements(child);
	}
};

Module.prototype.bindChildren = function(elem) {
	for ( var child = elem.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType ) { //is not an element
			continue;
		}
		var hmsid = child.getAttribute("hmsid");
		var hmstype = child.getAttribute("hmstype");
		var isSlot = !!hmstype;
		if ( isSlot ) {
			this.children[hmsid] = new (jsloader.resolve(hmstype))(child);
		} else {
			this.bindChildren(child);
		}
	}
};

Module.prototype.bindHandlers = function() {
	for ( var prop in this ) {
		if ( "function" != typeof this[prop] ) {
			continue;
		}
		if ( prop.indexOf("_handler") < 0 || prop.indexOf("_handler") + 8 != prop.length ) {
			continue;
		}
		var type = prop.substring(prop.indexOf("_")+1, prop.lastIndexOf("_"));
		var elem = prop.substring(0, prop.indexOf("_"));
		this.eventHelper.attachListener(this[elem], type, this[prop], this);
	}
};

// reset
// afterInit
// getConfig