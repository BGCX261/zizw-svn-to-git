
var Grid = jsloader.resolve("tarah.Grid");
var DateController = jsloader.resolve("tarah.DateController");

var MainFrame = function(container) {
	MainFrame.superclass.constructor.call(this);
	this.container = container;
	this.element = Domutils.createElem(this.container, "DIV");
	this.element.innerHTML = jsloader.load("template/tarah/MainFrame.html");
	this.parseDOM(this.element);
	this.children["grid"] = new Grid(this.elemGridSlot);
	this.children["dateController"] = new DateController(this.elemDateControllerSlot);
	this.children["dateController"].onLoad.addListener(this.children["grid"].doOnLoad, this.children["grid"]);
};

Lang.extend(MainFrame, Module);
