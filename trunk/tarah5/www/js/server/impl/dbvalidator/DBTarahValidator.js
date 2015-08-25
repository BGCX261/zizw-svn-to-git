
var TableUserValidator = jsloader.resolve("server.impl.dbvalidator.TableUserValidator");
var DBValidator = jsloader.resolve("server.impl.dbvalidator.DBValidator");

var DBTarahValidator = function(dbName) {
	DBTarahValidator.superclass.constructor.call(this, dbName||"tarah");
};

Lang.extend(DBTarahValidator, DBValidator);

DBTarahValidator.prototype.validateTableUser = function() {
	new TableUserValidator(this.dbName).doValidate();
};
