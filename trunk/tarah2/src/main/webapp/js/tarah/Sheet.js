
var SheetBase = jsloader.resolve("tarah.SheetBase");

var Sheet = function(container) {	
	Sheet.superclass.constructor.call(this, container);
};

lang.extend(Sheet, SheetBase);

Sheet.prototype.appendCols = function(count) {
	this.appendColHeaderCols(count);
	this.appendGridCols(count);
};

Sheet.prototype.setColWidth = function(index, width) {
	this.setColHeaderColWidth(index,width);
	this.setGridColWidth(index,width);
};

Sheet.prototype.appendRows = function(count) {
	this.appendRowHeaderRows(count);
	this.appendGridRows(count);
};

Sheet.prototype.setColHeaderColWidth = function(index,width) {
	this.elemColHeaderRow.cells[index].style.width = width + "px";
};
	
Sheet.prototype.setGridColWidth = function(index,width) {
	for ( var i = 0; i < this.elemGrid.rows.length; i++ ) {
		this.elemGrid.rows[i].cells[index].style.width = width + "px";
	}
};

Sheet.prototype.getTargetCell = function(ev) {
	var target = ev.target;
	if ( "DIV" ==  target.tagName && domutils.hasClassName(target, "sheet-gridCellDiv"))
		return target;
	else
		return null;
};
