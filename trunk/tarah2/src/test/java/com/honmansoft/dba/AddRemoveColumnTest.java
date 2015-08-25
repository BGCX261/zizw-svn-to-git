package com.honmansoft.dba;

import java.sql.SQLException;
import java.sql.Types;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class AddRemoveColumnTest {

	private static final DBA dba = _TestEnv.createDBA();

	private static final String DATABASE = "DATABASE_HMX";

	private static final String TABLE = "TABLE_HMX";

	private static final String COLUMN_1 = "COL_1_HMX";

	private static final String COLUMN_2 = "COL_2_HMX";

	private static final String USERNAME = "USERNAME_HMX";

	private static final String PASSWORD = "PASSWORD_HMX";

	@Before
	public void testAddColumn() throws SQLException {
		// create database
		dba.createDatabase(_TestEnv.getConnection(), DATABASE, USERNAME,
				PASSWORD);
		// create table
		dba.createTable(_TestEnv.getConnection(), DATABASE, TABLE,
				new Column[] { new Column(COLUMN_1, Column.Type.INTEGER) });
		// test
		Assert.assertFalse(dba.isColumnExist(_TestEnv.getConnection(),
				DATABASE, TABLE, COLUMN_2));
		// add column
		dba.addColumn(_TestEnv.getConnection(), DATABASE, TABLE, new Column(
				COLUMN_2, Column.Type.INTEGER));
		// test
		Assert.assertTrue(dba.isColumnExist(_TestEnv.getConnection(), DATABASE,
				TABLE, COLUMN_2));
	}

	@After
	public void testRemoveColumn() throws SQLException {
		// remove column
		dba.removeColumn(_TestEnv.getConnection(), DATABASE, TABLE, COLUMN_2);
		// test
		Assert.assertFalse(dba.isColumnExist(_TestEnv.getConnection(),
				DATABASE, TABLE, COLUMN_2));
		// drop table
		dba.dropTable(_TestEnv.getConnection(), DATABASE, TABLE);
		// drop database
		dba.dropDatabase(_TestEnv.getConnection(), DATABASE);
	}

	@Test
	public void blank() throws SQLException {

	}
}
