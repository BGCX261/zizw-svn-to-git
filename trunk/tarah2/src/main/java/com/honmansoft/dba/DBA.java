package com.honmansoft.dba;

import java.sql.Connection;
import java.sql.SQLException;

public interface DBA {

	//

	void createDatabase(Connection conn, String database, String username,
			String password) throws SQLException;

	void dropDatabase(Connection conn, String database) throws SQLException;

	boolean isDatabaseExist(Connection conn, String database)
			throws SQLException;

	//

	void createTable(Connection conn, String database, String table,
			Column[] cols) throws SQLException;

	void dropTable(Connection conn, String database, String table)
			throws SQLException;

	boolean isTableExist(Connection conn, String database, String table)
			throws SQLException;

	//

	void addColumn(Connection conn, String database, String table, Column column)
			throws SQLException;

	void removeColumn(Connection conn, String database, String table,
			String column) throws SQLException;

	boolean isColumnExist(Connection conn, String database, String table,
			String column) throws SQLException;
}
