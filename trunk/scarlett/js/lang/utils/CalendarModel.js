
var CalendarModel = function() {
	this.currentDay = new Date();
	this.currentMonth = new Date();
	this.currentYear = new Date();
	this.today = new Date();
	this.onchange = new CustomEvent();
};

CalendarModel.prototype.pick = function(year, month, date) {
	var tempDate = new Date();
	tempDate.setFullYear(year);
	tempDate.setMonth(month);
	if ( date ) {
		tempDate.setDate(date);
		this.currentDay = tempDate;
	}
	this.currentMonth = new Date(tempDate.getTime());
	this.onchange.fire();
};

CalendarModel.prototype.previous = function() {
	this.currentDay.setDate(this.currentDay.getDate()-1);
	this.currentMonth = new Date(this.currentDay);
	this.onchange.fire();
};

CalendarModel.prototype.next = function() {
	this.currentDay.setDate(this.currentDay.getDate()+1);
	this.currentMonth = new Date(this.currentDay);
	this.onchange.fire();
};

CalendarModel.prototype.gotoCurrent = function() {
	this.currentMonth = new Date(this.currentDay.getTime());
	this.currentYear = new Date(this.currentDay.getTime());
	this.onchange.fire();
};

CalendarModel.prototype.previousMonth = function() {
	var date = this.currentMonth.getDate();
	this.currentMonth.setDate(1);
	this.currentMonth.setMonth(this.currentMonth.getMonth()-1);
	var maxDate = this.getMaxDate(this.currentMonth);
	this.currentMonth.setDate(date<maxDate?date:maxDate);
	this.currentYear = new Date(this.currentMonth.getTime());
	this.onchange.fire();
};

CalendarModel.prototype.nextMonth = function() {
	var date = this.currentMonth.getDate();
	this.currentMonth.setDate(1);
	this.currentMonth.setMonth(this.currentMonth.getMonth()+1);
	var maxDate = this.getMaxDate(this.currentMonth);
	this.currentMonth.setDate(date<maxDate?date:maxDate);
	this.currentYear = new Date(this.currentMonth.getTime());
	this.onchange.fire();
};

CalendarModel.prototype.gotoCurrentMonth = function() {
	this.currentYear = new Date(this.currentMonth.getTime());
	this.onchange.fire();
};

CalendarModel.prototype.previousYear = function() {
	this.currentYear.setFullYear(this.currentYear.getFullYear()-1);
	this.onchange.fire();
};

CalendarModel.prototype.nextYear = function() {
	this.currentYear.setFullYear(this.currentYear.getFullYear()+1);
	this.onchange.fire();
};

CalendarModel.prototype.gotoToday = function() {
	this.currentDay = new Date(this.today.getTime());
	this.currentMonth = new Date(this.today.getTime());
	this.currentYear = new Date(this.today.getTime());
	this.onchange.fire();
};

CalendarModel.prototype.isToday = function() {
	return this.currentDay.getYear()==this.today.getYear() && this.currentDay.getMonth()==this.today.getMonth() && this.currentDay.getDate()==this.today.getDate();
};

CalendarModel.prototype.isThisMonth = function() {
	return this.currentMonth.getYear()==this.today.getYear() && this.currentMonth.getMonth()==this.today.getMonth();
};

CalendarModel.prototype.getMatrix = function() {
	var startLine = this.getStartLine(this.currentMonth);
	var firstDateDay = this.getFirstDateDay(this.currentMonth);
	var tempDate = new Date(this.currentMonth);
	tempDate.setDate(1);
	tempDate.setMonth(this.currentMonth.getMonth()-1);
	tempDate.setDate(this.getPreMaxDate(this.currentMonth)-7*startLine-firstDateDay+1);
	var matrix = [];
	for ( var i = 0; i < 7; i++ ) {
		var row = [];
		for ( var j = 0; j < 7; j++ ) {
			var cell = {
				year: tempDate.getFullYear(),
				month: tempDate.getMonth(),
				date: tempDate.getDate(),
				isInCurrentMonth: tempDate.getMonth()==this.currentMonth.getMonth(),
				isWeekEnd: tempDate.getDay()==6 || tempDate.getDay()==0,
				isCurrentDay: tempDate.getYear()==this.currentDay.getYear() && tempDate.getMonth()==this.currentDay.getMonth() && tempDate.getDate()==this.currentDay.getDate(),
				isToday: tempDate.getYear()==this.today.getYear() && tempDate.getMonth()==this.today.getMonth() && tempDate.getDate()==this.today.getDate()
			};
			row.push(cell);
			tempDate.setDate(tempDate.getDate()+1);
		}
		matrix.push(row);
	}
	return matrix;
};

//--Utility Methods

CalendarModel.prototype.getMaxDate = function(date) {//month based
	var tempDate = new Date(date.getTime());
	var maxDate = tempDate.getDate();
	var month = tempDate.getMonth();
	for (;;) {
		tempDate.setDate(1+maxDate);
		if ( tempDate.getMonth() == month ) {
			maxDate++;
		} else {
			break;
		}
	}
	return maxDate;
};

CalendarModel.prototype.getPreMaxDate = function(date) {//month based
	var tempDate = new Date(date.getTime());
	tempDate.setDate(0);
	return tempDate.getDate();
};

CalendarModel.prototype.getFirstDateDay = function(date) {//month based
	var tempDate = new Date(date.getTime());
	tempDate.setDate(1);
	return tempDate.getDay();
};

CalendarModel.prototype.getStartLine = function(date) {//month based
	var maxDate = this.getMaxDate(date);
	var firstDateDay = this.getFirstDateDay(date);
	// first line
	var headDays = firstDateDay;
	var tailDays = 49 - headDays - maxDate;
	var diff = Math.abs(headDays - tailDays);
	// second line
	headDays = firstDateDay + 7;
	tailDays = 49 - headDays - maxDate;
	if ( diff < Math.abs(headDays - tailDays) ) {
		return 0;
	} else {
		return 1;
	}
};

CalendarModel.prototype.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
