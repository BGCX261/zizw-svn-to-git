
var Login = jsloader.resolve("tarah.Login");
var MainFrame = jsloader.resolve("tarah.MainFrame");

var Application = function() {
	Application.superclass.constructor.call(this);
	this.children["login"] = new Login(document.body);
	this.bindHandlers();
};

Lang.extend(Application, Module);

Application.prototype.login_onPassed_handler = function() {
	this.children["login"].destroy();
	delete this.children["login"];
	this.children["mainFrame"] = new MainFrame(document.body);
};
