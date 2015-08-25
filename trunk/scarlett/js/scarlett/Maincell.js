
var Maincell = function(container) {
	this.eventHelper = new EventHelper();
	this.container = container;
	var template = jsloader.doGet("html/Maincell.html");
	this.container.innerHTML = template;
	Domutils.bindElements(this, this.container);
	Domutils.bindHandlers(this, this.eventHelper);
	this.globalStatus = jsloader.getModel("scarlett.GlobalStatus");
	this.globalStatus.onchange.addListener(this.refreshStatus, this);
	this.calendarModel = jsloader.getModel("lang.utils.CalendarModel");
	this.calendarModel.onchange.addListener(this.refreshDate, this);
	this.window_resize_handler();
	this.refreshStatus();
};

Maincell.prototype.destroy = function() {
	this.eventHelper.destroy();
	this.globalStatus.onchange.removeListener(this.refreshStatus, this);
	this.calendarModel.onchange.removeListener(this.refreshDate, this);
};

Maincell.prototype.refreshStatus = function() {
	var mode = this.globalStatus.mode;
	this.pickMode(mode);
	this.refreshDate();
};

Maincell.prototype.refreshDate = function() {
	var mode = this.globalStatus.mode;
	var text = "";
	var buttonLabel = "";
	var buttonDisabled = true;
	if ( mode == this.globalStatus.MODE_DAY ) {
		text =  
			this.calendarModel.MONTHS[this.calendarModel.currentDay.getMonth()] + " " +
			this.calendarModel.currentDay.getDate() + ", " +
			this.calendarModel.currentDay.getFullYear();
		buttonLabel = "Today"
		buttonDisabled = this.calendarModel.isToday();
	} else if ( mode == this.globalStatus.MODE_MONTH ) {
		text =  
			this.calendarModel.MONTHS[this.calendarModel.currentMonth.getMonth()] + " " +
			this.calendarModel.currentMonth.getFullYear();
		buttonLabel = "This Month"
		buttonDisabled = this.calendarModel.isThisMonth();
	} else if ( mode == this.globalStatus.MODE_YEAR ) {
		;
	} else if ( mode == this.globalStatus.MODE_ALL ) {
		;
	} else {
		throw null;
	}
	this.elemTitle.innerHTML = text;
	this.elemToday.innerHTML = buttonLabel;
	this.elemToday.disabled = buttonDisabled;
};

Maincell.prototype.elemPreDay_mousedown_handler = function() {
	var mode = this.globalStatus.mode;
	if ( mode == this.globalStatus.MODE_DAY ) {
		this.calendarModel.previous();
	} else if ( mode == this.globalStatus.MODE_MONTH ) {
		this.calendarModel.previousMonth();
	} else if ( mode == this.globalStatus.MODE_YEAR ) {
		throw null;
	} else if ( mode == this.globalStatus.MODE_ALL ) {
		throw null;
	} else {
		throw null;
	}
};

Maincell.prototype.elemNextDay_mousedown_handler = function() {
	var mode = this.globalStatus.mode;
	if ( mode == this.globalStatus.MODE_DAY ) {
		this.calendarModel.next();
	} else if ( mode == this.globalStatus.MODE_MONTH ) {
		this.calendarModel.nextMonth();
	} else if ( mode == this.globalStatus.MODE_YEAR ) {
		throw null;
	} else if ( mode == this.globalStatus.MODE_ALL ) {
		throw null;
	} else {
		throw null;
	}
};

Maincell.prototype.elemToday_mousedown_handler = function() {
	this.calendarModel.gotoToday();
};

Maincell.prototype.elemModePicker_mousedown_handler = function(ev) {
	var mode = ev.target.getAttribute("__modeid");
	if ( !mode ) {
		return;
	}
	this.globalStatus.setMode(mode);
};

Maincell.prototype.pickMode = function(mode) {
	var allModes = [this.elemModeDay, this.elemModeMonth, this.elemModeYear, this.elemModeAll];
	for ( var i = 0; i < allModes.length; i++ ) {
		var divs = allModes[i].getElementsByTagName("div");
		divs[0].style.backgroundColor = "#E8EEF7";
		divs[1].style.backgroundColor = "#E8EEF7";
		Domutils.removeClassName(divs[2], "modelinkOff");
		Domutils.removeClassName(divs[2], "modelinkOn");
		Domutils.addClassName(divs[2], "modelinkOff");
	}
	var divs = this["elem"+mode].getElementsByTagName("div");
	divs[0].style.backgroundColor = "#C3D9FF";
	divs[1].style.backgroundColor = "#C3D9FF";
	Domutils.removeClassName(divs[2], "modelinkOff");
	Domutils.removeClassName(divs[2], "modelinkOn");
	Domutils.addClassName(divs[2], "modelinkOn");
};

Maincell.prototype.window_resize_handler = function() {
	var viewport = Domutils.getViewport();
	var gridContainerHeight = viewport.height - 85;
	this.elemGridContainer.style.height = gridContainerHeight + "px";
};
