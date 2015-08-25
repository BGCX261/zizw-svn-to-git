package com.honmansoft.rpc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.honmansoft.rpc.JSONParser;

public class JSONParserTest {

	private void check() {
		Object object = new JSONParser().parse(json);
		Assert.assertEquals(expectedObject, object);
	}

	private String json;
	private Object expectedObject;

	@Before
	public void setUp() {
		json = null;
		expectedObject = null;
	}

	@Test
	public void testString() {
		json = "\"abc\\\"def\"";
		expectedObject = "abc\\\"def";
		check();
		//
		json = "\"\"";
		expectedObject = "";
		check();
	}

	@Test
	public void testTrue() {
		json = "true";
		expectedObject = Boolean.TRUE;
		check();
	}

	@Test
	public void testFalse() {
		json = "false";
		expectedObject = Boolean.FALSE;
		check();
	}

	@Test
	public void testNull() {
		json = "null";
		expectedObject = null;
		check();
	}

	@Test
	public void testNumber() {
		json = "123";
		expectedObject = Double.valueOf(json);
		check();
		//
		json = "-123";
		expectedObject = Double.valueOf(json);
		check();
		//
		json = "-12.3";
		expectedObject = Double.valueOf(json);
		check();
		//
		json = "-12.";
		expectedObject = Double.valueOf(json);
		check();
		//
		json = "-12.3e+3";
		expectedObject = Double.valueOf(json);
		check();
	}

	@Test
	public void testObject() {
		Map map = null;
		//
		json = "{}";
		map = new HashMap();
		expectedObject = map;
		check();
		//
		json = "{,,,,}";
		map = new HashMap();
		expectedObject = map;
		check();
		//
		json = "{\"abc\":123}";
		map = new HashMap();
		map.put("abc", Double.valueOf("123"));
		expectedObject = map;
		check();
		//
		json = "{,,\"abc\":\"def\",,\"abc\":123,}";
		map = new HashMap();
		map.put("abc", "def");
		map.put("abc", Double.valueOf("123"));
		expectedObject = map;
		check();
	}

	@Test
	public void testArray() {
		List list = null;
		//
		json = "[]";
		list = new ArrayList();
		expectedObject = list;
		check();
		//
		json = "[,,,,]";
		list = new ArrayList();
		expectedObject = list;
		check();
		//
		json = "[\"abc\"]";
		list = new ArrayList();
		list.add("abc");
		expectedObject = list;
		check();
		//
		json = "[,\"abc\",\"def\",,]";
		list = new ArrayList();
		list.add("abc");
		list.add("def");
		expectedObject = list;
		check();
	}
}
