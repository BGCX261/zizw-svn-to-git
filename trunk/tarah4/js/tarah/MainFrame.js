
var Calendar = jsloader.resolve("ui.Calendar");

var MainFrame = function() {
	MainFrame.superclass.constructor.call(this);
	this.container = document.body;
	this.element = Domutils.createElement(this.container, "DIV");
	//
	this.container.style.margin = "0px";
	this.container.style.padding = "0px";
	this.container.style.overflow = "hidden";
	//
	this.element.style.position = "absolute";
	this.element.style.width = "100%";
	this.element.style.height = "100%";
	this.element.style.padding = "5px";
	//
	this.element.innerHTML = jsloader.load("js/tarah/MainFrame.html");
	this.parseDOM(this.element);
	//
	this.children["calendar"] = new Calendar(this.elemCalendar);
};

Lang.extend(MainFrame, Module);
