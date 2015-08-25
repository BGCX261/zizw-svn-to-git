
var Login = jsloader.resolve("tarah.Login");
var MainFrame = jsloader.resolve("tarah.MainFrame");

var Application = function() {
	Application.superclass.constructor.call(this);
	this.children["login"] = new Login();
	this.bindHandlers();
};

Lang.extend(Application, Module);

Application.prototype.login_passed_handler = function(ev) {
	this.children["login"].destroy();
	delete this.children["login"];
	this.children["mainFrame"] = new MainFrame();
};
