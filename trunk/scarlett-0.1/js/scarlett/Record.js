
var Record = function(date, desc, amount, sign, category) {
	this.date = date;
	this.desc = desc;
	this.amount = amount;
	this.sign = sign;
	this.category = category;
};

Record.prototype.toString = function() {
	return "("+this.date+", "+this.desc+", "+this.amount+", "+this.sign+", "+this.category+")";
};
