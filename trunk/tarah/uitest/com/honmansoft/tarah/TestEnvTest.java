package com.honmansoft.tarah;

import java.sql.Connection;

import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.honmansoft.data.tarah.TarahDBA;
import com.honmansoft.tarah.testutils.TestBase;
import com.honmansoft.tarah.testutils.TestEnv;

public class TestEnvTest extends TestBase {

	@Test
	public void tetGetConnection() {
		Connection conn = TestEnv.getConnection();
		Assert.assertNotNull(conn);
	}

	@Test
	public void testGetNextId() {
		Assert.assertEquals(0, TestEnv.getNextId("user"));
		Assert.assertEquals(1, TestEnv.getNextId("user"));
	}
}
