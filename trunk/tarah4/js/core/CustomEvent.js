
var CustomEvent = function() {
	this.listeners = [];
};

CustomEvent.prototype.addListener = function(handler, that) {
	__assert(
		handler && "function" == typeof handler,
		"CustomEvent.addListener", "handler is not a function", handler);
	// <<
	for ( var i = 0; i < this.listeners.length; i++ ) {
		if ( this.listeners[i].handler == handler )
			return;//ignore
	}
	this.listeners.push({handler:handler,that:that});
};

CustomEvent.prototype.removeListener = function(handler) {
	__assert(
		handler && "function" == typeof handler,
		"CustomEvent.removeListener", "handler is not a function", handler);
	// <<
	for ( var i = 0; i < this.listeners.length; i++ ) {
		if ( this.listeners[i].handler == handler ) {
			this.listeners.splice(i, 1);
			return;
		}
	}
};

CustomEvent.prototype.fire = function(event) {
	__assert(
		event && "object" == typeof event,
		"CustomEvent.fire", "event is not a object", event);
	// <<		
	for ( var i = 0; i < this.listeners.length; i++ ) {
		 var handler = this.listeners[i].handler;
		 var that = this.listeners[i].that;
		 if ( that ) {
		 	handler.call(that, event);
		 } else {
		 	handler(event);
		 }
	}
};
