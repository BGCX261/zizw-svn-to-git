
var SelectCellEditor = jsloader.resolve("tarah.SelectCellEditor");

var CellEditorFactory = new function() {
	this.createEditor = function(target) {
		return new SelectCellEditor(target);		
	};
}();