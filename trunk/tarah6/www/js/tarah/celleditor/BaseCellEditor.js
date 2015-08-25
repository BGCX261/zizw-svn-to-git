
var BaseCellEditor = function(cell, container, fullName) {
	BaseCellEditor.superclass.constructor.call(this, container, fullName);
	this.cell = cell;
	this.onOkay = new CustomEvent();
	this.onCancel = new CustomEvent();
};

Lang.extend(BaseCellEditor, Module);

BaseCellEditor.prototype.getCellValue = function() {
	var value = this.cell.getAttribute("__value");
	return value ? value : "";
};
