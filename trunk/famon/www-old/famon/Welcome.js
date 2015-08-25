
var Module = jsloader.resolve("wajax.core.Module");

var Welcome = function(element, parentModule) {
	Welcome.superclass.constructor.call(this, element, parentModule);
	this.calcAndSetLoginPosition();
	document.title = "Welcome to Famon";
};

lang.extend(Welcome, Module);

Welcome.prototype.destruct = function() {
	document.title = "";
	Welcome.superclass.destruct.call(this);
};

Welcome.prototype.getTemplate = function() {
	return "<span hmsid='greet'>Welcome to Famon</span>\
	<div hmsid='login' hmstype='famon.Login' style='position: absolute'>Login</div>";
};

Welcome.prototype.elemWindow_resize_handler = function(ev) {
	this.calcAndSetLoginPosition();
};

Welcome.prototype.calcAndSetLoginPosition = function() {
	var viewportSize = domutils.getDimension(document.body);
	var loginSize = domutils.getDimension(this.elemLogin);
	this.elemLogin.style.left = ( viewportSize.width - loginSize.width ) / 2 + "px";
	this.elemLogin.style.top = ( viewportSize.height - loginSize.height ) / 2 + "px";
};
