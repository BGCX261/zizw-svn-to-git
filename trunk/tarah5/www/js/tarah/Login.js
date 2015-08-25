
var LoginService = jsloader.resolve("server.LoginService");

var Login = function(container) {
	Login.superclass.constructor.call(this);
	this.container = container;
	this.element = Domutils.createElem(this.container, "DIV");
	this.element.innerHTML = jsloader.load("template/tarah/Login.html");
	this.parseDOM(this.element);
	this.bindHandlers();
	this.onPassed = new CustomEvent();
};

Lang.extend(Login, Module);

Login.prototype.elemLoginButton_click_handler = function() {
	if ( LoginService.login(this.elemUsernameInput.value, this.elemPasswordInput.value) ) {
		this.onPassed.fire();
	} else {
		this.elemLoginError.innerHTML = "Login failed.";
	}
};
