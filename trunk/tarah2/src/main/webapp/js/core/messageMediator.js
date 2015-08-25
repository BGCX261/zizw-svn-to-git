
var MessageMediator = function() {
	this.listeners = [];
};

MessageMediator.prototype.emitMessage = function(type, event) {
	for ( var i = 0; i < this.listeners.length; i++ ) {
		var listener = this.listeners[i];
		if ( type != listener.type )
			continue;
		if ( listener.that )
			listener.handler.call(listener.that, event);
		else
			listener.handler(event);
	}
};

MessageMediator.prototype.subscribeMessage = function(type, handler, that) {
	var index = this.findSubscriber(type, handler);
	if ( index >= 0 )
		return;
	this.listeners.push({type:type,handler:handler,that:that});
};

MessageMediator.prototype.unsubscribeMessage = function(type, handler) {
	var index = this.findSubscriber(type, handler);
	if ( index >= 0 ) {
		this.listeners.splic(index, 1);
	}
};

//
//
//

MessageMediator.prototype.findSubscriber = function(type, handler) {	
	for ( var i = 0; i < this.listeners.length; i++ ) {
		var listener = this.listeners[i];
		if ( type != listener.type )
			continue;
		if ( handler != listener.handler )
			continue;
		return i;
	}
	return -1;
};


//
//
//

messageMediator = new MessageMediator();
