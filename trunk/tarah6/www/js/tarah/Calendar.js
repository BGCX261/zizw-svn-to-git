
var Calendar = function(container, date) {
	this.calendarModel = new CalendarModel(date);
	Calendar.superclass.constructor.call(this, container, fullName);
	this.refreshCalendarView();
	this.onOkay = new CustomEvent();
	this.onCancel = new CustomEvent();
};

Lang.extend(Calendar, Module);

Calendar.prototype.refreshCalendarView = function() {
	this.elemYear.innerHTML = this.calendarModel.getYear();
	this.elemMonth.innerHTML = this.calendarModel.getMonth();
	var firstDay = this.calendarModel.getFirstDay();
	var lastDay = this.calendarModel.getLastDay();
	var selectedDay = this.calendarModel.getSelectedDay();
	var matrix = this.calendarModel.getMatrix();
	for ( var i = 0; i < matrix.length; i++ ) {
		var row = matrix[i];
		var tr = this.elemDays.rows[i];
		for ( var j = 0; j < row.length; j++ ) {
			var cell = row[j];
			var td = tr.cells[j];
			td.innerHTML = cell;
			if ( firstDay.week < i && i < lastDay.week  ) {
				this.setCurrentMonthStyle(td);
			} else if ( firstDay.week == i && firstDay.day <= j ) {
				this.setCurrentMonthStyle(td);
			} else if ( lastDay.week == i && lastDay.day >= j ) {
				this.setCurrentMonthStyle(td);
			} else {
				this.clearCurrentMonthStyle(td);
			}
			if ( selectedDay.week == i && selectedDay.day == j ) {
				this.setSelectedDayStyle(td);
			} else {
				this.clearSelectedDayStyle(td);
			}
		}
	}
};
Calendar.prototype.elemPrevYear_mousedown_handler = function(ev) {
	this.calendarModel.prevYear();
	this.refreshCalendarView();
};

Calendar.prototype.elemNextYear_mousedown_handler = function(ev) {
	this.calendarModel.nextYear();
	this.refreshCalendarView();
};

Calendar.prototype.elemDays_mousedown_handler = function(ev) {
	var target = ev.target;
	if ( "TD" != target.tagName )
		return;
	var rowIndex = target.parentNode.rowIndex;
	var cellIndex = target.cellIndex;
	this.calendarModel.selectDay(rowIndex, cellIndex);
	this.refreshCalendarView();
};

Calendar.prototype.elemOkayButton_click_handler = function() {
	this.onOkay.fire(this.calendarModel.date);
};

Calendar.prototype.elemCancelButton_click_handler = function() {
	this.onCancel.fire();
};

Calendar.prototype.setCurrentMonthStyle = function(td) {
	td.style.fontWeight= "bold";
};

Calendar.prototype.clearCurrentMonthStyle = function(td) {
	td.style.fontWeight= "";
};

Calendar.prototype.setSelectedDayStyle = function(td) {
	td.style.borderStyle = "solid";
	td.style.borderWidth = "1px";
	td.style.borderColor = "black";
};

Calendar.prototype.clearSelectedDayStyle = function(td) {
	td.style.borderStyle = "solid";
	td.style.borderWidth = "1px";
	td.style.borderColor = "white";
};

//////////////////////////////////////////////


var CalendarModel = function(date) {
	this.setDate(new Date(date.getTime())||new Date());
};

// ---------------------------------------- //
// Public Methods
// ---------------------------------------- //

CalendarModel.prototype.setDate = function(date) {
	this.date = date;
};

CalendarModel.prototype.selectDay = function(week, day) {
	var selectedDay = this.getSelectedDay();
	var originalPosition = selectedDay.week * 7 + selectedDay.day;
	var position = week * 7 + day;
	var delta = position - originalPosition;
	this.date.setDate(this.date.getDate()+delta);
};

CalendarModel.prototype.prevYear = function() {
	this.date.setFullYear(this.date.getFullYear()-1);
};

CalendarModel.prototype.nextYear = function() {
	this.date.setFullYear(this.date.getFullYear()+1);
};

CalendarModel.prototype.getYear = function() {
	return this.date.getFullYear();
};

CalendarModel.prototype.getMonth = function() {
	return this.date.getMonth()+1;
};

CalendarModel.prototype.getMatrix = function() {
	var date = new Date(this.date.getTime());
	date.setDate(1);
	date.setDate(date.getDate()-date.getDay()-7);
	var matrix = [];
	for ( var i = 0; i < 7; i++ ) {
	var row = [];
		matrix.push(row);
		for ( var j = 0; j < 7; j++ ) {
			var cell = date.getDate();
			row.push(cell);
			date.setDate(cell+1);
		}
	}
	return matrix;
};
	
CalendarModel.prototype.getFirstDay = function() {
	var week, day;
	var matrix = this.getMatrix();
	outer: for ( var i = 0; i < 7; i++ ) {
		var row = matrix[i];
		for ( var j = 0; j < 7; j++ ) {
			var cell = row[j];
			if ( 1 == cell ) {
				week = i;
				day = j;
				break outer;
			}
		}
	}
	return {week:week,day:day};
};

CalendarModel.prototype.getLastDay = function() {
	var week, day;
	var matrix = this.getMatrix();
	outer: for ( var i = 6; i >= 0; i-- ) {
		var row = matrix[i];
		for ( var j = 6; j >= 0; j-- ) {
			var cell = row[j];
			if ( 1 == cell ) {					
				if ( 0 == j ) {
					week = i - 1;
					day = 6;
				} else {						
					week = i;
					day = j - 1;
				}
				break outer;
			}
		}
	}
	return {week:week,day:day};
};
	
CalendarModel.prototype.getSelectedDay = function() {
	var days = this.getDays();
	var day = days % 7;
	var week = 0;
	while ( 7 * week + day != days ) {
		week++;
	}
	return {week:week+1,day:day};
};

// ---------------------------------------- //
// Private Methods
// ---------------------------------------- //

CalendarModel.prototype.getDays = function() {
	var date = new Date(this.date.getTime());
	date.setDate(1);
	return this.date.getDate()+date.getDay()-1;
};
