package com.honmansoft.rpc;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class JSONBuilderTest {

	JSONBuilder jsonBuilder;
	private String json;
	StringBuffer expectedJSON;

	@Before
	public void setUp() {
		jsonBuilder = new JSONBuilder();
		json = null;
		expectedJSON = new StringBuffer();
	}

	@Test
	public void testBuildString() {
		json = jsonBuilder.buildString("abc");
		expectedJSON.append("\"abc\"");
		Assert.assertEquals(expectedJSON.toString(), json);
	}

	@Test
	public void testBuildBoolean() {
		json = jsonBuilder.buildBoolean(Boolean.TRUE);
		expectedJSON.append("true");
		Assert.assertEquals(expectedJSON.toString(), json);
	}

	@Test
	public void testBuildObject() {
		Map map = new HashMap();
		map.put("stringA", "strA");
		map.put("booleanA", Boolean.TRUE);
		json = jsonBuilder.buildObject(map);
		expectedJSON.append("{");
		expectedJSON.append("\"stringA\":\"strA\",");
		expectedJSON.append("\"booleanA\":true");
		expectedJSON.append("}");
		Assert.assertEquals(expectedJSON.toString(), json);
	}
}
