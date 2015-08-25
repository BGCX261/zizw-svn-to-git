package com.honmansoft.rpc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;

public class BeanBuilderTest {

	private BeanBuilder beanBuilder = new BeanBuilder();

	@Test
	public void testBuildBoolean() {
		boolean expectedValue = Boolean.TRUE;
		boolean booleanValue = beanBuilder.buildBoolean(expectedValue);
		Assert.assertEquals(expectedValue, booleanValue);
	}

	@Test
	public void testBuildByte() {
		byte expectedValue = (byte) 19;
		byte byteValue = beanBuilder.buildByte(Byte.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, byteValue);
	}

	@Test
	public void testBuildInt() {
		int expectedValue = 20;
		int intValue = beanBuilder.buildInt(Integer.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, intValue);
	}

	@Test
	public void testBuildShort() {
		short expectedValue = 20;
		short shortValue = beanBuilder.buildShort(Short.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, shortValue);
	}

	@Test
	public void testBuildLong() {
		long expectedValue = 21L;
		long longValue = beanBuilder.buildLong(Long.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, longValue);
	}

	@Test
	public void testBuildFloat() {
		float expectedValue = 1.2f;
		float floatValue = beanBuilder.buildFloat(Float.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, floatValue, 0.0001);
	}

	@Test
	public void testBuildDouble() {
		double expectedValue = 1.2;
		double doubleValue = beanBuilder.buildDouble(Double
				.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, doubleValue, 0.0001);
	}

	@Test
	public void testBuildChar() {
		char expectedValue = 'c';
		char charValue = beanBuilder
				.buildChar(Character.valueOf(expectedValue));
		Assert.assertEquals(expectedValue, charValue);
	}

	//
	//
	//

	@Test
	public void testBuildString() {
		String expectedValue = "s";
		String stringValue = beanBuilder.buildString(expectedValue);
		Assert.assertEquals(expectedValue, stringValue);
	}

	@Test
	public void testBuildEnum() {
		MyEnum expectedValue = MyEnum.MY_CONST;
		MyEnum enumValue = (MyEnum) beanBuilder.buildEnum("" + expectedValue,
				MyEnum.class);
		Assert.assertEquals(expectedValue, enumValue);
	}

	@Test
	public void testBuildObject() {
		MyObject expectedValue = new MyObject(1900, "astring", MyEnum.MY_CONST);
		//
		Map map = new HashMap();
		map.put("intValue", expectedValue.getIntValue());
		map.put("stringValue", expectedValue.getStringValue());
		map.put("enumValue", "" + expectedValue.getEnumValue());
		//
		MyObject objectValue = (MyObject) beanBuilder.buildObject(map,
				MyObject.class);
		Assert.assertEquals(expectedValue, objectValue);
	}

