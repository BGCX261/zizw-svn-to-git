package com.honmansoft.data.tarah;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class TarahDBA {

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void dropDatabase() {
		Connection conn = getConnectionIntern("root", null, "mysql");
		try {
			Statement stmt = conn.createStatement();
			// clear
			stmt.executeUpdate("drop database tarah");
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
	
	public static void initDatabase() {
		Connection conn = getConnectionIntern("root", null, "mysql");
		try {
			Statement stmt = conn.createStatement();
			stmt.executeUpdate("create database tarah");
			stmt.executeUpdate("use tarah");
			// keygen
			stmt.executeUpdate("create table keygen (tablename varchar(30), nextid bigint not null, primary key (tablename))");
			// user
			stmt.executeUpdate("create table user (id bigint, username varchar(30) not null, password varchar(30) not null, primary key (id))");
			stmt.executeUpdate("insert into keygen values('user', 0)");
			// creat user
			stmt.executeUpdate("grant all privileges on tarah.* to 'tarah'@'localhost'");
			stmt.executeUpdate("set password for 'tarah'@'localhost' = password('tarah')");
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static Connection getConnection() {
		return getConnectionIntern("tarah", "tarah", "tarah");
	}

	private static Connection getConnectionIntern(String user, String password, String database) {
		try {
			Properties props = new Properties();
			props.put("user", user);
			if (null != password)
				props.put("password", password);
			props.put("useUnicode", "true");
			props.put("characterEncoding", "GBK");
			return DriverManager.getConnection(
					"jdbc:mysql://localhost:6688/"+database, props);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
}
