
var initGears = function() {
	if ( window.google && google.gears ) {
		return;
	}
	var factory = null;
	if ( window.GearsFactory ) {
		factory = new GearsFactory();
	} else {
		factory = new ActiveXObject('Gears.Factory');
	}
	var gears = {factory:factory};
	window.google = {gears:gears};	
};

var Connection = function(dbName) {
	dbName = dbName
	this.db = google.gears.factory.create("beta.database", "1.0");
	this.db.open(dbName);
};

Connection.prototype.execute = function(sql, params) {
	return this.db.execute(sql, params);
};

Connection.prototype.destroy = function() {
	this.db.close();	
};

initGears();
