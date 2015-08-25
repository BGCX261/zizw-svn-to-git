
var CalendarLogic = jsloader.resolve("util.CalendarLogic");

var Calendar = function(container) {
	Calendar.superclass.constructor.call(this);
	this.container = container;
	this.element = Domutils.createElement(this.container, "DIV");
	this.element.innerHTML = jsloader.load("js/ui/Calendar.html");
	this.parseDOM(this.element);
	var ROW_COUNT = 7;
	var COL_COUNT = 7;
	for ( var i = 0; i < ROW_COUNT; i++ ) {
		var tr = document.createElement("tr");
		this.elemDays.appendChild(tr);
		for ( var j = 0; j < COL_COUNT; j++ ) {
			var td = document.createElement("td");
			tr.appendChild(td);
			td.align = "center";
			td.style.cursor = "pointer";
		}
	}
	this.cal = new CalendarLogic();
	this.bindHandlers();
	this.refresh();
};

Lang.extend(Calendar, Module);

Calendar.prototype.refresh = function() {
	this.elemYear.innerHTML = this.cal.getYear();
	var month = this.cal.getMonth();
	this.elemMonth.innerHTML = month < 10 ? "0" + month : month;
	var firstDay = this.cal.getFirstDay();
	var lastDay = this.cal.getLastDay();
	var selectedDay = this.cal.getSelectedDay();
	var matrix = this.cal.getMatrix();
	for ( var i = 0; i < matrix.length; i++ ) {
		var row = matrix[i];
		var tr = this.elemDays.rows[BASE_ROW_INDEX+i];
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
	td.style.borderColor = "darkseagreen";
};

Calendar.prototype.elemPrevYear_mousedown_handler = function(ev) {
	this.cal.prevYear();
	this.refresh();
};

Calendar.prototype.elemNextYear_mousedown_handler = function(ev) {
	this.cal.nextYear();
	this.refresh();
};

Calendar.prototype.elemDays_mousedown_handler = function(ev) {
	var target = ev.target;
	if ( "TD" != target.tagName )
		return;
	var rowIndex = target.parentNode.rowIndex;
	var cellIndex = target.cellIndex;
	this.cal.selectDay(rowIndex, cellIndex);
	this.refresh();
};

var BASE_ROW_INDEX = 0;
