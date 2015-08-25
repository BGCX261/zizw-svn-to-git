
var LoginService = jsloader.resolve("server.LoginService");

var Login = function() {
	Login.superclass.constructor.call(this);
	this.container = document.body;
	this.element = Domutils.createElement(this.container, "DIV");
	this.element.innerHTML = jsloader.load("js/tarah/Login.html");
	this.parseDOM(this.element);
	this.bindHandlers();
	this.passed = new CustomEvent();
};

Lang.extend(Login, Module);

Login.prototype.elemLogin_click_handler = function(ev) {
	var passed = LoginService.login(this.elemUsername.value, this.elemPassword.value);
	if ( passed )
		this.passed.fire({});
	else
		this.elemError.innerHTML = "Login failed!";
};
