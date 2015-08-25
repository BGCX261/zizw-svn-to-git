
var LoginService = {
	login: function(username, password) {
		var passed = false;
		var userInfo = {};
		var rs = db.execute('select * from user where username = ?', [username]);
		if ( rs.isValidRow() ) {
			var passwd = rs.fieldByName("password");
			passed = checkPassword(passwd, password);
		}
		if ( passed ) {
			userInfo = {
				id: rs.fieldByName,
				name: username
			};
		}
		rs.close();
		if ( passed ) {
			return userInfo
		} else {
			return null;
		}
	}	
};

var checkPassword = function(passwd, password) {
	return passwd == password;
};
