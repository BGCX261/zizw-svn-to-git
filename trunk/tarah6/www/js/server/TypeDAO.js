
var Connection = jsloader.resolve("server.impl.Connection");

var TypeDAO = {
	load: function(parentId) {
		var data = [];
		var conn = new Connection();
		var rs = conn.execute("select * from type where parent_id = ?", [parentId]);
		for ( ; rs.isValidRow(); rs.next() ) {
			var id = rs.fieldByName("id");
			var parentId = rs.fieldByName("parent_id");
			var name = rs.fieldByName("name");
			data.push({
				id:id,
				parentId:parentId,
				name:name
			});
		} 
		rs.close();
		conn.destroy();
		return data;
	},
	loadAll: function() {
		var data = [];
		var conn = new Connection();
		var rs = conn.execute("select * from type");
		for ( ; rs.isValidRow(); rs.next() ) {
			var id = rs.fieldByName("id");
			var parentId = rs.fieldByName("parent_id");
			var name = rs.fieldByName("name");
			data.push({
				id:id,
				parentId:parentId,
				name:name
			});
		} 
		rs.close();
		conn.destroy();
		return data;
	}
};
