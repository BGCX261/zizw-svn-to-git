
var Login = function(container) {
	Login.superclass.constructor.call(this, container, "html/Login.html");
};

Lang.extend(Login, Component);

Login.prototype.elemLogin_click_handler = function(ev) {
	var admin = jsloader.resolve("scarlett.AdminService")
	var passed = admin.login(this.elemUsername.value, this.elemPassword.value);
	if ( passed ) {
		window.location = "/";
	} else {
		alert("failed");
	}
};