
var TabPanel = jsloader.resolve("famon.TabPanel");

var AccountViewSwitcher = function(element, parentModule) {
	AccountViewSwitcher.superclass.constructor.call(this, element, parentModule);
	this.addPage("Day");
	this.addPage("Month");
	this.addPage("Year");
	this.setCurrentPage("Day");
};

lang.extend(AccountViewSwitcher, TabPanel);
