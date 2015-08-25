
var Logger = function() {
	this.cache = {};
};

Logger.prototype.log = function(path, value) {
	this.cache[path] = value;
};

Logger.prototype.clean = function(path, value) {
	this.cache = {};
};

Logger.prototype.toString = function() {
	var s = "";
	for ( var prop in this.cache ) {
		s += "\n" + prop + " = " + this.cache[prop];
	}
	return s;
};
