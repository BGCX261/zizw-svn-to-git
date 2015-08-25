
var EventHelper = function() {
	this.bindingList = {};
};

EventHelper.prototype.attachListener = function(target, type, handler, that, isCustomEvent) {
	if ( this.findBinding(target, type, handler) )
		return;
	var binding = isCustomEvent ?
		new CustomEventBinding(target, type, handler, that):
		new DOMEventBinding(target, type, handler, that);
	this.addToList(binding);
};
	
EventHelper.prototype.detachListener = function(target, type, handler) {
	var binding = this.findBinding(target, type, handler);
	if ( !binding )
		return;
	this.removeFromList(binding);
	binding.destroy();
};

EventHelper.prototype.detachAllListeners = function() {
	for ( var type in this.bindingList ) {
		for ( var i = 0; i < this.bindingList[type].length; i++) {
			this.bindingList[type][i].destroy();
			delete this.bindingList[type][i];
		}
		delete this.bindingList[type];
	}
};

EventHelper.prototype.addToList = function(binding) {
	if ( !this.bindingList[binding.type] )
		this.bindingList[binding.type] = [];
	binding.index = this.bindingList[binding.type].length;	
	this.bindingList[binding.type].push(binding);
};	

EventHelper.prototype.removeFromList = function(binding) {
	var bindingListForThisType = this.bindingList[binding.type];
	bindingListForThisType.splice(binding.index, 1);
	for ( var i = binding.index; i < bindingListForThisType.length; i++ ) {
		bindingListForThisType[i].index--;
	}
	if ( 0 == bindingListForThisType.length )
		delete bindingListForThisType;
};	

EventHelper.prototype.findBinding = function(target, type, handler) {
	if ( !this.bindingList[type] )
		return null;
	var list = this.bindingList[type];
	for ( var i = 0; i < list.length; i++ ) {
		if ( list[i].target == target && list[i].handler == handler )
			return list[i];
	}
	return null;
};

var EventBinding = function(target, type, handler, that) {
	
	this.target = target;
	this.type = type;
	this.handler = handler;
	this.that = that;
	this.handlerWrapper = this.getHandlerWrapper(handler, that);

	this.doAttach(this.target, this.type, this.handlerWrapper);
};

EventBinding.prototype.destroy = function() {
	
	this.doDetach(this.target, this.type, this.handlerWrapper);

	delete this.type;
	delete this.target;
	delete this.handler;
	delete this.that;
	delete this.handlerWrapper;
};

var DOMEventBinding = function(target, type, handler, that) {
	DOMEventBinding.superclass.constructor.call(this, target, type, handler, that);
};

lang.extend(DOMEventBinding, EventBinding);

DOMEventBinding.prototype.getHandlerWrapper = function(handler, that) {
	return function(ev) {
		if ( !ev )
			ev = window.event;
		if ( !ev.target )
			ev.target = ev.srcElement;
		handler.call(that, ev);
	};
};

DOMEventBinding.prototype.doAttach = function(target, type, handler) {
	if ( domutils.isIE() ) {
		target.attachEvent("on"+type, handler);
	} else {
		target.addEventListener(type, handler, false);
	}	
};

DOMEventBinding.prototype.doDetach = function(target, type, handler) {	
	if ( domutils.isIE() ) {
		target.detachEvent("on"+type, handler);
	} else {
		target.removeEventListener(type, handler, false);
	}
};


var CustomEventBinding = function(target, type, handler, that) {
	CustomEventBinding.superclass.constructor.call(this, target, type, handler, that);
};

lang.extend(CustomEventBinding, EventBinding);

CustomEventBinding.prototype.getHandlerWrapper = function(handler, that) {
	return function(ev) {
		handler.call(that, ev);
	};
};

CustomEventBinding.prototype.doAttach = function(target, type, handler) {
	target.addCustomEventListener(type, handler);
};

CustomEventBinding.prototype.doDetach = function(target, type, handler) {
	target.removeCustomEventListener(type, handler);
};

