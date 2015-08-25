
var TabPanel = jsloader.resolve("tarah.TabPanel");

var TabBook = function(container) {
	TabBook.superclass.constructor.call(this, container);
};

lang.extend(TabBook, TabPanel);

TabBook.prototype.afterInit = function() {
	TabBook.superclass.afterInit.call(this);
	this.add("Day");
	this.add("Week");
	this.add("Month");
	this.add("Year");
	this.activate("Day");
};

TabBook.prototype.getConfig = function() {
	var me = this;
	var config = TabBook.superclass.getConfig.call(this);
	config.children = [
		{
			id: "sheet",
			type: "tarah.DaySheet",
			slot: function() { return me.getPage("Day"); }
		},
		{
			id: "chartPanel",
			type: "tarah.ChartPanel",
			slot: function() { return me.getPage("Week"); }
		}
	];
	return config;	
};

