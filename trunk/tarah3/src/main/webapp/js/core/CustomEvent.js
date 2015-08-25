
var CustomEvent = function() {
	this.listeners = [];
};

CustomEvent.prototype.addListener = function(handler, that) {
	for ( var i = 0; i < this.listeners.length; i++ ) {
		if ( this.listeners[i].handler == handler )
			return;
	}
	this.listeners.push({handler:handler,that:that});
};

CustomEvent.prototype.removeListener = function(handler) {		
	for ( var i = 0; i < this.listeners.length; i++ ) {
		if ( this.listeners[i].handler == handler ) {
			this.listeners.splice(i, 1);
			return;
		}
	}
};

CustomEvent.prototype.fire = function(event) {		
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
