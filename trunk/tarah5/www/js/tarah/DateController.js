
var DateController = function(container) {
	DateController.superclass.constructor.call(this);
	this.container = container;
	this.element = Domutils.createElem(this.container, "DIV");
	this.element.innerHTML = jsloader.load("template/tarah/DateController.html");
	this.onLoad = new CustomEvent();
	this.parseDOM(this.element);
	this.bindHandlers();
};

Lang.extend(DateController, Module);

DateController.prototype.elemLoadButton_click_handler = function() {
	var date = this.elemYearInput.value + "-" + this.elemMonthInput.value + "-" + this.elemDayInput.value;
	if ( date.match(/^[0-9]{4}-(([0][1-9])|([1][0-2]))-(([0][1-9])|([1-2][0-9])|([3][0-1]))$/) )
		this.onLoad.fire({dateToLoad:date});
	else
		alert("Bad date.");
};
