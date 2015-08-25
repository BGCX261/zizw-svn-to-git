
var Module = jsloader.resolve("wajax.core.Module")

var Calendar = function(element, parentModule) {
	Calendar.superclass.constructor.call(this, element, parentModule);
	this.createTable();
	//
	this.setDate(new Date());
};

lang.extend(Calendar, Module);

Calendar.prototype.setDate= function(date) {
	this.date = date;
	this.refresh();
};

Calendar.prototype.getDate= function() {
	return this.date;
};

Calendar.prototype.refresh = function() {
	var date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
	this.elemYear.innerHTML = date.getFullYear();
	this.elemMonth.innerHTML = date.getMonth()+1;
	date.setDate(1);
	date.setDate(1-date.getDay()-7);
	for ( var i = 0; i < 7; i++ ) {
		for ( var j = 0; j < 7; j++ ) {
			this.dates[i][j].innerHTML = date.getDate();
			if (
				date.getFullYear() == this.date.getFullYear() &&
				date.getMonth() == this.date.getMonth() &&
				date.getDate() == this.date.getDate()
				) {
				domutils.replaceClassName(this.dates[i][j], "dateSelected", "date");
			} else {
				domutils.replaceClassName(this.dates[i][j], "date", "dateSelected");
			}
			this.dates[i][j].setAttribute("_cal_cell", "true");
			this.dates[i][j].setAttribute("_cal_year", date.getFullYear());
			this.dates[i][j].setAttribute("_cal_month", date.getMonth());
			this.dates[i][j].setAttribute("_cal_date", date.getDate());
			date.setDate(date.getDate()+1);
		}
	}
};

Calendar.prototype.elemTable_click_handler = function(ev) {
	var target = ev.target;
	if ( target.getAttribute("_cal_cell") ) {
		var date = new Date(
			parseInt(target.getAttribute("_cal_year")),
			parseInt(target.getAttribute("_cal_month")),
			parseInt(target.getAttribute("_cal_date"))
			);
		this.setDate(date);
	}
};

Calendar.prototype.elemPrev_click_handler = function(ev) {
	this.date.setMonth(this.date.getMonth()-1);
	this.refresh();
};

Calendar.prototype.elemNext_click_handler = function(ev) {
	this.date.setMonth(this.date.getMonth()+1);
	this.refresh();
};

Calendar.prototype.getTemplate = function() {
	return "<table hmsid='table'><tbody hmsid='tbody'>\
		<tr>\
			<td hmsid='prev' align='center' style='cursor: pointer'>&lt;</td>\
			<td align='center' colspan='5' style='cursor: default'>\
				<span hmsid='year'>0000</span>-<span hmsid='month'>00</span>\
			</td>\
			<td align='center' hmsid='next' style='cursor: pointer'>&gt;</td>\
		</tr>\
		<tr>\
			<td align='center' style='cursor: default'>&nbsp;S&nbsp;</td>\
			<td align='center' style='cursor: default'>&nbsp;M&nbsp;</td>\
			<td align='center' style='cursor: default'>&nbsp;T&nbsp;</td>\
			<td align='center' style='cursor: default'>&nbsp;W&nbsp;</td>\
			<td align='center' style='cursor: default'>&nbsp;T&nbsp;</td>\
			<td align='center' style='cursor: default'>&nbsp;F&nbsp;</td>\
			<td align='center' style='cursor: default'>&nbsp;S&nbsp;</td>\
		</tr>\
	</tbody></table>";
};

Calendar.prototype.createTable = function() {
	this.dates = [];
	//
	var tr = null, td = null;
	//
	for ( var r = 0; r < 7; r++ ) {
		tr = document.createElement("tr");
		this.elemTbody.appendChild(tr);
		this.dates[r] = [];
		for ( var c = 0; c < 7; c++ ) {
			td = document.createElement("td");
			td.align = "center";
			tr.appendChild(td);
			this.dates[r][c] = td;
			td.style.cursor = 'pointer';
		}
	}
};
