
var Module = function(container) {
	this.container = container;
	this.element = document.createElement("div");
	this.container.appendChild(this.element);
	this.element.setAttribute("hmsid", this.getHmsid());
	this.element.innerHTML = this.getTemplate();
	//
	this.eventHelper = new EventHelper();
	this.customEvents = {};
	//	
	this.bindElements(this.element);
	this.bindHandlers();	
};

Module.prototype.destroy = function() {
	if ( this.destroyed )
		return;
	this.eventHelper.detachAllListeners();		
	this.container.removeChild(this.element);
	this.destroyed = true;
};

Module.prototype.bindElements = function(elem) {
	for ( var child = elem.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType ) { //is not an element
			continue;
		}
		var hmsid = child.getAttribute("hmsid");
		if ( hmsid ) {
			hmsid = "elem" + hmsid.charAt(0).toUpperCase() + hmsid.substring(1);
			this[hmsid] = child;
		}
		this.bindElements(child);
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

Module.prototype.addCustomEventListener = function(type, handler, that) {
	var eventList = this.customEvents[type];
	if ( !eventList ) {
		eventList = [];
		this.customEvents[type] = eventList;
	}
	eventList.push({handler:handler,that:that});
};

Module.prototype.fireCustomEvent = function(type) {
	var eventList = this.customEvents[type];
	if ( !eventList ) {
		return;
	}
	for ( var i = 0; i < eventList.length; i++ ) {
		if ( !eventList[i] )
			return;
		eventList[i].handler.call(eventList[i].that);
	}
};
