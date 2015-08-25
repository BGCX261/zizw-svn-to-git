
var CustomEvent = function() {
	this._listeners = [];
};

CustomEvent.prototype.addListener = function(handler, that) {
	var index = this._findListener(handler);
	if ( -1 == index ) {
		this._listeners.push({handler:handler,that:that});
	} else {
		;
	}
};

CustomEvent.prototype.removeListener = function(handler) {
	var index = this._findListener(handler);
	if ( -1 == index ) {
		;
	} else {
		this._listeners.splice(index, 1);
	}
};

CustomEvent.prototype.fire = function(event) {
	for ( var i = 0; i < this._listeners.length; i++ ) {
		 var handler = this._listeners[i].handler;
		 var that = this._listeners[i].that;
		 if ( that ) {
		 	handler.call(that, event);
		 } else {
		 	handler(event);
		 }
	}
};

CustomEvent.prototype._findListener = function(handler) {
	for ( var i = 0; i < this._listeners.length; i++ ) {
		if ( this._listeners[i].handler == handler )
			return i;
	}
	return -1;
};
