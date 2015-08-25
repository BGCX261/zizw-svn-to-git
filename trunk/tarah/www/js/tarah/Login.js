
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
		this.fireCustomEvent("login");
	} else {
		this.error = document.createElement("span");
		this.element.appendChild(this.error);
		this.error.setAttribute("hmsid", "error");
	}
};

Login.prototype.getTemplate = function() {
	return "<table>\
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
	</table>";
};

Login.prototype.getHmsid = function() {
	return "Login";
};
