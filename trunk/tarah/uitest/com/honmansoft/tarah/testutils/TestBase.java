package com.honmansoft.tarah.testutils;

import org.junit.AfterClass;
import org.junit.BeforeClass;

import com.honmansoft.data.tarah.TarahDBA;

public abstract class TestBase {

	@BeforeClass
	public static void setUpDB() {
		TarahDBA.initDatabase();
	}

	@AfterClass
	public static void tearDownDB() {
		TarahDBA.dropDatabase();
	}

}
