package com.honmansoft.dba;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import org.junit.Assert;
import org.junit.Test;

public class TypeMappingTest {

	static void check(String type) {
		try {
			Connection conn = _TestEnv.getConnection();
			//
			Statement stmt = conn.createStatement();
			stmt.executeUpdate("create table __test_types ( mycol " + type
					+ " )");
			stmt.close();
			//
			stmt = conn.createStatement();
			stmt.executeUpdate("drop table __test_types");
			stmt.close();
			//
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
			Assert.assertTrue(false);
		}
	}

	@Test
	public void test() {
		check(MySQLDBA.getType(Column.Type.INTEGER));
		check(MySQLDBA.getType(Column.Type.DOUBLE));
		check(MySQLDBA.getType(Column.Type.STRING));
		check(MySQLDBA.getType(Column.Type.DATE));
		check(MySQLDBA.getType(Column.Type.TIME));
		check(MySQLDBA.getType(Column.Type.DATETIME));
		check(MySQLDBA.getType(Column.Type.TEXT));
		check(MySQLDBA.getType(Column.Type.BINARY));
	}
}
