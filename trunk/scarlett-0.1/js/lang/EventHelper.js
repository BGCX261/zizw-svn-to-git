
var EventHelper = function () {
	this.bindings = [];
};

EventHelper.prototype.destroy = function() {
	for ( var i = 0; i < this.bindings.length; i++ ) {
		this.bindings[i].destroy();
	}
	this.bindings = [];
};

EventHelper.prototype.attachListener = function(target, type, handler, that) {
	var index = this.findBinding(target, type, handler);
	if ( -1 == index ) {
		var binding = new EventBinding(target, type, handler, that);
		this.bindings.push(binding);	
	} else {
		;
	}
};

EventHelper.prototype.detachListener = function(target, type, handler) {
	var index = this.findBinding(target, type, handler);
	if ( -1 == index ) {
		;	
	} else {
		this.bindings[i].destroy();
		this.bindings.splice(i, 1);
	}
};

EventHelper.prototype.findBinding = function(target, type, handler) {
	for ( var i = 0; i < this.bindings.length; i++ ) {
		if ( this.bindings[i].match(target, type, handler) ) {
			return i;
		}
	}
	return -1;
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
		if ( that ) {
			handler.call(that, ev);
		} else {
			handler(ev);
		}
	};
	Domutils.attachListener(this.target, this.type, this.handlerWrapper);
};

EventBinding.prototype.destroy = function() {
	Domutils.detachListener(this.target, this.type, this.handlerWrapper);
};

EventBinding.prototype.match = function(target, type, handler) {
	return this.target == target && this.type == type && this.handler == handler;
};
