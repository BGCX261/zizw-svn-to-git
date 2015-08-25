package com.honmansoft.tarah.testutils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.honmansoft.data.tarah.TarahDBA;

public class TestEnv {

	public static String BROWSER = "*iexplore";

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static Connection getConnection() {
		return TarahDBA.getConnection();
	}

	public static String makePassword(String original) {
		return original;
	}

	public static long getNextId(String tableName) {
		try {
			Connection conn = TarahDBA.getConnection();
			conn.setAutoCommit(false);
			// read nextId
			PreparedStatement stmt = conn
					.prepareStatement("select nextid from keygen where tablename = ?");
			stmt.setString(1, tableName);
			stmt.executeQuery();
			ResultSet rs = stmt.getResultSet();
			rs.next();
			long nextId = rs.getLong("nextid");
			// set nextId
			stmt = conn
					.prepareStatement("update keygen set nextid = ? where tablename = ?");
			stmt.setLong(1, nextId + 1);
			stmt.setString(2, tableName);
			stmt.executeUpdate();
			// commit
			conn.commit();
			return nextId;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}
