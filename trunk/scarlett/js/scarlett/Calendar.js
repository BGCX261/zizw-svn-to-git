
var Calendar = function(container) {
	this.container = container;
	this.eventHelper = new EventHelper();
	var template = jsloader.doGet("html/Calendar.html");
	this.container.innerHTML = template;
	Domutils.bindElements(this, this.container);
	Domutils.bindHandlers(this, this.eventHelper);
	//
	this.calendarModel = jsloader.getModel("lang.utils.CalendarModel");
	this.calendarModel.onchange.addListener(this.refresh, this);
	this.refresh();
};

Calendar.prototype.destroy = function() {
	this.eventHelper.destroy();
	this.calendarModel.onchange.removeListener(this.refresh, this);
};

Calendar.prototype.elemPreMonth_mousedown_handler = function(ev) {
	this.calendarModel.previousMonth();
};

Calendar.prototype.elemCurMonth_mousedown_handler = function(ev) {
	this.calendarModel.gotoCurrent();
};

Calendar.prototype.elemNextMonth_mousedown_handler = function(ev) {
	this.calendarModel.nextMonth();
};

Calendar.prototype.elemCalendar_mousedown_handler = function(ev) {
	if ( ev.target.tagName && ev.target.tagName == "TD" ) {
		var td = ev.target;
		if ( td.parentNode.rowIndex < 2 )
			return;
		this.calendarModel.pick(
			td.getAttribute("_DPYear"),
			td.getAttribute("_DPMonth"),
			td.getAttribute("_DPDate")
		);
	}
};

Calendar.prototype.refresh = function() {
	this.elemTitle.innerHTML = this.calendarModel.MONTHS[this.calendarModel.currentMonth.getMonth()] + " " + this.calendarModel.currentMonth.getFullYear();
	var matrix = this.calendarModel.getMatrix();
	for ( var i = 0; i < matrix.length; i++ ) {
		var row = this.elemCalendar.rows[i+2];
		for ( var j = 0; j < matrix.length; j++ ) {
			var day = matrix[i][j];
			var cell = row.cells[j];
			cell.innerHTML = day.date;
			cell.setAttribute("_DPYear", day.year);
			cell.setAttribute("_DPMonth", day.month);
			cell.setAttribute("_DPDate", day.date);
			if ( day.isCurrentDay ) {
				if ( day.isWeekEnd ) {
					Domutils.addClassName(cell, "DP_weekend_selected");
				} else {
					Domutils.addClassName(cell, "DP_weekday_selected");
				}
			} else {
				if ( day.isWeekEnd ) {
					Domutils.removeClassName(cell, "DP_weekend_selected");
				} else {
					Domutils.removeClassName(cell, "DP_weekday_selected");
				}
			}
			if ( day.isToday ) {
				Domutils.removeClassName(cell, "DP_today_selected");
				Domutils.removeClassName(cell, "DP_today");
				Domutils.addClassName(cell, day.isCurrentDay?"DP_today_selected":"DP_today");
			} else {
				Domutils.removeClassName(cell, "DP_today_selected");
				Domutils.removeClassName(cell, "DP_today");
			}
			if ( day.isInCurrentMonth ) {
				Domutils.removeClassName(cell, "DP_offmonth");
				Domutils.addClassName(cell, "DP_onmonth");
			} else {
				Domutils.removeClassName(cell, "DP_onmonth");
				Domutils.addClassName(cell, "DP_offmonth");
			}
		}	
	}
};
