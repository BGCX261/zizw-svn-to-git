
var EventHelper = function () {
	this.bindings = [];
};

EventHelper.prototype.attachListener = function(target, type, handler, that) {
	for ( var i = 0; i < this.bindings.length; i++ ) {
		if ( this.bindings[i].target == target &&
			this.bindings[i].type == type &&
			this.bindings[i].handler == handler ) {
			return;
		}
	}
	var binding = new EventBinding(target, type, handler, that);
	this.bindings.push(binding);
};

EventHelper.prototype.detachListener = function(target, type, handler) {
	for ( var i = 0; i < this.bindings.length; i++ ) {
		if ( this.bindings[i].target == target &&
			this.bindings[i].type == type &&
			this.bindings[i].handler == handler ) {
			binding = this.bindings[i];
			binding.destroy();
		}
	}
};

EventHelper.prototype.detachAllListeners = function() {
	for ( var i = 0; i < this.bindings.length; i++ ) {
		this.bindings[i].destroy();
	}
};

EventHelper.prototype.destroy = function() {
	this.detachAllListeners();
};

var EventBinding = function(target, type, handler, that) {
	this.target = target;
	this.type = type;
	this.handler = handler;
	this.handlerWrapper = function(ev) {		
		if ( domutils.isIE() ) {
			ev.target = ev.srcElement;
			ev.relatedTarget = ev.toElement;
		}
		handler.call(that, ev);
	};
	domutils.attachListener(this.target, this.type, this.handlerWrapper);
};

EventBinding.prototype.destroy = function() {
	domutils.detachListener(this.target, this.type, this.handlerWrapper);
};
