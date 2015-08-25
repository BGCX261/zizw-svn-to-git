
var Module = jsloader.resolve("ui.Module");

var CalendarBase = function(container) {
	CalendarBase.superclass.constructor.call(this, container);
	// init members
	this.calendarService = null;
	this.tblCalendar = null;
	this.tbdCalendar = null;
	this.spYear = null;
	this.spMonth = null;
	// create table
	var tblCalendar = document.createElement("table");
	this.element.appendChild(tblCalendar);
	this.tblCalendar = tblCalendar;
	// create tbody
	var tbdCalendar = document.createElement("tbody");
	tblCalendar.appendChild(tbdCalendar);
	this.tbdCalendar = tbdCalendar;
	// create navigator row
	this.createNavigatorRow(tbdCalendar);
	// create header row
	this.createHeaderRow(tbdCalendar);
	// create matrix
	this.createMatrix(tbdCalendar);
	// bind listeners
	this.eventHelper.attachListener(this.tblCalendar, "mouseover", this.tblCalendar_mouseover_handler, this);
	this.eventHelper.attachListener(this.tblCalendar, "mouseout", this.tblCalendar_mouseout_handler, this);
	this.eventHelper.attachListener(this.tblCalendar, "mousedown", this.tblCalendar_mousedown_handler, this);
	// reset
	this.reset();
};

lang.extend(CalendarBase, Module);

CalendarBase.prototype.tblCalendar_mouseover_handler = function(ev) {
	if ( this.isDayCell(ev.target) ) {
		this.setHoverDayStyle(ev.target);
		return;
	}	
};

CalendarBase.prototype.tblCalendar_mouseout_handler = function(ev) {
	if ( this.isDayCell(ev.target) ) {
		this.clearHoverDayStyle(ev.target);
		return;
	}
};

CalendarBase.prototype.tblCalendar_mousedown_handler = function(ev) {
	if ( this.isDayCell(ev.target) ) {
		this.selectDay(ev.target);
		return;
	}
	if ( this.tdPrevYear == ev.target ) {
		this.calendarService.prevYear();
		this.refresh();
	}
	if ( this.tdNextYear == ev.target ) {
		this.calendarService.nextYear();
		this.refresh();
	}
};

CalendarBase.prototype.selectDay = function(td) {
	this.calendarService.selectDay(td.parentNode.rowIndex-BASE_ROW_INDEX, td.cellIndex);
	this.refresh();
};

CalendarBase.prototype.setCalendarService = function(calendarService) {
	this.calendarService = calendarService;
};

CalendarBase.prototype.refresh = function() {
	this.spYear.innerHTML = this.calendarService.getYear();
	var month = this.calendarService.getMonth();
	this.spMonth.innerHTML = month < 10 ? "0" + month : month;
	//
	var firstDay = this.calendarService.getFirstDay();
	var lastDay = this.calendarService.getLastDay();
	var selectedDay = this.calendarService.getSelectedDay();
	var matrix = this.calendarService.getMatrix();
	for ( var i = 0; i < matrix.length; i++ ) {
		var row = matrix[i];
		var tr = this.tbdCalendar.rows[BASE_ROW_INDEX+i];
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

CalendarBase.prototype.isDayCell = function(elem) {
	if ( 1 != elem.nodeType || "TD" != elem.tagName ) {
		return false;
	}
	var rowIndex = elem.parentNode.rowIndex;
	if ( rowIndex < 2 || 8 < rowIndex ) {
		return false;
	}
	return true;
};

CalendarBase.prototype.setHoverDayStyle = function(td) {
	td.style.backgroundColor = "pink";
};
	
CalendarBase.prototype.clearHoverDayStyle = function(td) {
	td.style.backgroundColor = "";
};
	
CalendarBase.prototype.setCurrentMonthStyle = function(td) {
	td.style.fontWeight= "bold";
};

CalendarBase.prototype.clearCurrentMonthStyle = function(td) {
	td.style.fontWeight= "";
};

CalendarBase.prototype.setSelectedDayStyle = function(td) {
	td.style.borderStyle = "solid";
	td.style.borderWidth = "1px";
	td.style.borderColor = "black";
};

CalendarBase.prototype.clearSelectedDayStyle = function(td) {
	td.style.borderStyle = "solid";
	td.style.borderWidth = "1px";
	td.style.borderColor = "darkseagreen";
};

CalendarBase.prototype.reset = function() {
	this.tblCalendar.style.position = "absolute";
	this.tblCalendar.style.width = "100%";
	this.tblCalendar.style.height = "100%";
};

CalendarBase.prototype.createNavigatorRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.tdPrevYear = this.createNavigatorCell(tr, "&lt;");
	this.createYearMonthCell(tr);
	this.tdNextYear = this.createNavigatorCell(tr, "&gt;");
	return tr;
};

CalendarBase.prototype.createNavigatorCell = function(tr, labelString) {
	var td = document.createElement("td");
	tr.appendChild(td);
	td.align = "center";	
	td.innerHTML = labelString;
	td.style.cursor = "pointer";
	return td;
};

CalendarBase.prototype.createYearMonthCell = function(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	td.align = "center";
	td.style.cursor = "default";
	td.colSpan = 5;
	var span = document.createElement("span");
	td.appendChild(span);
	this.spYear = span;
	var textNode = document.createTextNode("-");
	td.appendChild(textNode);
	var span = document.createElement("span");
	td.appendChild(span);
	this.spMonth = span;
	return td;
};

CalendarBase.prototype.createHeaderRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.createHeaderCell(tr, LABEL_CALENDAR_SUNDAY);
	this.createHeaderCell(tr, LABEL_CALENDAR_MONDAY);
	this.createHeaderCell(tr, LABEL_CALENDAR_TUESDAY);
	this.createHeaderCell(tr, LABEL_CALENDAR_WEDNESDAY);
	this.createHeaderCell(tr, LABEL_CALENDAR_THURSDAY);
	this.createHeaderCell(tr, LABEL_CALENDAR_FRIDAY);
	this.createHeaderCell(tr, LABEL_CALENDAR_SATURDAY);
	return tr;
};

CalendarBase.prototype.createHeaderCell = function(tr, labelString) {
	var td = document.createElement("td");
	tr.appendChild(td);
	td.align = "center";
	td.innerHTML = labelString;
	td.style.cursor = "default";
	return td;
};

CalendarBase.prototype.createMatrix = function(tbody) {
	var ROW_COUNT = 7;
	var COL_COUNT = 7;
	for ( var i = 0; i < ROW_COUNT; i++ ) {
		var tr = document.createElement("tr");
		tbody.appendChild(tr);
		for ( var j = 0; j < COL_COUNT; j++ ) {
			var td = document.createElement("td");
			tr.appendChild(td);
			td.align = "center";
			td.style.cursor = "pointer";
		}
	}
};

var LABEL_CALENDAR_SUNDAY = "S";
var LABEL_CALENDAR_MONDAY = "M";
var LABEL_CALENDAR_TUESDAY = "T";
var LABEL_CALENDAR_WEDNESDAY = "W";
var LABEL_CALENDAR_THURSDAY = "T";
var LABEL_CALENDAR_FRIDAY = "F";
var LABEL_CALENDAR_SATURDAY = "S";

var BASE_ROW_INDEX = 2;