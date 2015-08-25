
var CellEditorFactory = function() {
	this.modelList = {};	
};

CellEditorFactory.prototype.createCellEditor = function(targetCell, dataType, fieldName, date) {
	if ( "TEXT" == dataType ) {
		return new TextCellEditor(new Updater(fieldName, targetCell, date), targetCell);
	} else if ( "ITEM" == dataType ) {
		var model = this.getSelectModel(dataType);
		return new SelectCellEditor(new Updater(fieldName, targetCell, date), targetCell, model);
	} else if ( "CATEGORY" == dataType ) {
		var model = this.getSelectModel(dataType);
		return new SelectCellEditor(new Updater(fieldName, targetCell, date), targetCell, model);
	} else if ( "MONEY" == dataType ) {
		return new MoneyCellEditor(new Updater(fieldName, targetCell, date), targetCell);
	} else {
		;
	}
};

CellEditorFactory.prototype.getSelectModel = function(dataType) {
	var model = this.modelList[dataType];
	if ( !model ) {
		model = {"":""};
		var rs = db.execute("select * from " + dataType);
		for ( ; rs.isValidRow(); rs.next() ) {
			var id = rs.fieldByName("id");
			var name = rs.fieldByName("name");
			model[id] = name;
		}
		rs.close();
		this.modelList[dataType] = model;
	}
	return model;
};

var AbstractCellEditor = function(updater, targetCell) {
	this.targetCell = targetCell;
	this.updater = updater;
};

AbstractCellEditor.prototype.destroy = function() {
	;
};

var TextCellEditor = function(updater, targetCell) {
	TextCellEditor.superclass.constructor.call(this, updater, targetCell);
	// create input
	this.targetCell.innerHTML = "";
	this.input = document.createElement("input");
	this.targetCell.appendChild(this.input);
	this.input.style.width = "100%";
	this.input.style.borderWidth = "0px";
	this.input.style.backgroundColor = "darkseagreen";
	this.input.focus();
	// set value
	this.loadValue();
};

lang.extend(TextCellEditor, AbstractCellEditor);

TextCellEditor.prototype.loadValue = function() {
	var value = this.targetCell.getAttribute("__value");
	value = value ? value : "";
	this.input.value = value;
};

TextCellEditor.prototype.storeValue = function() {
	var oldValue = this.targetCell.getAttribute("__value");
	var newValue = this.input.value;
	if ( oldValue != newValue ) {
		this.targetCell.setAttribute("__value", newValue);
		this.updater.doUpdate(newValue);
	}
	this.targetCell.innerHTML = newValue;
};

TextCellEditor.prototype.destroy = function() {
	if ( !this.destroyed ) {
		this.targetCell.removeChild(this.input);
		this.storeValue();
		TextCellEditor.superclass.destroy.call(this);
		this.destroyed = true;
	}
};

/*******************************************************************/

var MoneyCellEditor = function(updater, targetCell) {
	MoneyCellEditor.superclass.constructor.call(this, updater, targetCell);
	this.oldValue = this.input.value;
};

lang.extend(MoneyCellEditor, TextCellEditor);

MoneyCellEditor.prototype.storeValue = function() {
	var value = this.input.value;
	var match = (/^[0-9]+(.[0-9]{1,2})?$/.test(value));
	if ( !match ) {
		this.input.value = this.oldValue;
	}
	MoneyCellEditor.superclass.storeValue.call(this);
};

/*******************************************************************/

var SelectCellEditor = function(updater, targetCell, model) {
	SelectCellEditor.superclass.constructor.call(this, updater, targetCell);
	// set members
	this.model = model;
	// create input
	this.targetCell.innerHTML = "";
	this.select = document.createElement("select");
	this.targetCell.appendChild(this.select);
	for ( var prop in this.model ) {
		var option = document.createElement("option");
		this.select.appendChild(option);
		option.value = prop;
		option.innerHTML = this.model[prop];
	}
	this.select.style.backgroundColor = "darkseagreen";
	this.select.style.width = "100%";
	this.select.style.borderWidth = "0px";
	// set value
	this.loadValue();
};

lang.extend(SelectCellEditor, AbstractCellEditor);

SelectCellEditor.prototype.loadValue = function() {
	var value = this.targetCell.getAttribute("__value");
	value = value ? value : "";
	this.select.value = value;
};

SelectCellEditor.prototype.storeValue = function() {
	var oldValue = this.targetCell.getAttribute("__value");
	var newValue = this.select.value;
	if ( oldValue != newValue ) {
		this.targetCell.setAttribute("__value", newValue);		
		this.updater.doUpdate(newValue);
	}
	this.targetCell.innerHTML = this.model[newValue];
};

SelectCellEditor.prototype.destroy = function() {
	if ( !this.destroyed ) {
		this.targetCell.removeChild(this.select);
		this.storeValue();
		SelectCellEditor.superclass.destroy.call(this);
		this.destroyed = true;
	}
};

/*******************************************************************/

var Updater = function(fieldName, cell, date) {
	var userInfo = jsloader.resolve("userInfo");
	this.user_id = userInfo.id;
	this.idx = cell.parentNode.parentNode.rowIndex+1;
	this.date = domutils.formatDate(date);
	var rs = db.execute("select * from account where idx = ? and date_of_account = ?", [this.idx, this.date]);
	if ( rs.isValidRow() ) {
		this.doInsert = false;
		this.sql = "update account set " + fieldName + " = ? where idx = ? and date_of_account = ?";
	} else {
		this.doInsert = true;
		this.sql = "insert into account (" + fieldName + ", idx, date_of_account, user_id) values ( ?, ?, ?, ? )";
	}
};

Updater.prototype.doUpdate = function(newValue) {
	var newValue = domutils.strip(newValue);
	if ( !newValue ) {
		return;
	}
	if ( this.doInsert ) {
		db.execute(this.sql, [newValue, this.idx, this.date, this.user_id]);
	} else {
		db.execute(this.sql, [newValue, this.idx, this.date]);
	}
};
