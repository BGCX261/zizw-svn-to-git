
var MonthPicker = function(container) {
	this.eventHelper = new EventHelper();
	this.container = container;
	var template = jsloader.doGet("html/MonthPicker.html");
	this.container.innerHTML = template;
	Domutils.bindElements(this, this.container);
	Domutils.bindHandlers(this, this.eventHelper);
	this.calendarModel = jsloader.getModel("lang.utils.CalendarModel");
	this.calendarModel.onchange.addListener(this.refresh, this);
	this.refresh();
};

MonthPicker.prototype.destroy = function() {
	this.eventHelper.destroy();
	this.calendarModel.onchange.removeListener(this.refresh, this);
};

MonthPicker.prototype.refresh = function() {
	this.elemTitle.innerHTML = this.calendarModel.currentYear.getFullYear();
	var tempDate = new Date(this.calendarModel.currentYear);
	tempDate.setMonth(0);
	var tbody = this.elemMonthPicker;
	for ( var i = 1; i < tbody.rows.length; i++ ) {
		var row = tbody.rows[i];
		for ( var j = 0; j < row.cells.length; j++ ) {
			var cell = row.cells[j];
			cell.innerHTML = this.calendarModel.MONTHS[tempDate.getMonth()];
			cell.setAttribute("_DPYear", tempDate.getFullYear());
			cell.setAttribute("_DPMonth", tempDate.getMonth());
			var isCurrentMonth = 
				tempDate.getYear() == this.calendarModel.currentMonth.getYear() && 
				tempDate.getMonth() == this.calendarModel.currentMonth.getMonth();
			var isThisMonth =
				tempDate.getYear() == this.calendarModel.today.getYear() && 
				tempDate.getMonth() == this.calendarModel.today.getMonth(); 
			if ( isThisMonth ) {
				Domutils.removeClassName(cell, "DP_today_selected");
				Domutils.removeClassName(cell, "DP_today");
				Domutils.addClassName(cell, isCurrentMonth?"DP_today_selected":"DP_today");
			} else {
				Domutils.removeClassName(cell, "DP_today_selected");
				Domutils.removeClassName(cell, "DP_today");
			}
			if ( isCurrentMonth ) {
				Domutils.addClassName(cell, "DP_weekday_selected");
			} else {
				Domutils.removeClassName(cell, "DP_weekday_selected");
			}
			tempDate.setMonth(tempDate.getMonth()+1);
		}
	}
};

MonthPicker.prototype.elemPreMonth_mousedown_handler = function(ev) {
	this.calendarModel.previousYear();
};

MonthPicker.prototype.elemCurMonth_mousedown_handler = function(ev) {
	this.calendarModel.gotoCurrentMonth();
};

MonthPicker.prototype.elemNextMonth_mousedown_handler = function(ev) {
	this.calendarModel.nextYear();
};

MonthPicker.prototype.elemMonthPicker_mousedown_handler = function(ev) {
	if ( ev.target.tagName && ev.target.tagName == "TD" ) {
		var td = ev.target;
		if ( td.parentNode.rowIndex < 1 )
			return;
		this.calendarModel.pick(
			td.getAttribute("_DPYear"),
			td.getAttribute("_DPMonth")
		);
	}
};
