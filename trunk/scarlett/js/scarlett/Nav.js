
var Nav = function(container) {
	this.container = container;
	var template = jsloader.doGet("html/Nav.html");
	this.container.innerHTML = template;
	Domutils.bindElements(this, this.container);
	//
	this.globalStatus = jsloader.getModel("scarlett.GlobalStatus");
	this.globalStatus.onchange.addListener(this.refreshStatus, this);
	this.refreshStatus();
};

Nav.prototype.destroy = function() {
	this.globalStatus.onchange.removeListener(this.refreshStatus, this);
};

Nav.prototype.refreshStatus = function() {
	var mode = this.globalStatus.mode;
	if ( this.picker ) {
		this.picker.destroy();
	}
	if ( mode == this.globalStatus.MODE_DAY ) {
		this.picker = new (jsloader.resolve("scarlett.Calendar"))(this.elemCalendar);
	} else if ( mode == this.globalStatus.MODE_MONTH ) {
		this.picker = new (jsloader.resolve("scarlett.MonthPicker"))(this.elemCalendar);
	} else if ( mode == this.globalStatus.MODE_YEAR ) {
		this.picker = new (jsloader.resolve("scarlett.YearPicker"))(this.elemCalendar);
	} else if ( mode == this.globalStatus.MODE_ALL ) {
		this.picker = new (jsloader.resolve("scarlett.YearPicker"))(this.elemCalendar);
	} else {
		;
	}
	//this.calendar = 
	//this.monthPicker = new (jsloader.resolve("scarlett.MonthPicker"))(this.elemCalendar);
	//this.yearPicker = new (jsloader.resolve("scarlett.YearPicker"))(this.elemCalendar);	
};
