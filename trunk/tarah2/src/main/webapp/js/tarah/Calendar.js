
var Calendar = function(container) {
	Calendar.superclass.constructor.call(this, container);
};

lang.extend(Calendar, Module);

Calendar.prototype.elemDays_mousedown_handler = function(ev) {
	if ( "TD" != ev.target.tagName )
		return;
	var rowIndex = parseInt(ev.target.getAttribute("__rowIndex"));
	var colIndex = parseInt(ev.target.getAttribute("__colIndex"));
	var from = 7 * this.week + this.day;
	var to = 7 * rowIndex + colIndex;
	var delta = to - from;
	this.date.setDate(this.date.getDate() + delta);
	this.setDate(this.date);
};

Calendar.prototype.elemNextYear_click_handler = function(ev) {
	this.nextYear();
};

Calendar.prototype.elemPrevYear_click_handler = function(ev) {
	this.prevYear();
};

Calendar.prototype.elemToday_click_handler = function(ev) {
	this.setDate(new Date());
	domutils.stopEvent(ev);
};

Calendar.prototype.refresh = function() {
	this.elemYear.innerHTML = this.year;
	this.elemMonth.innerHTML = this.month;
	//
	var flag = true;
	for ( var i = 0; i < this.matrix.length; i++) {
		var row = this.matrix[i];
		var tr = this.elemDays.rows[i];
		for ( var j = 0; j < row.length; j++ ) {
			var cell = row[j];
			var td = tr.cells[j];
			td.innerHTML = cell;
			td.className = "calendar-day";
			//
			if ( flag ) {
				if ( 1 == cell ) {
					domutils.addClassName(td, "calendar-dayOfCurrentMonth");
					flag = false;
				} else {
					;
				}
			} else {
				if ( 1 == cell ) {
					;							
					flag = true;
				} else {
					domutils.addClassName(td, "calendar-dayOfCurrentMonth");
				}
			}
			//
			if ( i == this.week && j == this.day ) {
				domutils.addClassName(td, "calendar-daySelected");
			}
		}
	}
};

Calendar.prototype.setDate = function(date) { 
	this.date = date;
	this.year = date.getFullYear();
	this.month = date.getMonth()+1;
	this.dayOfMonth = date.getDate();
	this.day = date.getDay();
	this.matrix = Calendar.calcMatrix(this.year, this.month);
	var flag = true;
	outer: for ( var i = 0; i < this.matrix.length; i++ ) {
		var row = this.matrix[i];
		for ( var j = 0; j < row.length; j++ ) {
			var cell = row[j];
			if ( flag && 1 != cell )
				continue;
			flag = false;
			if ( cell == this.dayOfMonth ) {
				this.week = i;
				break outer;
			}
		}
	}
	this.refresh();
	//
	messageMediator.emitMessage("calendar_changed", date);
};

Calendar.prototype.nextDay = function() {
	this.date.setDate(this.date.getDate()+1);
	this.setDate(this.date);
};

Calendar.prototype.prevDay = function() {
	this.date.setDate(this.date.getDate()-1);
	this.setDate(this.date);
};

Calendar.prototype.nextMonth = function() {
	var month = this.date.getMonth()+1;
	var dayOfMonth = this.date.getDate();
	this.date.setMonth(month);
	if ( this.date.getDate() != dayOfMonth )
		while ( month < this.date.getMonth() ) {
			this.date.setDate(this.date.getDate()-1);
		}
	this.setDate(this.date);
};

Calendar.prototype.prevMonth = function() {
	var month = this.date.getMonth()-1;
	var dayOfMonth = this.date.getDate();
	this.date.setMonth(month);
	if ( this.date.getDate() != dayOfMonth )
		while ( month < this.date.getMonth() ) {
			this.date.setDate(this.date.getDate()-1);
		}
	this.setDate(this.date);
};

Calendar.prototype.nextYear = function() {
	var year = this.date.getFullYear()+1;
	var month = this.date.getMonth();
	var dayOfMonth = this.date.getDate();
	this.date.setYear(year);
	if ( this.date.getDate() != dayOfMonth )
		while ( month < this.date.getMonth() ) {
			this.date.setDate(this.date.getDate()-1);
		}
	this.setDate(this.date);
};

Calendar.prototype.prevYear = function() {
	var year = this.date.getFullYear()-1;
	var month = this.date.getMonth();
	var dayOfMonth = this.date.getDate();
	this.date.setYear(year);
	if ( this.date.getDate() != dayOfMonth )
		while ( month < this.date.getMonth() ) {
			this.date.setDate(this.date.getDate()-1);
		}
	this.setDate(this.date);	
};

Calendar.calcMatrix = function(fullYear, month) {
	var date = new Date();
	date.setFullYear(fullYear);
	date.setMonth(month-1);
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

Calendar.formatDate = function(date) {
	var month = date.getMonth() + 1;
	month  = month < 10 ? "0" + month : month;
	var dayOfMonth = date.getDate();
	dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
	var strDate = date.getFullYear() + "-" + month + "-" + dayOfMonth;
	return strDate;
};

Calendar.prototype.reset = function() {
}; 

Calendar.prototype.afterInit = function() {
	//
	for ( var i = 0; i < 7; i++) {
		var tr = document.createElement("tr");
		this.elemDays.appendChild(tr);
		for ( var j = 0; j < 7; j++ ) {
			var td = document.createElement("td");
			tr.appendChild(td);
			td.align = "center";
			td.style.cursor = "pointer";
			td.setAttribute("__rowIndex", i);
			td.setAttribute("__colIndex", j);
		}
	}
	//
	this.setDate(new Date());
};

Calendar.prototype.getConfig = function() {
	return {
	hmsid: "Calendar",
	template: "<table style='width: 100%; height: 100%'>\
		<tr>\
			<td align='center' style='cursor: pointer' hmsid='prevYear'>\
				<span class='calendar-prevYear'>&lt;</span>\
			</td>\
			<td align='center'>\
				<span hmsid='year' class='calendar-year'></span>-<span hmsid='month' class='calendar-month'></span>\
			</td>\
			<td align='center' style='cursor: pointer' hmsid='nextYear'>\
				<span class='calendar-nextYear'>&gt;</span>\
			</td>\
		</tr>\
		<tr>\
			<td colspan='3'>\
				<table style='width: 100%;'>\
					<tr>\
						<td align='center'>S\
						</td>\
						<td align='center'>M\
						</td>\
						<td align='center'>T\
						</td>\
						<td align='center'>W\
						</td>\
						<td align='center'>T\
						</td>\
						<td align='center'>F\
						</td>\
						<td align='center'>S\
						</td>\
					</tr>\
				</table>\
			</td>\
		</tr>\
		<tr>\
			<td colspan='3'>\
				<table style='width: 100%; height: 100%'>\
					<tbody hmsid='days'>\
					</tbody>\
				</table>\
			</td>\
		</tr>\
		<tr>\
			<td align='center'>\
			</td>\
			<td align='center'><a href='#' hmsid='today' style='color: black;'>Today</a>\
			</td>\
			<td align='center'>\
			</td>\
		</tr>\
	</table>"
	}
};
