
var EventHelper = function () {
};

EventHelper.prototype.attachListener = function(target, type, handler, that) {
	new EventBinding(target, type, handler, that);
};

var EventBinding = function(target, type, handler, that) {
	
	var handlerWrapper = function(ev) {		
		if ( domutils.isIE() ) {
			ev.target = ev.srcElement;
		}
		handler.call(that, ev);
	};

	if ( domutils.isIE() ) {
		target.attachEvent("on"+type, handlerWrapper);
	} else {
		target.addEventListener(type, handlerWrapper, false);
	}
};
