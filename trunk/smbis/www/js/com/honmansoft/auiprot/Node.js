
var Node = function(id, type) {
	this.id = id;
	this.type = type;
	this.properties = {};
	this.getId = function() {
		return this.id;
	};
	this.getProperty = function(name) {
		return this.properties[name];
	};
	this.setProperty = function(name, value) {
		this.properties[name] = value;
	};
	this.getProperties = function() {
		var properties = [];
		for ( var prop in this.properties ) {
			properties.push(prop + "=" + this.properties[prop]);
		}
		return properties;
	};
	this.toString = function() {
		return "[" + this.id + "]" + this.type;
	};
};
