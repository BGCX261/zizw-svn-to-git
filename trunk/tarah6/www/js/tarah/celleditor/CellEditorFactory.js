
var TextCellEditor = jsloader.resolve("tarah.celleditor.TextCellEditor");
var TypeSelectCellEditor = jsloader.resolve("tarah.celleditor.TypeSelectCellEditor");

var CellEditorFactory = {
	createEditor: function(cell, fieldType) {
		if ( "TYPE" == fieldType ) {		
			return new TypeSelectCellEditor(cell);	
		} else if ( "AMOUNT" == fieldType ) {		
			return new TextCellEditor(cell);	
		} else if ( "DESC" == fieldType ) {		
			return new TextCellEditor(cell);	
		} else {
			throw new Error("Unkown field type.");
		}
	}
};
