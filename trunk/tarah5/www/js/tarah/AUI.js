
var AUI = new function() {
	this.LOGIN_BOX = "//table[@hmsid='loginBox']";
	this.LOGIN_BOX_USERNAME_LABEL = this.LOGIN_BOX+"//td[@hmsid='usernameLabel']";
	this.LOGIN_BOX_USERNAME_INPUT = this.LOGIN_BOX+"//input[@hmsid='usernameInput']";
	this.LOGIN_BOX_PASSWORD_LABEL = this.LOGIN_BOX+"//td[@hmsid='passwordLabel']";
	this.LOGIN_BOX_PASSWORD_INPUT = this.LOGIN_BOX+"//input[@hmsid='passwordInput']";
	this.LOGIN_BOX_LOGIN_BUTTON = this.LOGIN_BOX+"//input[@hmsid='loginButton']";
	this.LOGIN_BOX_LOGIN_ERROR = this.LOGIN_BOX+"//td[@hmsid='loginError']";
	//
	this.GRID = "//div[@hmsid='grid']";
	this.GRID_TITLE = this.GRID+"//span[@hmsid='gridTitle']";
	this.GRID_HEADER = this.GRID+"//tbody[@hmsid='gridHeader']";
	this.GRID_BODY = this.GRID+"//tbody[@hmsid='gridBody']";
	//
	this.DATE_CONTROLLER = "//div[@hmsid='dateController']";
	this.DATE_CONTROLLER_YEAR_LABEL = this.DATE_CONTROLLER+"//span[@hmsid='yearLabel']";
	this.DATE_CONTROLLER_YEAR_INPUT = this.DATE_CONTROLLER+"//input[@hmsid='yearInput']";
	this.DATE_CONTROLLER_MONTH_LABEL = this.DATE_CONTROLLER+"//span[@hmsid='monthLabel']";
	this.DATE_CONTROLLER_MONTH_INPUT = this.DATE_CONTROLLER+"//input[@hmsid='monthInput']";
	this.DATE_CONTROLLER_DAY_LABEL = this.DATE_CONTROLLER+"//span[@hmsid='dayLabel']";
	this.DATE_CONTROLLER_DAY_INPUT = this.DATE_CONTROLLER+"//input[@hmsid='dayInput']";
	this.DATE_CONTROLLER_LOAD_BUTTON = this.DATE_CONTROLLER+"//input[@hmsid='loadButton' and @type='button']";
}();
