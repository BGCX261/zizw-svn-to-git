package com.honmansoft.dba;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CreateDropDatabaseTest {

	private static final String POSTFIX = "_HMX";

	private static final String DATABASE_NAME = "DATABASE" + POSTFIX;

	private static final String USERNAME = "USERNAME" + POSTFIX;

	private static final String PASSWORD = "PASSWORD" + POSTFIX;

	private static final DBA dba = _TestEnv.createDBA();

	@Before
	public void testCreateDatabase() throws SQLException {
		// test
		Assert.assertFalse(dba.isDatabaseExist(_TestEnv.getConnection(),
				DATABASE_NAME));
		// create database
		dba.createDatabase(_TestEnv.getConnection(), DATABASE_NAME, USERNAME,
				PASSWORD);
		// test
		Assert.assertTrue(dba.isDatabaseExist(_TestEnv.getConnection(),
				DATABASE_NAME));
	}

	@After
	public void testDropDatabase() throws SQLException {
		// drop database
		Connection conn = _TestEnv.getConnection();
		dba.dropDatabase(conn, DATABASE_NAME);
		// test
		Assert.assertFalse(dba.isDatabaseExist(_TestEnv.getConnection(),
				DATABASE_NAME));
	}

	@Test
	public void blank() {
		;
	}

}
