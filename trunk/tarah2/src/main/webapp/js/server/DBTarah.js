
var DB = jsloader.resolve("server.DB");

var DBTarah = function() {
	this.tables = [];
	DBTarah.superclass.constructor.call(this, "tarah");
};

lang.extend(DBTarah, DB);

DBTarah.prototype.destroy = function() {
	DBTarah.superclass.destroy.call(this);
};

DBTarah.prototype.create = function() {
	var table = null;
	// user
	this.tables.push(table="user");
	this.execute(
		"create table " + table + 
		"(" +
		"id integer primary key autoincrement, " +
		"username varchar(255) unique, " +
		"password varchar(255)" +
		")");
	// item
	this.tables.push(table="item");
	this.execute(
		"create table " + table + 
		"(" +
		"id integer primary key autoincrement, " +
		"name varchar(255) unique, " +
		"desc varchar(255)" +
		")");
	// category
	this.tables.push(table="category");
	this.execute(
		"create table " + table + 
		"(" +
		"id integer primary key autoincrement, " +
		"name varchar(255) unique, " +
		"desc varchar(255)" +
		")");
	// account
	this.tables.push(table="account");
	this.execute(
		"create table " + table+
		"(" +
		"id integer primary key autoincrement, " +
		"user_id integer not null, " +
		"date_of_account date not null, " +
		"idx integer not null, " +
		"item_id integer, " +
		"amount integer, " +
		"category_id integer, " +
		"desc varchar(255)" +
		")");
};

DBTarah.prototype.populate = function() {
	// user
	this.execute("insert into user (username,password) values('ivy','123')");
	this.execute("insert into user (username,password) values('forrest','456')");
	// item
	this.execute("insert into item (name) values('水果')");
	this.execute("insert into item (name) values('蔬菜')");
	this.execute("insert into item (name) values('大米')");
	this.execute("insert into item (name) values('油')");
	this.execute("insert into item (name) values('煤气')");
	this.execute("insert into item (name) values('肉类')");
	this.execute("insert into item (name) values('月票')");
	// category
	this.execute("insert into category (name) values('小额生活消费')");
	this.execute("insert into category (name) values('大额生活消费')");
	this.execute("insert into category (name) values('意外消费')");
	this.execute("insert into category (name) values('弹性消费')");
	//// account
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-01', 1, 1, 1, 1, 'My First Record')");
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-01', 2, 1, 1, 1, 'My Second Record')");
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-01', 3, 1, 1, 1, 'My Third Record')");
	//
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-02', 1, 1, 1, 1, 'My First Record')");
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-02', 2, 2, 1, 2, 'My Second Record')");
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-02', 6, 5, 1, 1, 'My Third Record')");
	//
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-03', 1, 4, 1, 3, 'My First Record')");
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-03', 7, 5, 1, 2, 'My Second Record')");
	this.execute("insert into account (user_id, date_of_account, idx, item_id, amount, category_id, desc) values(1, '2007-12-03', 13, 7, 1, 1, 'My Third Record')");
};

DBTarah.prototype.drop = function() {
	this.tables = ["user", "item", "category", "account"];
	for ( var i = 0; i < this.tables.length; i++ ) {
		this.execute("drop table " + this.tables[i]);
	}
};
