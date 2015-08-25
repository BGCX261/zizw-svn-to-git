
var Connection = jsloader.resolve("server.impl.Connection");

var LoginService = {
	login: function(username, password) {
		var result = false;
		var conn = new Connection("tarah");
		try {
			rs = conn.execute("select * from user where username = ?", [username]);
			if ( rs.fieldByName("password") == password ) {
				result = true;
			} else {
				;
			}
			rs.close();
		} catch(ex) {
			throw new Error("SQL error: " + ex.message);
		} finally {
			try {
				conn.destroy();
			} catch(ex) {
				throw new Error("SQL error: " + ex.message);
			}
		}
		return result;
	}
};
