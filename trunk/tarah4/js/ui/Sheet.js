
var Sheet = function(container) {
	Sheet.superclass.constructor.call(this);
	this.container = container;
	this.element = Domutils.createElement(this.container, "DIV");
	//
	this.element.style.position = "absolute";
	this.element.style.width = "100%";
	this.element.style.height = "100%";
	//
	this.cornerHeight = 20;
	this.cornerWidth = 50;
	//
	this.element.innerHTML = jsloader.load("js/ui/Sheet.html");
	this.parseDOM(this.element);
	this.reset();
};

Lang.extend(Sheet, Module);

Sheet.prototype.reset = function() {
	this.elemCorner.style.height = this.cornerHeight + "px";
	this.elemCorner.style.width = this.cornerWidth + "px";
};
