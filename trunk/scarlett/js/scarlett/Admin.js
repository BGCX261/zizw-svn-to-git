
var Admin = function(container) {
	Admin.superclass.constructor.call(this, container, "html/Admin.html");
	this.refresh();
};

Lang.extend(Admin, Component);

Admin.prototype.refresh = function() {
	while ( this.elemHeader.nextSibling ) {
		this.elemHeader.parentNode.removeChild(this.elemHeader.nextSibling);
	}
};

Admin.prototype.elemCreate_click_handler = function(ev) {
	var admin = jsloader.resolve("scarlett.AdminService");
	var created = admin.createUser(this.elemKeyName.value, this.elemAlias.value, this.elemPassword.value);
	alert(created)
};
