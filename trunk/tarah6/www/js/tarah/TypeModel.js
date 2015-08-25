
var TypeDAO = jsloader.resolve("server.TypeDAO");

var TypeModel = new function() {
	this.data = TypeDAO.loadAll();
	this.map = {};
	for ( var i = 0; i < this.data.length; i++ ) {
		this.map[this.data[i].id+""] = this.data[i];
		if ( 0 == this.data[i].parentId ) {
			rootId = this.data[i].id;
		}
	}
	for ( var i = 0; i < this.data.length; i++ ) {
		var type = this.data[i];
		var parentId = type.parentId;
		var parentType = this.map[parentId];
		if ( parentType ) {
			if ( !parentType.children ) {
				parentType.children = [];
			}
			parentType.children.push(type);
			type.parentType = parentType;
		} else if ( 0 == parentId ) {
			this.rootType = type;
		} else {
			throw new Error("Bad data.");
		}
	}
}();
