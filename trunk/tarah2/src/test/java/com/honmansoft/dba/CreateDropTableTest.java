package com.honmansoft.dba;

import java.sql.SQLException;
import java.sql.Types;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CreateDropTableTest {

	private static final DBA dba = _TestEnv.createDBA();

	private static final String DATABASE = "DATABASE_HMX";

	private static final String TABLE = "TABLE_HMX";

	private static final String USERNAME = "USERNAME_HMX";

	private static final String PASSWORD = "PASSWORD_HMX";

	@Before
	public void testCreateTable() throws SQLException {
		// create database
		dba.createDatabase(_TestEnv.getConnection(), DATABASE, USERNAME,
				PASSWORD);
		// test
		Assert.assertFalse(dba.isTableExist(_TestEnv.getConnection(), DATABASE,
				TABLE));
		// create table
		Column[] cols = new Column[] { new Column(DATABASE, Column.Type.INTEGER),
				new Column(TABLE, Column.Type.INTEGER) };
		dba.createTable(_TestEnv.getConnection(), DATABASE, TABLE, cols);
		// test
		Assert.assertTrue(dba.isTableExist(_TestEnv.getConnection(), DATABASE,
				TABLE));
	}

	@After
	public void testDropTable() throws SQLException {
		// drop table
		dba.dropTable(_TestEnv.getConnection(), DATABASE, TABLE);
		// test
		Assert.assertFalse(dba.isTableExist(_TestEnv.getConnection(), DATABASE,
				TABLE));
		// drop database
		dba.dropDatabase(_TestEnv.getConnection(), DATABASE);
	}

	@Test
	public void blank() {
		;
	}
}
