
var DateNavigator = jsloader.resolve("tarah.DateNavigator");
var Grid = jsloader.resolve("tarah.Grid");

var MainFrame = function() {
	MainFrame.superclass.constructor.call(this, document.body, fullName);
	this.children.grid = new Grid(this.elemGrid);
	this.children.dateNavigator = new DateNavigator(this.elemDateNavigator);
	this.children.dateNavigator.onChange.addListener(this.children.grid.load, this.children.grid);
};

Lang.extend(MainFrame, Module);
