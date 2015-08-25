var Connection = jsloader.resolve("core.GGDBConnection");

var LoginService = {
	login: function(username, password) {
		var conn = new Connection("tarah");
		var userInfo = null;		
		try {
			var rs = conn.execute("select * from user where username = ?", [username]);
			if ( rs.isValidRow() ) {
				var expectedPassword = rs.fieldByName("password");
				var passed = this.checkPassword(expectedPassword, password);
				if ( passed )			
					userInfo = {
						id: rs.fieldByName("id"),
						username: rs.fieldByName("username")
					};
			}
			rs.close();
		} catch(ex) {
			throw ex;
		} finally {
			conn.destroy();
		}
		return userInfo;
	},
	checkPassword: function(expectedPassword, password) {
		return expectedPassword == password;
	}
};
