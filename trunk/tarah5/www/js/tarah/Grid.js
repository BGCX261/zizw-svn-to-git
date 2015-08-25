
var CellEditorFactory = jsloader.resolve("tarah.CellEditorFactory");
var GridService = jsloader.resolve("server.GridService");

var Grid = function(container) {
	Grid.superclass.constructor.call(this);
	this.currentCell = null;
	this.container = container;
	this.element = Domutils.createElem(this.container, "DIV");
	this.element.innerHTML = jsloader.load("template/tarah/Grid.html");
	this.parseDOM(this.element);
	this.bindHandlers();
	//
	for ( var i = 0; i < Grid.DEFAULT_ROW_COUNT; i++ ) {
		var tr = Domutils.createElem(this.elemGridBody, "TR");
		for ( var j = 0; j < 3; j++ ) {
			var td = Domutils.createElem(tr, "TD");
			td.innerHTML = "&nbsp;";
		}
	}
};

Lang.extend(Grid, Module);

Grid.DEFAULT_ROW_COUNT = 20;

Grid.prototype.elemGridBody_mousedown_handler = function(ev) {
	var target = ev.target;
	if ( "TD" != target.tagName )
		return;
	if ( this.currentCell == target ) {
		return;
	}
	this.currentCell = target;
	if ( this.currentEditor ) {
		this.currentEditor.destroy();
	}
	this.currentEditor = CellEditorFactory.createEditor(this.currentCell);
};

Grid.prototype.doOnLoad = function(ev) {
	this.elemGridTitle.innerHTML = ev.dateToLoad;
	var model = GridService.load(ev.dateToLoad);
	for ( var i = 0; i < model.length; i++ ) {
		var row = this.elemGridBody.rows[i];
		for ( var j = 0; j < model[i].length; j++ ) {
			var cell = row.cells[j];
			cell.setAttribute("__value", model[i][j]);
		}
	}
};
