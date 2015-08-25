
var Sheet = function(container, categoryId) {
	this.categoryId = categoryId;
	Sheet.superclass.constructor.call(this, container, "html/Sheet.html");
	jsloader.resolve("scarlett.RecordService").EVENT_RECORD_CREATED.addListener(this.refresh, this);
	this.incomeEventHelper = new EventHelper();
	this.outcomeEventHelper = new EventHelper();
	this.setDate(jsloader.resolve("scarlett.RecordService").getCurrentDate());
};

Lang.extend(Sheet, Component);

Sheet.prototype.destroy = function() {
	jsloader.resolve("scarlett.RecordService").EVENT_RECORD_CREATED.removeListener(this.refresh);
	Sheet.superclass.destroy.call(this);
};

Sheet.prototype.setDate = function(date) {
	var today = new Date();
	if ( 
		today.getYear() == date.getYear() && 
		today.getMonth() == date.getMonth() && 
		today.getDate() == date.getDate() ) {
		this.elemToday.disabled = true;
	} else {
		this.elemToday.disabled = false;
	}
	this.date = date;
	var fullYear = date.getFullYear();
	var month = date.getMonth()+1;
	var dayOfMonth = date.getDate();
	var strDate = Domutils.formatDate(date);
	this.elemCurrentDate.value = strDate;
	this.refresh();
	jsloader.resolve("scarlett.RecordService").setCurrentDate(date);
};

Sheet.prototype.refresh = function() {
	this.clear();
	this.load(this.categoryId, this.date);
};

Sheet.prototype.clear = function() {
	while ( this.elemTbody.rows.length > 2 ) {
		this.elemTbody.removeChild(this.elemTbody.rows[2]);
	}
	this.incomeEventHelper = new EventHelper();
	this.outcomeEventHelper = new EventHelper();
};

Sheet.prototype.load = function(categoryId, date) {
	var recordService = jsloader.resolve("scarlett.RecordService");
	var allRecords = recordService.getAllRecordsByCategoryIdAndDate(categoryId, Domutils.formatDate(date));
	for ( var i = 0; i < allRecords.length; i++ ) {
		this.appendRow(allRecords[i]);
	}
};

Sheet.prototype.appendRow = function(record) {
	var tr = document.createElement("tr");
	this.elemTbody.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = record.date;
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = record.desc;
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = (record.sign==-1)?Domutils.formatAmount(record.amount):"&nbsp;";
	td.style.textAlign = "right";
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = (record.sign==1)?Domutils.formatAmount(record.amount):"&nbsp;";
	td.style.textAlign = "right";
};

Sheet.prototype.elemPrev_click_handler = function(ev) {
	var dayOfMonth = this.date.getDate();
	dayOfMonth--;
	this.date.setDate(dayOfMonth);
	this.setDate(this.date);
};

Sheet.prototype.elemNext_click_handler = function(ev) {
	var dayOfMonth = this.date.getDate();
	dayOfMonth++;
	this.date.setDate(dayOfMonth);
	this.setDate(this.date);
};

Sheet.prototype.elemToday_click_handler = function(ev) {
	this.setDate(new Date());
};
