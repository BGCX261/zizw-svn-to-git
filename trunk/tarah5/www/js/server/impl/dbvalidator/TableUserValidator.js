
var DBValidator = jsloader.resolve("server.impl.dbvalidator.DBValidator");
var Connection = jsloader.resolve("server.impl.Connection");

var TableUserValidator = function(dbName) {
	TableUserValidator.superclass.constructor.call(this, dbName);
	this.tableName = "user";
};

Lang.extend(TableUserValidator, DBValidator);

TableUserValidator.prototype.setUp = function() {
	this.doCreate(this.tableName);
};

TableUserValidator.prototype.tearDown = function() {
	this.doDrop(this.tableName);
};

TableUserValidator.prototype.validateInsert = function() {
	try {
		var conn = new Connection(this.dbName);
		conn.execute("insert into user ( username, password ) values ( 'aUsername', 'aPassword' )");
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}
};

TableUserValidator.prototype.validateDelete = function() {
	try {
		var conn = new Connection(this.dbName);
		conn.execute("delete from user where username = ?", ["aUsername"]);
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}
};

TableUserValidator.prototype.validateSelect = function() {
	var id, username, password;
	try {
		// do insert		
		var conn = new Connection(this.dbName);
		conn.execute("insert into user ( username, password ) values ( 'aUsername', 'aPassword' )");
		// do select
		var rs = conn.execute("select * from user where username = ?", ["aUsername"]);
		id = rs.fieldByName("id");
		username = rs.fieldByName("username");
		password = rs.fieldByName("password");
		rs.close();
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}	
	if ( "number" != typeof id ) {
		throw new Error("Wrong id.");
	}
	if ( "aUsername" != username ) {
		throw new Error("Wrong username.");
	}
	if ( "aPassword" != password) {
		throw new Error("Wrong password.");
	}	
};

TableUserValidator.prototype.validateUpdate = function() {
	var id, username, password;
	try {
		// do insert		
		var conn = new Connection(this.dbName);
		conn.execute("insert into user ( username, password ) values ( 'aUsername', 'aPassword' )");
		// can update
		conn.execute("update user set password = ? where username = ?", ['newPassword', 'aUsername']);
		// do select
		var rs = conn.execute("select * from user where username = ?", ["aUsername"]);
		id = rs.fieldByName("id");
		username = rs.fieldByName("username");
		password = rs.fieldByName("password");
		rs.close();
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}	
	if ( "number" != typeof id ) {
		throw new Error("Wrong id.");
	}
	if ( "aUsername" != username ) {
		throw new Error("Wrong username.");
	}
	if ( "newPassword" != password) {
		throw new Error("Wrong password.");
	}	
};

TableUserValidator.prototype.validateNoDuplicatedUsername = function() {
	var canInsertDup = false;
	try {
		// do insert		
		var conn = new Connection(this.dbName);
		conn.execute("insert into user ( username, password ) values ( 'aUsername', 'aPassword' )");
		for (;;) {
			try {
				conn.execute("insert into user ( username, password ) values ( 'aUsername', 'aPassword' )");
			} catch(ex) {
				break;
			}
			canInsertDup = true;
			break;
		}
		conn.destroy();
	} catch(ex) {
		throw new Error(ex.message);
	}	
	if ( canInsertDup ) {
		throw new Error("Can insert dup.");
	}	
};