	@Test
	public void testBuildBooleanArray() {
		boolean[] expectedValue = new boolean[] { true, false, true };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		boolean[] arrayValue = (boolean[]) beanBuilder.buildArray(list,
				boolean.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildCharArray() {
		char[] expectedValue = new char[] { 'a', 'b', 'c' };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		char[] arrayValue = (char[]) beanBuilder.buildArray(list, char.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildByteArray() {
		byte[] expectedValue = new byte[] { 1, 2, 3 };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		byte[] arrayValue = (byte[]) beanBuilder.buildArray(list, byte.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildShortArray() {
		short[] expectedValue = new short[] { 1, 2, 3 };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		short[] arrayValue = (short[]) beanBuilder
				.buildArray(list, short.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildIntArray() {
		int[] expectedValue = new int[] { 1, 2, 3 };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		int[] arrayValue = (int[]) beanBuilder.buildArray(list, int.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildLongArray() {
		long[] expectedValue = new long[] { 1, 2, 3 };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		long[] arrayValue = (long[]) beanBuilder.buildArray(list, long.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildFloatArray() {
		float[] expectedValue = new float[] { 1, 2, 3 };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		float[] arrayValue = (float[]) beanBuilder
				.buildArray(list, float.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i], 0.0001);
		}
	}

	@Test
	public void testBuildDoubleArray() {
		double[] expectedValue = new double[] { 1, 2, 3 };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		double[] arrayValue = (double[]) beanBuilder.buildArray(list,
				double.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i], 0.0001);
		}
	}

	@Test
	public void testBuildStringArray() {
		String[] expectedValue = new String[] { "a", "b", "c" };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i]);
		}
		//
		String[] arrayValue = (String[]) beanBuilder.buildArray(list,
				String.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildEnumArray() {
		MyEnum[] expectedValue = new MyEnum[] { MyEnum.MY_CONST,
				MyEnum.MY_CONST, MyEnum.MY_CONST };
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			list.add(expectedValue[i] + "");
		}
		//
		MyEnum[] arrayValue = (MyEnum[]) beanBuilder.buildArray(list,
				MyEnum.class);
		Assert.assertEquals(expectedValue.length, arrayValue.length);
		for (int i = 0; i < arrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], arrayValue[i]);
		}
	}

	@Test
	public void testBuildObjectArray() {
		MyObject[] expectedValue = new MyObject[] {
				new MyObject(1, "a", MyEnum.MY_CONST),
				new MyObject(2, "b", MyEnum.MY_CONST),
				new MyObject(3, "c", MyEnum.MY_CONST) };
		//
		List list = new ArrayList();
		for (int i = 0; i < expectedValue.length; i++) {
			Map map = new HashMap();
			map.put("intValue", expectedValue[i].getIntValue());
			map.put("stringValue", expectedValue[i].getStringValue());
			map.put("enumValue", "" + expectedValue[i].getEnumValue());
			list.add(map);
		}
		//
		MyObject[] objectArrayValue = (MyObject[]) beanBuilder.buildArray(list,
				MyObject.class);
		Assert.assertEquals(expectedValue.length, objectArrayValue.length);
		for (int i = 0; i < objectArrayValue.length; i++) {
			Assert.assertEquals(expectedValue[i], objectArrayValue[i]);
		}
	}

	@Test
	public void testObjectWithArray() {
		MyObjectWithArray expectedObject = new MyObjectWithArray();
		expectedObject.setEnumArray(new MyEnum[] { MyEnum.MY_CONST,
				MyEnum.MY_CONST, MyEnum.MY_CONST });
		//
		Map map = new HashMap();
		List list = new ArrayList();
		for (int i = 0; i < expectedObject.getEnumArray().length; i++) {
			list.add("" + expectedObject.getEnumArray()[i]);
		}
		map.put("enumArray", list);
		//
		MyObjectWithArray object = (MyObjectWithArray) beanBuilder.buildObject(
				map, MyObjectWithArray.class);
		Assert.assertEquals(expectedObject, object);
	}

	static enum MyEnum {
		MY_CONST
	};

	static class MyObject {
		private boolean booleanValue;
		private char charValue;
		private byte byteValue;
		private short shortValue;
		private int intValue;
		private long longValue;
		private float floatValue;
		private double doubleValue;
		private String stringValue;
		private MyEnum enumValue;

		public MyObject() {
		}

		public MyObject(int intValue, String stringValue, MyEnum enumValue) {
			this.intValue = intValue;
			this.stringValue = stringValue;
			this.enumValue = enumValue;
		}

		public boolean isBooleanValue() {
			return booleanValue;
		}

		public void setBooleanValue(boolean booleanValue) {
			this.booleanValue = booleanValue;
		}

		public char getCharValue() {
			return charValue;
		}

		public void setCharValue(char charValue) {
			this.charValue = charValue;
		}

		public byte getByteValue() {
			return byteValue;
		}

		public void setByteValue(byte byteValue) {
			this.byteValue = byteValue;
		}

		public short getShortValue() {
			return shortValue;
		}

		public void setShortValue(short shortValue) {
			this.shortValue = shortValue;
		}

		public int getIntValue() {
			return intValue;
		}

		public void setIntValue(int intValue) {
			this.intValue = intValue;
		}

		public long getLongValue() {
			return longValue;
		}

		public void setLongValue(long longValue) {
			this.longValue = longValue;
		}

		public float getFloatValue() {
			return floatValue;
		}

		public void setFloatValue(float floatValue) {
			this.floatValue = floatValue;
		}

		public double getDoubleValue() {
			return doubleValue;
		}

		public void setDoubleValue(double doubleValue) {
			this.doubleValue = doubleValue;
		}

		public String getStringValue() {
			return stringValue;
		}

		public void setStringValue(String stringValue) {
			this.stringValue = stringValue;
		}

		public MyEnum getEnumValue() {
			return enumValue;
		}

		public void setEnumValue(MyEnum enumValue) {
			this.enumValue = enumValue;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + (booleanValue ? 1231 : 1237);
			result = prime * result + charValue;
			long temp;
			temp = Double.doubleToLongBits(doubleValue);
			result = prime * result + (int) (temp ^ (temp >>> 32));
			result = prime * result
					+ ((enumValue == null) ? 0 : enumValue.hashCode());
			result = prime * result + Float.floatToIntBits(floatValue);
			result = prime * result + intValue;
			result = prime * result + (int) (longValue ^ (longValue >>> 32));
			result = prime * result + shortValue;
			result = prime * result
					+ ((stringValue == null) ? 0 : stringValue.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			final MyObject other = (MyObject) obj;
			if (booleanValue != other.booleanValue)
				return false;
			if (byteValue != other.byteValue)
				return false;
			if (charValue != other.charValue)
				return false;
			if (Double.doubleToLongBits(doubleValue) != Double
					.doubleToLongBits(other.doubleValue))
				return false;
			if (enumValue == null) {
				if (other.enumValue != null)
					return false;
			} else if (!enumValue.equals(other.enumValue))
				return false;
			if (Float.floatToIntBits(floatValue) != Float
					.floatToIntBits(other.floatValue))
				return false;
			if (intValue != other.intValue)
				return false;
			if (longValue != other.longValue)
				return false;
			if (shortValue != other.shortValue)
				return false;
			if (stringValue == null) {
				if (other.stringValue != null)
					return false;
			} else if (!stringValue.equals(other.stringValue))
				return false;
			return true;
		}

	}

	static class MyObjectWithArray {
		private MyEnum[] enumArray;

		public MyObjectWithArray() {
		}

		public MyObjectWithArray(MyEnum[] enumArray) {
			this.enumArray = enumArray;
		}

		public MyEnum[] getEnumArray() {
			return enumArray;
		}

		public void setEnumArray(MyEnum[] enumArray) {
			this.enumArray = enumArray;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + Arrays.hashCode(enumArray);
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			final MyObjectWithArray other = (MyObjectWithArray) obj;
			if (!Arrays.equals(enumArray, other.enumArray))
				return false;
			return true;
		}

	}
}
