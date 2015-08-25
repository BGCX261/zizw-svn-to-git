
var CalendarLogic = function(date) {
	this.setDate(date||new Date());
};

// ---------------------------------------- //
// Public Methods
// ---------------------------------------- //

CalendarLogic.prototype.setDate = function(date) {
	this.date = date;
};

CalendarLogic.prototype.selectDay = function(week, day) {
	var selectedDay = this.getSelectedDay();
	var originalPosition = selectedDay.week * 7 + selectedDay.day;
	var position = week * 7 + day;
	var delta = position - originalPosition;
	this.date.setDate(this.date.getDate()+delta);
};

CalendarLogic.prototype.prevYear = function() {
	this.date.setFullYear(this.date.getFullYear()-1);
};

CalendarLogic.prototype.nextYear = function() {
	this.date.setFullYear(this.date.getFullYear()+1);
};

CalendarLogic.prototype.getYear = function() {
	return this.date.getFullYear();
};

CalendarLogic.prototype.getMonth = function() {
	return this.date.getMonth()+1;
};

CalendarLogic.prototype.getMatrix = function() {
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
	
CalendarLogic.prototype.getFirstDay = function() {
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

CalendarLogic.prototype.getLastDay = function() {
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
	
CalendarLogic.prototype.getSelectedDay = function() {
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

CalendarLogic.prototype.getDays = function() {
	var date = new Date(this.date.getTime());
	date.setDate(1);
	return this.date.getDate()+date.getDay()-1;
};
