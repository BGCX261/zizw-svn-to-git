
var DBValidator = function(dbName) {
	this.dbName = dbName;
};

DBValidator.prototype.doValidate = function() {
	for ( var prop in this ) {
		if ( prop.indexOf("validate") == 0 ) {
			if ( this.setUp ) {
				this.setUp();
			}
			this[prop].call(this)
			if ( this.tearDown ) {
				this.tearDown();
			}
		}
	}
};

DBValidator.prototype.doCreate = function(tableName) {
	var sql = jsloader.resolve("server.impl.__create_sql");				
	try {
		var conn = new Connection("test");
		conn.execute(sql[tableName]);
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}
};

DBValidator.prototype.doDrop = function(tableName) {
	var sql = jsloader.resolve("server.impl.__create_sql");				
	try {
		var conn = new Connection("test");
		conn.execute("drop table " + tableName);
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}
};
