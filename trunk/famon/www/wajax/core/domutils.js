
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
	isFF: PrototypeDistilled.isFF
};

if ( !domutils.isIE() && !domutils.isFF() ) {
	throw null;
}
