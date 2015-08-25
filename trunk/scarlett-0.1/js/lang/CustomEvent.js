
var CustomEvent = function() {
	this.listeners = [];
};

CustomEvent.prototype.addListener = function(handler, that) {
	var index = this.findListener(handler);
	if ( -1 == index ) {
		this.listeners.push({handler:handler,that:that});
	} else {
		;
	}
};

CustomEvent.prototype.removeListener = function(handler) {
	var index = this.findListener(handler);
	if ( -1 == index ) {
		;
	} else {
		this.listeners.splice(index, 1);
	}
};

CustomEvent.prototype.fire = function() {
	for ( var i = 0; i < this.listeners.length; i++ ) {
		 var handler = this.listeners[i].handler;
		 var that = this.listeners[i].that;
		 if ( that ) {
		 	handler.apply(that, arguments);
		 } else {
		 	handler.apply(arguments);
		 }
	}
};

CustomEvent.prototype.findListener = function(handler) {
	for ( var i = 0; i < this.listeners.length; i++ ) {
		if ( this.listeners[i].handler == handler )
			return i;
	}
	return -1;
};
