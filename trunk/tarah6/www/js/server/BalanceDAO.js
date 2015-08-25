
var Connection = jsloader.resolve("server.impl.Connection");

var BalanceDAO = {
	load: function(date) {
		var data = [];
		var conn = new Connection();
		var rs = conn.execute("select * from balance where _date = ?", [date]);
		for ( ; rs.isValidRow(); rs.next() ) {
			var id = rs.fieldByName("id");
			var prevId = rs.fieldByName("prev_id");
			var nextId = rs.fieldByName("next_id");
			var type = rs.fieldByName("type");
			var amount = rs.fieldByName("amount");
			var desc = rs.fieldByName("desc");
			data.push({
				id:id,
				prevId:prevId,
				nextId:nextId,
				type:type,
				amount:amount,
				desc:desc
			});
		} 
		rs.close();
		conn.destroy();
		return data;
	},
	insert: function(date, prevId, nextId) {
		var conn = new Connection();
		conn.execute("insert into balance (_date,prev_id,next_id) values (?,?,?)", [date,prevId,nextId]);
		var id = conn.getLastInsertRowId();
		if ( prevId > 0 ) {
			conn.execute("update balance set next_id = ? where id = ?", [id, prevId]);
		}
		if ( nextId > 0 ) {
			conn.execute("update balance set prev_id = ? where id = ?", [id, nextId]);
		}
		conn.destroy();
		return id;
	},
	update: function(id, type, amount, desc) {
		var conn = new Connection();
		var rs = conn.execute("update balance set type = ?, amount = ?, desc = ? where id = ?", [type,amount,desc,id]);
		rs.close();
		conn.destroy();
	}
};
