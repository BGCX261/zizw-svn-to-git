package com.honmansoft.tarah.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class UserDAO {
	public User load(String username) {
		throw null;
	}

	public void remove(String username) {

	}

	public void save(User user) {
		Connection conn = getConnection();
		try {
			PreparedStatement stmt = conn
					.prepareStatement("insert into user(username,password) values (?,?)");
			stmt.setString(1, user.getUsername());
			stmt.setString(2, user.getPassword());
			System.out.println(stmt.executeUpdate());
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	static Connection getConnection() {
		String url = "jdbc:mysql://localhost:6688/tarah";
		Properties props = new Properties();
		props.setProperty("user", "tarah");
		props.setProperty("password", "tarah");
		try {
			return DriverManager.getConnection(url, props);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}
