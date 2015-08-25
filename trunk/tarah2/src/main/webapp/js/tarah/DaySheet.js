
var Sheet = jsloader.resolve("tarah.Sheet");
var cellEditorFactory = new (jsloader.resolve("tarah.CellEditorFactory"))();

var DaySheet = function(container) {
	DaySheet.superclass.constructor.call(this, container);
	messageMediator.subscribeMessage("calendar_changed", this.reload, this);
	this.reload(new Date());
};

lang.extend(DaySheet, Sheet);

DaySheet.prototype.elemGridSlot_click_handler = function(ev) {
	var targetCell = this.getTargetCell(ev);
	if ( !targetCell )
		return;
	if ( !this.cellEditor ) {
		;
	} else if ( this.cellEditor.targetCell == targetCell ) {
		return;
	} else {
		this.cellEditor.destroy();
	}
	var dataType = this.getDataType(targetCell);
	var fieldName = this.getFieldName(targetCell);
	this.cellEditor = cellEditorFactory.createCellEditor(targetCell, dataType, fieldName, this.date);
};

DaySheet.prototype.getFieldName = function(targetCell) {
	var colIndex = targetCell.parentNode.cellIndex;
	if ( 0 == colIndex ) {
		return "item_id";
	} else if ( 1 == colIndex ) {
		return "amount";
	} else if ( 2 == colIndex ) {
		return "category_id";
	} else {
		return "desc";
	}
};

DaySheet.prototype.getDataType = function(targetCell) {
	var colIndex = -1;
	var row = targetCell.parentNode.parentNode;
	for ( var i = 0; i < row.cells.length; i++) {
		if ( row.cells[i] == targetCell.parentNode ) {
			colIndex = i;
			break;
		}
	}
	if ( 0 == colIndex ) {
		return "ITEM";
	} else if ( 1 == colIndex ) {
		return "MONEY";
	} else if ( 2 == colIndex ) {
		return "CATEGORY";
	} else {
		return "TEXT";
	}
};

DaySheet.prototype.afterInit = function() {
	DaySheet.superclass.afterInit.call(this);
	this.appendCols(3);
	this.appendRows(ROWS-1);
	this.setColWidth(0, 150);
	this.setColWidth(1, 100);
	this.setColWidth(2, 150);
	this.setColWidth(3, 200);
	this.elemColHeaderRow.cells[0].innerHTML = "Item";
	this.elemColHeaderRow.cells[1].innerHTML = "Amount";
	this.elemColHeaderRow.cells[2].innerHTML = "Category";
	this.elemColHeaderRow.cells[3].innerHTML = "Description";
	this.reset();
};

DaySheet.prototype.reload = function(date) {
	this.date = date;
	this.clear();
	var rs = db.execute("select * from account where date_of_account = ?", [domutils.formatDate(date)]);
	for ( ; rs.isValidRow(); rs.next() ) {
		var idx = rs.fieldByName("idx");
		var values = [];
		values[0] = rs.fieldByName("item_id");
		values[1] = rs.fieldByName("amount");
		values[2] = rs.fieldByName("category_id");
		values[3] = rs.fieldByName("desc");
		//
		var row = this.elemGrid.rows[idx-1];
		for ( var i = 0; i < 4; i++ ) {
			var cell = row.cells[i].firstChild;
			cell.setAttribute("__value", values[i]);
			var type = this.getDataType(cell);
			var fieldName = this.getFieldName(cell);
			var cellEditor = cellEditorFactory.createCellEditor(cell, type, fieldName, this.date);
			cellEditor.destroy();
		}
	}
	rs.close();
};

DaySheet.prototype.clear = function() {
	if ( this.cellEditor )
		this.cellEditor.destroy();
	for ( var i = 0; i < this.elemGrid.rows.length; i++ ) {
		var row = this.elemGrid.rows[i];
		for ( var j = 0; j < row.cells.length; j++ ) {
			var cell = row.cells[j].firstChild;
			cell.setAttribute("__value", null);
			cell.innerHTML = "";
		}
	}
};

var ROWS = 20;
