
var Login = function(container) {
	Login.superclass.constructor.call(this, container);
};

lang.extend(Login, Module);

Login.prototype.setLoginService = function(loginService) {
	this.loginService = loginService;
};

Login.prototype.elemLogin_click_handler = function() {
	var result = this.loginService.login(this.elemUsername.value, this.elemPassword.value);
	if ( result ) {
		messageMediator.emitMessage("login_passed", result);
	} else {
		this.elemError.innerHTML = "Login Failed!";
	}
};

Login.prototype.reset = function() {
	this.elemLoginBox.style.left = (this.element.offsetWidth-this.elemLoginBox.offsetWidth)/2 + "px";
	this.elemLoginBox.style.top = (this.element.offsetHeight-this.elemLoginBox.offsetHeight)/2 + "px";
};

Login.prototype.afterInit = function() {
	this.elemUsername.focus();
}

Login.prototype.getConfig = function() {return{
	hmsid: "Login",
	template: "<table hmsid='loginBox' style='position: absolute'>\
		<tr>\
			<td>Username:</td>\
			<td><input hmsid='username' type='text'/></td>\
		</tr>\
		<tr>\
			<td>Password:</td>\
			<td><input hmsid='password' type='password'/></td>\
		</tr>\
		<tr>\
			<td></td>\
			<td><input hmsid='login' type='button' value='Login' /></td>\
		</tr>\
		<tr>\
			<td></td>\
			<td><span hmsid='error'></span></td>\
		</tr>\
	</table>"
}};
