
var GlobalStatus = function() {
	this.mode = this.MODE_MONTH;
	this.onchange = new CustomEvent();
};

GlobalStatus.prototype.setMode = function(mode) {
	this.mode = mode;
	this.onchange.fire();
};

GlobalStatus.prototype.MODE_DAY = "ModeDay";
GlobalStatus.prototype.MODE_MONTH = "ModeMonth";
GlobalStatus.prototype.MODE_YEAR = "ModeYear";
GlobalStatus.prototype.MODE_ALL = "ModeAll";
