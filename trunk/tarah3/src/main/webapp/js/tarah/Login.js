
var Module = jsloader.resolve("ui.Module");
var CustomEvent = jsloader.resolve("core.CustomEvent");

var Login = function(container) {
	Login.superclass.constructor.call(this, container);
	// members
	this.inUsername = null;
	this.inPassword = null;
	this.btnLogin = null;
	this.tdError = null;
	this.loginService = null;
	this.eventPassed = new CustomEvent();
	// create table
	var table = document.createElement("table");
	this.element.appendChild(table);
	this.tblLogin = table;
	// create tbody
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	// create row: username
	this.createUsernameRow(tbody);
	// create row: password
	this.createPasswordRow(tbody);
	// create row: login button
	this.createButtonRow(tbody);
	// create row: login error
	this.createErrorRow(tbody);
	// bind handlers
	this.eventHelper.attachListener(this.btnLogin, "click", this.btnLogin_click_handler, this);
	// reset
	this.reset();
};

lang.extend(Login, Module);

Login.prototype.setLoginService = function(loginService) {
	this.loginService = loginService;
};

Login.prototype.btnLogin_click_handler = function(ev) {
	var username = this.inUsername.value;
	var password = this.inPassword.value;
	var passed = this.loginService.login(username, password);
	if ( passed ) {
		this.eventPassed.fire();
	} else {
		this.tdError.innerHTML = ERROR_LOGIN;
	}
};

Login.prototype.createUsernameRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.createLabelCell(tr, LABEL_USERNAME);
	this.createUsernameCell(tr);
	return tr;
};

Login.prototype.createLabelCell = function(tr, labelString) {
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = labelString;
	return td;
};

Login.prototype.createUsernameCell = function(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	td.appendChild(input);
	this.inUsername = input;
	return td;
};

Login.prototype.createPasswordRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.createLabelCell(tr, LABEL_PASSWORD);
	this.createPasswordCell(tr);
	return tr;
};

Login.prototype.createPasswordCell = function(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	input.type = "password";
	td.appendChild(input);
	this.inPassword = input;
	return td;
};

Login.prototype.createButtonRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.createLabelCell(tr, "");
	this.createButtonCell(tr);
	return tr;
};

Login.prototype.createButtonCell = function(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	var input = document.createElement("input");
	input.type = "button";
	td.appendChild(input);
	input.value = LABEL_LOGIN;
	this.btnLogin = input;
	return td;
};

Login.prototype.createErrorRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.createLabelCell(tr, "");
	this.tdError = this.createLabelCell(tr, "&nbsp;");
	return tr;
};

Login.prototype.reset = function() {
	this.tblLogin.style.position = "absolute";
	this.tblLogin.style.left = (this.element.offsetWidth-this.tblLogin.offsetWidth)/2 + "px";
	this.tblLogin.style.top = (this.element.offsetHeight-this.tblLogin.offsetHeight)/2 + "px";
};

var LABEL_USERNAME = "Username";
var LABEL_PASSWORD = "Password";
var LABEL_LOGIN = "Login";
var ERROR_LOGIN = "Login failed!";
