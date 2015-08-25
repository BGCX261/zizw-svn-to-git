
var Module = jsloader.resolve("wajax.core.Module");

var Login = function(element, parentModule) {
	Login.superclass.constructor.call(this, element, parentModule);
};

lang.extend(Login, Module);

Login.prototype.getTemplate = function() {
	return "<table>\
		<tr>\
			<td>\
				Username:\
			</td>\
			<td>\
				<input hmsid='username'/>\
			</td>\
		</tr>\
		<tr>\
			<td>\
				Password:\
			</td>\
			<td>\
				<input hmsid='password' type='password'/>\
			</td>\
		</tr>\
		<tr>\
			<td>\
			</td>\
			<td>\
				<input hmsid='btnLogin' type='button' value='Login'/>\
			</td>\
		</tr>\
		<tr>\
			<td>\
			</td>\
			<td>\
				<span hmsid='errorInfo'></span>\
			</td>\
		</tr>\
	</table>";
};

Login.prototype.elemBtnLogin_click_handler = function(ev) {
	var me = this;
	this.fireCustomEvent("login", {
			username: this.elemUsername.value,
			password: this.elemPassword.value,
			setErrorInfo: function(msg) {
				me.elemErrorInfo.innerHTML = msg;
			},
			toString: function() {
				return "username: " + this.username + "\n" + "password: " + this.password;
			}
		});
};
