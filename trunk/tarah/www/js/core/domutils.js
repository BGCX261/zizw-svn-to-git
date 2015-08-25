
var PrototypeDistilled = {

	isIE: function() {
		return !!(window.attachEvent && !window.opera);
	},
	
	isFF: function() {
		return navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1;
	}	
};

var domutils = {
	isIE: PrototypeDistilled.isIE,
	isFF: PrototypeDistilled.isFF,
	attachListener: function(target, type, handler) {
		if ( this.isIE() ) {
			target.attachEvent("on"+type, handler);
		} else {
			target.addEventListener(type, handler, false);
		}
	},	
	detachListener: function(target, type, handler) {	
		if ( this.isIE() ) {
			target.detachEvent("on"+type, handler);
		} else {
			target.removeEventListener(type, handler, false);
		}
	},
	_confirm: confirm,
	confirm: function(message) {
		var func = this._confirm;
		return func(message);
	},
	_alert: alert,
	alert: function(message) {
		var func = this._alert;
		return func(message);
	}
};

if ( !domutils.isIE() && !domutils.isFF() ) {
	throw null;
}
