
var BaseCellEditor = jsloader.resolve("tarah.celleditor.BaseCellEditor");
var TypeModel = jsloader.resolve("tarah.TypeModel");

var TypeSelectCellEditor = function(cell) {
	TypeSelectCellEditor.superclass.constructor.call(this, cell, document.body, fullName);
	this.setEditorPosition();
	this.loadValue();
};

Lang.extend(TypeSelectCellEditor, BaseCellEditor);

TypeSelectCellEditor.prototype.afterDestroy = function() {
	this.onOkay.fire(this.cell, this.value);
};

TypeSelectCellEditor.prototype.loadValue = function() {
	this.value = this.getCellValue();
	var valuePath = this.makeValuePath(this.value);
	this.expandNode(0, 1);
	this.setValue(0, valuePath.length-1, valuePath);
};

TypeSelectCellEditor.prototype.makeValuePath = function(value) {
	var valuePath = [];
	if ( value )
		for ( var id = value; id != TypeModel.rootType.id; id = TypeModel.map[id].parentType.id ) {
			valuePath.push(id);
		}
	else
		valuePath.push(value);
	return valuePath;
};

TypeSelectCellEditor.prototype.setValue = function(tdIndex, valueIndex, valuePath) {
	var td = this.elemTree.cells[tdIndex];
	var select= td.firstChild;
	for ( var i = 0; i < select.options.length; i++ ) {
		if ( select.options[i].value == valuePath[valueIndex] ) {
			select.options[i].selected = true;
			break;
		}
	}
	if ( 0 == valueIndex ) {
		return;
	}
	this.expandNode(tdIndex+1, valuePath[valueIndex]);
	this.setValue(tdIndex+1, valueIndex-1, valuePath);
};

TypeSelectCellEditor.prototype.expandNode = function(tdIndex, parentId) {	
	var data = TypeModel.map[parentId].children;
	if ( !data || 0 == data.length ) {
		return;
	}
	if ( this.elemTree.cells.length == tdIndex ) {
		Domutils.createElem(this.elemTree, "TD");
	}
	var td = this.elemTree.cells[tdIndex];
	td.innerHTML = "";
	var select = Domutils.createElem(td, "SELECT");
	this.eventHelper.attachListener(select, "change", function(ev) {
		var option;
		for ( var i = 0; i < ev.target.options.length; i++ ) {
			if ( ev.target.options[i].selected )
				option = ev.target.options[i];
		}
		tdIndex = ev.target.parentNode.cellIndex+1;
		id = option.value;
		while ( this.elemTree.cells.length > tdIndex ) {
			this.elemTree.removeChild(this.elemTree.cells[tdIndex]);
		}
		this.cell.innerHTML = option.innerHTML;
		this.value = id;
		this.expandNode(tdIndex, id);
	}, this);
	select.multiple = true;	
	select.style.height = "100%";
	for ( var i = 0; i < data.length; i++ ) {
		var option = Domutils.createElem(select, "OPTION");
		option.innerHTML = data[i].name;
		option.value = data[i].id;
	}
	select.value = 0;
};

TypeSelectCellEditor.prototype.setEditorPosition = function() {
	var position = Domutils.getPositionedOffset(this.cell);
	this.element.style.left = position.left + "px";
	this.element.style.top = (position.top+25) + "px";
};
