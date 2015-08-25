
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
}

var DB = function(dbName) {
	initGears();
	this.db = google.gears.factory.create("beta.database", "1.0");
	this.db.open(dbName);
};

DB.prototype.execute = function(sql, params) {
	try {
		return this.db.execute(sql, params);
	} catch(ex) {
		alert(ex.message);
	}	
};

DB.prototype.destroy = function() {
	this.db.close();	
};
