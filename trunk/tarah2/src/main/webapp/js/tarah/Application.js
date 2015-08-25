
var Login = jsloader.resolve("tarah.Login");
var LoginService = jsloader.resolve("server.LoginService");
var MainFrame = jsloader.resolve("tarah.MainFrame");

var Application = function() {
	this.init();
	this.createLogin();
};

Application.prototype.destroy = function() {
	this.destroyLogin();
	this.destroyMainFrame();
	this.eventHelper.destroy();
};

Application.prototype.init = function() {
	this.eventHelper = new EventHelper();
	this.eventHelper.attachListener(window, "resize", this.window_resize_handler, this);
	this.eventHelper.attachListener(document, "keydown", function(ev){if(192==ev.keyCode)this.destroy();}, this);
	messageMediator.subscribeMessage("login_passed", function(userInfo) {
		this.destroyLogin();
		this.createMainFrame(userInfo);
	}, this);
};

Application.prototype.window_resize_handler = function() {
	if ( this.login ) {
		this.login.reset();
	}
	if ( this.mainFrame ) {
		this.mainFrame.reset();
	}
};

Application.prototype.createLogin = function() {
	this.login = new Login(document.body);
	this.login.setLoginService(LoginService);
};

Application.prototype.destroyLogin = function() {
	if ( this.login ) {
		this.login.destroy();
		delete this.login;
	}	
};

Application.prototype.createMainFrame = function(username) {	
	jsloader.register("userInfo", username);
	this.mainFrame = new MainFrame(document.body);
	this.mainFrame.resetPosition();
	this.mainFrame.setUsername(username);
};

Application.prototype.destroyMainFrame = function() {
	if ( this.mainFrame ) {
		this.mainFrame.destroy();
		delete this.mainFrame;
	}
};
