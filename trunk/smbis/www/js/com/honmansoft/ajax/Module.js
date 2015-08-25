
var EventHelper = jsloader.resolve("com.honmansoft.ajax.EventHelper");

var Module = function(element) {

	this.element = element;
	this.element.innerHTML = this.getTemplate();

	this.processChildren(this.element);
	this.processEventBindings();
};

Module.prototype.processChildren = function(elem) {
	for ( var child = elem.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType )
			continue;
		this.processMeta(child);
	}
};

Module.prototype.processMeta = function(elem) {
	var id = elem.getAttribute("hms-id");
	var className = elem.getAttribute("hms-classname");
	if ( id ) {
		var propName = this.nameForElement(id);
		this[propName] = elem;
	}
	if ( className ) {
		if ( 0 == className.indexOf('[') ) {
			;
		} else {
			var cls= jsloader.resolve(className);
			var driver = new cls(elem);
			if ( id )
				this[id] = driver;
		}
	}
	if ( !className ) {
		this.processChildren(elem);
	}
};

Module.prototype.processEventBindings = function() {
	for ( var prop in this ) {
		if ( "function" != typeof this[prop] )
			continue;
		var binding = this.parseFuncName(prop);
		if ( !binding )
			continue;
		if ( 0 == binding.target.indexOf(Module.ELEMENT_NAME_PREFIX) )
			this.attachListener(this[binding.target], binding.event, this[prop], this);
		else
			this.attachCustomListener(this[binding.target], binding.event, this[prop], this);
	}
};

Module.prototype.parseFuncName = function(funcName) {
	var result = funcName.match(/([a-zA-Z][a-zA-Z0-9]*)_([a-zA-Z][a-zA-Z0-9]*)_handler/);
	if ( result ) {
		return { target: result[1], event: result[2] };
	} else {
		return null;
	}
};

Module.prototype.nameForElement = function(id) {
	var firstChar = id.substring(0, 1);
	var rest = id.substring(1, id.length);
	return Module.ELEMENT_NAME_PREFIX + firstChar.toUpperCase() + rest;
};

Module.prototype.destroy = function() {
	if ( this.eventGroups ) {
		for ( var group in this.eventGroups ) {
			this.detachListenersByGroup(group);
		}
		delete this.eventGroups;
	}
	this.element.innerHTML = "";
};

Module.prototype.attachListener = function(target, type, handler, that, group) {
	this.getEventHelper(group).attachListener(target, type, handler, that);
};

Module.prototype.attachCustomListener = function(target, type, handler, that, group) {
	this.getEventHelper(group).attachListener(target, type, handler, that, true);
};

Module.prototype.detachListener = function(target, type, handler, group) {
	this.getEventHelper(group).detachListener(target, type, handler);
};

Module.prototype.detachListenersByGroup = function(group) {
	if ( this.eventGroups && this.eventGroups[group] ) {
		this.eventGroups[group].detachAllListeners();
		delete this.eventGroups[group];
	}
};

Module.prototype.getEventHelper = function(group) {
	if ( !group )
		group = "DEFAULT_GROUP";
	if ( !this.eventGroups )
		this.eventGroups = {};
	if ( !this.eventGroups[group] ) {
		this.eventGroups[group] = new EventHelper();
	}
	return this.eventGroups[group];
};

Module.ELEMENT_NAME_PREFIX = "elem";

Module.prototype.fireCustomEvent = function(type, event) {
	if ( !this.customListeners )
		return;
	for ( var i = 0; i < this.customListeners[type].length; i++ ) {
		if ( !this.customListeners[type][i] )
			continue;
		this.customListeners[type][i](event);
	}
};

Module.prototype.addCustomEventListener = function(type, handler) {
	if ( !this.customListeners ) {
		this.customListeners = {};
	}
	if ( !this.customListeners[type] ) {
		this.customListeners[type] = [];
	}
	this.customListeners[type].push(handler);
};

Module.prototype.removeCustomEventListener = function(type, handler) {
	for ( var i = 0; i < this.customListeners[type].length; i++ ) {
		if ( handler != this.customListeners[type][i] )
			continue;
		delete this.customListeners[type][i];
		break;
	}
};
