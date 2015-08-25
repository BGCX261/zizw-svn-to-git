
var _RecordService = function() {
	this.EVENT_RECORD_CREATED = new CustomEvent();
};

Lang.extend(_RecordService, jsloader.locateService("scarlett.recordService"));

_RecordService.prototype.createRecord = function() {
	_RecordService.superclass.createRecord.apply(this, arguments);
	this.EVENT_RECORD_CREATED.fire();
};

_RecordService.prototype.setCurrentDate = function(date) {
	this.currentDate = date;
};

_RecordService.prototype.getCurrentDate = function() {
	if ( !this.currentDate ) {
		this.currentDate = new Date();
	}
	return this.currentDate;
};

var RecordService = new _RecordService();
