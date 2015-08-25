package com.honmansoft.dba;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import com.mysql.jdbc.exceptions.MySQLSyntaxErrorException;

public class MySQLDBA implements DBA {

	public void createDatabase(Connection conn, String database,
			String username, String password) throws SQLException {
		PreparedStatement stmt = conn.prepareStatement("create database "
				+ database);
		stmt.executeUpdate();
		stmt.close();
		stmt = conn.prepareStatement("GRANT ALL PRIVILEGES ON " + database
				+ ".* TO ?@'localhost' IDENTIFIED BY ? WITH GRANT OPTION");
		stmt.setString(1, username);
		stmt.setString(2, password);
		stmt.executeUpdate();
		stmt.close();
		conn.close();
	}

	public void dropDatabase(Connection conn, String database)
			throws SQLException {
		Statement stmt = conn.createStatement();
		stmt.executeUpdate("drop database " + database);
		stmt.close();
		conn.close();
	}

	public boolean isDatabaseExist(Connection conn, String database)
			throws SQLException {
		Statement stmt = conn.createStatement();
		boolean exist = true;
		try {
			stmt.executeQuery("use " + database);
		} catch (MySQLSyntaxErrorException e) {
			exist = false;
		}
		stmt.close();
		conn.close();
		return exist;
	}

	public void createTable(Connection conn, String database, String table,
			Column[] cols) throws SQLException {
		Statement stmt = conn.createStatement();
		StringBuffer sb = new StringBuffer();
		sb.append("create table ").append(database).append(".").append(table);
		sb.append("(");
		for (int i = 0; i < cols.length; i++) {
			sb.append(cols[i].getName());
			sb.append(" ");
			sb.append(getType(cols[i].getType()));
			if (cols.length - 1 == i) {
				;
			} else {
				sb.append(",");
			}
		}
		sb.append(")");
		stmt.executeUpdate(sb.toString());
		stmt.close();
		conn.close();
	}

	public void dropTable(Connection conn, String database, String table)
			throws SQLException {
		Statement stmt = conn.createStatement();
		stmt.executeUpdate("drop table " + database + "." + table);
		stmt.close();
		conn.close();
	}

	public boolean isTableExist(Connection conn, String database, String table)
			throws SQLException {
		Statement stmt = conn.createStatement();
		boolean exist = true;
		try {
			stmt.executeQuery("select * from " + database + "." + table);
		} catch (MySQLSyntaxErrorException e) {
			exist = false;
		}
		stmt.close();
		conn.close();
		return exist;
	}

	public void addColumn(Connection conn, String database, String table,
			Column column) throws SQLException {
		StringBuffer sb = new StringBuffer();
		sb.append("alter table ").append(database).append(".").append(table);
		sb.append(" ADD COLUMN ").append(column.getName()).append(' ');
		sb.append(getType(column.getType()));
		Statement stmt = conn.createStatement();
		stmt.executeUpdate(sb.toString());
		stmt.close();
		conn.close();
	}

	public void removeColumn(Connection conn, String database, String table,
			String column) throws SQLException {
		StringBuffer sb = new StringBuffer();
		sb.append("alter table ").append(database).append(".").append(table);
		sb.append(" DROP COLUMN ").append(column);
		Statement stmt = conn.createStatement();
		stmt.executeUpdate(sb.toString());
		stmt.close();
		conn.close();
	}

	public boolean isColumnExist(Connection conn, String database,
			String table, String column) throws SQLException {
		Statement stmt = conn.createStatement();
		boolean exist = true;
		try {
			stmt.executeQuery("select " + column + " from " + database + "."
					+ table);
		} catch (MySQLSyntaxErrorException e) {
			exist = false;
		}
		stmt.close();
		conn.close();
		return exist;
	}

	// /////////////////////////////////////

	static String getType(Column.Type type) {
		if (Column.Type.INTEGER == type) {
			return "integer";
		} else if (Column.Type.DOUBLE == type) {
			return "double";
		} else if (Column.Type.STRING == type) {
			return "varchar(255)";
		} else if (Column.Type.DATE == type) {
			return "date";
		} else if (Column.Type.TIME == type) {
			return "time";
		} else if (Column.Type.DATETIME == type) {
			return "datetime";
		} else if (Column.Type.TEXT == type) {
			return "longtext";
		} else if (Column.Type.BINARY == type) {
			return "blob";
		} else {
			throw null;
		}
	}
}
