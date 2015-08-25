
var Module = jsloader.resolve("wajax.core.Module");
var Welcome = jsloader.resolve("famon.Welcome");
var Workspace = jsloader.resolve("famon.Workspace");

var Application = function(element, parentModule) {
	Application.superclass.constructor.call(this, element, parentModule);
	this.welcome = new Welcome(element, this);
	this.attachCustomListener(this.welcome, "login", this.doOnLogin, this);
};

lang.extend(Application, Module);

Application.prototype.doOnLogin = function(ev) {
	this.welcome.destruct();
	delete this.welcome;
	//
	var workspace = new Workspace(this.element, this);
};
