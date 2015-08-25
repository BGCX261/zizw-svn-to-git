
var BaseCellEditor = jsloader.resolve("tarah.celleditor.BaseCellEditor");

var TextCellEditor = function(cell) {
	cell.innerHTML = "";
	TextCellEditor.superclass.constructor.call(this, cell, cell, fullName);
	this.loadValue()
};

Lang.extend(TextCellEditor, BaseCellEditor);

TextCellEditor.prototype.afterDestroy = function() {
	this.storeValue();
};

TextCellEditor.prototype.loadValue = function() {
	this.element.value = this.getCellValue();
};

TextCellEditor.prototype.storeValue = function() {
	var value = Domutils.strip(this.element.value);
	this.onOkay.fire(this.cell, value);
};
