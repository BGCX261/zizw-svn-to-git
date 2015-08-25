
var BalanceDAO = jsloader.resolve("server.BalanceDAO");
var CellEditorFactory = jsloader.resolve("tarah.celleditor.CellEditorFactory");
var TypeModel = jsloader.resolve("tarah.TypeModel");

var Grid = function(container) {
	Grid.superclass.constructor.call(this, container, fullName);
	this.load(new Date());
};

Lang.extend(Grid, Module);

Grid.prototype.load = function(date) {
	this.date = date;
	this.removeChild("editor");
	this.removeAllRows();
	this.appendDefaultNumberOfRows();
	var data = BalanceDAO.load(Domutils.formatDate(this.date));
	if ( 0 == data.length ) {
		return;
	}
	this.populate(data);
};

Grid.prototype.populate = function(data) {
	var linkedData = this.makeLinkedData(data);
	var fieldNames = ["type", "amount", "desc"];
	for ( var record = linkedData, index = 0; record; record = record.next ) {
		var tr = this.elemGrid.rows[index];
		tr.setAttribute("__id", record.id);
		for ( var i = 0; i < fieldNames.length; i++ ) {
			tr.cells[i].setAttribute("__value", record[fieldNames[i]]);
			this.renderCell(tr.cells[i]);
		}
		//
		index ++;
		if ( index >= this.elemGrid.rows.length ) {
			this.appendRow();
		}
	}
};

Grid.prototype.changeCell = function(td, newValue) {
	var oldValue = td.getAttribute("__value");
	oldValue = oldValue ? oldValue : "";
	newValue = newValue ? newValue : "";
	newValue = Domutils.strip(""+newValue);
	if ( oldValue == newValue ) {
		;
	} else {
		td.setAttribute("__value", newValue);
		this.saveToDB(td.parentNode);
	}
	this.renderCell(td);
};

Grid.prototype.revertCell = function(td) {
	this.renderCell(td);
};

Grid.prototype.saveToDB = function(tr) {
	var id = this.getRowId(tr);
	var type = tr.cells[0].getAttribute("__value");
	var amount = tr.cells[1].getAttribute("__value");
	var desc = tr.cells[2].getAttribute("__value");
	BalanceDAO.update(id, type, amount, desc);
};

Grid.prototype.removeAllRows = function() {
	while ( this.elemGrid.rows.length > 0 ) {
		this.elemGrid.removeChild(this.elemGrid.rows[0]);
	}
};

Grid.prototype.appendDefaultNumberOfRows = function() {
	for ( var i = 0; i < 20; i++ ) {
		this.appendRow();
	}
};

Grid.prototype.appendRow = function() {	
	var tr = Domutils.createElem(this.elemGrid, "TR");
	var fieldTypes = ["TYPE", "AMOUNT", "DESC"];
	for ( var i = 0; i < 3; i++ ) {
		var td = Domutils.createElem(tr, "TD");
		td.setAttribute("__type", fieldTypes[i]);
		this.renderCell(td);
	}
};

Grid.prototype.getRowId = function(tr) {
	var id = tr.getAttribute("__id");
	if ( !id ) {
		var prevId = 0;
		var prevTr =  tr.previousSibling;
		if ( prevTr && "TR" == prevTr.tagName ) {
			prevId = this.getRowId(prevTr);
		}
		var nextId = 0;
		id = BalanceDAO.insert(Domutils.formatDate(this.date), prevId, nextId);
		tr.setAttribute("__id", id);
	}
	return id;
};

Grid.prototype.renderCell = function(td) {
	var value = td.getAttribute("__value");
	var type = td.getAttribute("__type");
	if ( "TYPE" == type && value ) {
		td.innerHTML = TypeModel.map[value].name;
		return;
	}
	td.innerHTML = value ? value : "&nbsp;";
};

Grid.prototype.makeLinkedData = function(data) {
	var firstRecordId, map = {};
	for ( var i = 0; i < data.length; i++ ) {
		var record = data[i];
		map[""+record.id] = record;
		if ( 0 == record.prevId ) {
			firstRecordId = record.id;
		}
	}
	if ( !firstRecordId ) {
		throw new Error("Bad data!");
	}
	var head = {};
	for ( 
		var id = firstRecordId, current = head; 
		0 != id; 
		id = map[id].nextId, current = current.next
		)
		current.next = map[id];
	return head.next;
};

Grid.prototype.elemGrid_click_handler = function(ev) {
	if ( "TD" != ev.target.tagName )
		return;
	var id = ev.target.parentNode.getAttribute("__id");
	if ( id ) {
		;
	} else {	
		this.createEditor(ev.target);
	}
};

Grid.prototype.elemGrid_dblclick_handler = function(ev) {
	if ( "TD" != ev.target.tagName )
		return;
	var id = ev.target.parentNode.getAttribute("__id");
	if ( id ) {	
		this.createEditor(ev.target);	
	} else {
		;
	}
	if ( window.getSelection ) {
		getSelection().removeAllRanges();
	}
};

Grid.prototype.createEditor = function(cell) {
	if ( !this.children.editor ) {
		;
	} else if ( cell == this.children.editor.container ) {
		return;
	} else {
		this.removeChild("editor");
	}
	var type = cell.getAttribute("__type");
	this.children.editor = CellEditorFactory.createEditor(cell, type);
	this.children.editor.onOkay.addListener(this.changeCell, this);
	this.children.editor.onCancel.addListener(this.revertCell, this);
};
