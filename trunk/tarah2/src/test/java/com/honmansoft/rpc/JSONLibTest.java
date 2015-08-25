package com.honmansoft.rpc;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import org.junit.Assert;
import org.junit.Test;

public class JSONLibTest {

	//
	// FROM JSON
	//

	// ////////////////////////////////////////

	@Test
	public void testPrimitive() {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		sb.append("\"string\",");
		sb.append("123,");
		sb.append("true,");
		sb.append("false,");
		sb.append("null");
		sb.append("]");
		String json = sb.toString();
		JSONArray jsonArray = JSONArray.fromObject(json);
		//
		Assert.assertEquals("string", jsonArray.getString(0));
		Assert.assertEquals(123, jsonArray.getInt(1));
		Assert.assertEquals(true, jsonArray.getBoolean(2));
		Assert.assertEquals(false, jsonArray.getBoolean(3));
		Assert.assertEquals(JSONNull.getInstance(), jsonArray.get(4));
	}

	@Test
	public void testPrimitiveArray() {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		sb.append("1.2,");
		sb.append("2.3,");
		sb.append("3.4,");
		sb.append("4.5");
		sb.append("]");
		String json = sb.toString();
		JSONArray jsonArray = JSONArray.fromObject(json);
		double[] array = (double[]) JSONArray.toArray(jsonArray, double.class);
		//
		Assert.assertEquals(1.2, array[0], 0.0001);
		Assert.assertEquals(2.3, array[1], 0.0001);
		Assert.assertEquals(3.4, array[2], 0.0001);
		Assert.assertEquals(4.5, array[3], 0.0001);
	}

