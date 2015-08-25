package com.honmansoft.dba;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class _TestEnv {

	static {
		_TestEnv.loadDriver("com.mysql.jdbc.Driver");
	}

	public static Connection getConnection() throws SQLException {
		return getConnection("test", "root", "");
	}

	private static Connection getConnection(String database, String username,
			String password) throws SQLException {
		Properties props = new Properties();
		props.setProperty("user", username);
		props.setProperty("password", password);
		return DriverManager.getConnection("jdbc:mysql://localhost:6688/"
				+ database, props);
	}

	public static void loadDriver(String className) {
		try {
			Class.forName(className);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		}
	}

	public static DBA createDBA() {
		return new MySQLDBA();
	}

}
