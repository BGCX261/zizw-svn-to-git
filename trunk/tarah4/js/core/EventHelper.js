
var EventHelper = function () {
	this.bindings = [];
};

EventHelper.prototype.attachListener = function(target, type, handler, that) {
	__assert(
		target && 1 == target.nodeType,
		"EventHelper.attachListener", "target is not valid", target);
	__assert(
		type && "string" == typeof type,
		"EventHelper.attachListener", "type is not valid", type);
	__assert(
		handler && "function" == typeof handler,
		"EventHelper.attachListener", "handler is not valid", handler);
	// <<
	for ( var i = 0; i < this.bindings.length; i++ ) {
		if ( this.bindings[i].match(target, type, handler) ) {
			return;
		}
	}
	var binding = new EventBinding(target, type, handler, that);
	this.bindings.push(binding);
};

EventHelper.prototype.detachListener = function(target, type, handler) {
	__assert(
		target && 1 == target.nodeType,
		"EventHelper.attachListener", "target is not valid", target);
	__assert(
		type && "string" == typeof type,
		"EventHelper.attachListener", "type is not valid", type);
	__assert(
		handler && "function" == typeof handler,
		"EventHelper.attachListener", "handler is not valid", handler);
	// <<
	for ( var i = 0; i < this.bindings.length; i++ ) {
		if ( this.bindings[i].match(target, type, handler) ) {
			this.bindings[i].destroy();
			this.bindings.splice(i, 1);
			return;
		}
	}
};

EventHelper.prototype.destroy = function() {
	for ( var i = 0; i < this.bindings.length; i++ ) {
		this.bindings[i].destroy();
	}
	this.bindings = [];
};

var EventBinding = function(target, type, handler, that) {
	this.target = target;
	this.type = type;
	this.handler = handler;
	this.handlerWrapper = function(ev) {		
		if ( Domutils.isIE() ) {
			ev.target = ev.srcElement;
			ev.relatedTarget = ev.toElement;
		}
		handler.call(that, ev);
	};
	Domutils.attachListener(this.target, this.type, this.handlerWrapper);
};

EventBinding.prototype.destroy = function() {
	Domutils.detachListener(this.target, this.type, this.handlerWrapper);
};

EventBinding.prototype.match = function(target, type, handler) {
	return this.target == target && this.type == type && this.handler == handler;
};