	@Test
	public void testSimpleObject() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append("\"stringField\":\"string\",");
		sb.append("\"integerField\":123,");
		sb.append("\"booleanField\":true,");
		sb.append("\"objectField\":null");
		sb.append("}");
		String json = sb.toString();
		JSONObject jsonObject = JSONObject.fromObject(json);
		SimpleObject simpleObject = (SimpleObject) JSONObject.toBean(
				jsonObject, SimpleObject.class);
		//
		Assert.assertEquals("string", simpleObject.getStringField());
		Assert.assertEquals(123, simpleObject.getIntegerField());
		Assert.assertEquals(true, simpleObject.getBooleanField());
		Assert.assertEquals(JSONNull.getInstance(), simpleObject
				.getObjectField());
	}

	// ////////////////////////////////////////

	@Test
	public void testObjectArray() {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		sb.append("{");
		sb.append("\"stringField\":\"string\",");
		sb.append("\"integerField\":1,");
		sb.append("\"booleanField\":true,");
		sb.append("\"objectField\":null");
		sb.append("},");
		sb.append("{");
		sb.append("\"stringField\":\"string2\",");
		sb.append("\"integerField\":2,");
		sb.append("\"booleanField\":false,");
		sb.append("\"objectField\":null");
		sb.append("},");
		sb.append("{");
		sb.append("\"stringField\":\"string3\",");
		sb.append("\"integerField\":3,");
		sb.append("\"booleanField\":true,");
		sb.append("\"objectField\":null");
		sb.append("}");
		sb.append("]");
		String json = sb.toString();
		JSONArray jsonArray = JSONArray.fromObject(json);
		SimpleObject[] array = (SimpleObject[]) JSONArray.toArray(jsonArray,
				SimpleObject.class);
		// //
		Assert.assertEquals("string", array[0].getStringField());
		Assert.assertEquals(1, array[0].getIntegerField());
		Assert.assertEquals(true, array[0].getBooleanField());
		Assert.assertEquals(JSONNull.getInstance(), array[0].getObjectField());
		//
		Assert.assertEquals("string2", array[1].getStringField());
		Assert.assertEquals(2, array[1].getIntegerField());
		Assert.assertEquals(false, array[1].getBooleanField());
		Assert.assertEquals(JSONNull.getInstance(), array[1].getObjectField());
		//
		Assert.assertEquals("string3", array[2].getStringField());
		Assert.assertEquals(3, array[2].getIntegerField());
		Assert.assertEquals(true, array[2].getBooleanField());
		Assert.assertEquals(JSONNull.getInstance(), array[2].getObjectField());
	}

	@Test
	public void testObjectWithPrimitiveArray() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append("\"integerArray\":");
		sb.append("[");
		sb.append("1,");
		sb.append("2,");
		sb.append("3");
		sb.append("]");
		sb.append("}");
		String json = sb.toString();
		JSONObject jsonObject = JSONObject.fromObject(json);
		ObjectWithPrimitiveArray obj = (ObjectWithPrimitiveArray) JSONObject
				.toBean(jsonObject, ObjectWithPrimitiveArray.class);
		//
		Assert.assertEquals(1, obj.getIntegerArray()[0]);
		Assert.assertEquals(2, obj.getIntegerArray()[1]);
		Assert.assertEquals(3, obj.getIntegerArray()[2]);
	}

	@Test
	public void testObjectWithObjectArray() {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append("\"objectArray\":");
		sb.append("[");
		sb.append("{");
		sb.append("\"name\":\"name-1\",");
		sb.append("\"age\":1");
		sb.append("},");
		sb.append("{");
		sb.append("\"name\":\"name-2\",");
		sb.append("\"age\":2");
		sb.append("},");
		sb.append("{");
		sb.append("\"name\":\"name-3\",");
		sb.append("\"age\":3");
		sb.append("}");
		sb.append("]");
		sb.append("}");
		String json = sb.toString();
		JSONObject jsonObject = JSONObject.fromObject(json);
		ObjectWithObjectArray obj = (ObjectWithObjectArray) JSONObject.toBean(
				jsonObject, ObjectWithObjectArray.class);
		// //
		Assert.assertEquals("name-1", obj.getObjectArray()[0].getName());
		Assert.assertEquals(1, obj.getObjectArray()[0].getAge());
		//
		Assert.assertEquals("name-2", obj.getObjectArray()[1].getName());
		Assert.assertEquals(2, obj.getObjectArray()[1].getAge());
		//
		Assert.assertEquals("name-3", obj.getObjectArray()[2].getName());
		Assert.assertEquals(3, obj.getObjectArray()[2].getAge());
	}

	// ////////////////////////////////////////

	// ////////////////////////////////////////

	// ////////////////////////////////////////

	// ////////////////////////////////////////

	// ////////////////////////////////////////

	//
	// TESTEE
	//

	public static class SimpleObject {
		private String stringField;
		private int integerField;
		private boolean booleanField;
		private Object objectField;

		public String getStringField() {
			return stringField;
		}

		public void setStringField(String stringField) {
			this.stringField = stringField;
		}

		public int getIntegerField() {
			return integerField;
		}

		public void setIntegerField(int integerField) {
			this.integerField = integerField;
		}

		public boolean getBooleanField() {
			return booleanField;
		}

		public void setBooleanField(boolean booleanField) {
			this.booleanField = booleanField;
		}

		public Object getObjectField() {
			return objectField;
		}

		public void setObjectField(Object objectField) {
			this.objectField = objectField;
		}

	}

	public static class ObjectWithPrimitiveArray {
		private int[] integerArray;

		public int[] getIntegerArray() {
			return integerArray;
		}

		public void setIntegerArray(int[] integerArray) {
			this.integerArray = integerArray;
		}

	}

	public static class ObjectWithObjectArray {
		private Person[] objectArray;

		public Person[] getObjectArray() {
			return objectArray;
		}

		public void setObjectArray(Person[] objectArray) {
			this.objectArray = objectArray;
		}

	}

	public static class Person {
		private String name;
		private int age;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public int getAge() {
			return age;
		}

		public void setAge(int age) {
			this.age = age;
		}

	}
}
