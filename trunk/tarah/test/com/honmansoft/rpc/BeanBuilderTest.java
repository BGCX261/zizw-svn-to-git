package com.honmansoft.rpc;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.honmansoft.rpc.BeanBuilder;

public class BeanBuilderTest {

	private void checkString() {
		String bean = new BeanBuilder().buildString(string);
		Assert.assertEquals(expectedBean, bean);
	}

	private void checkObject() {
		Testee bean = (Testee) new BeanBuilder().buildObject(object,
				Testee.class);
		Assert.assertEquals(expectedBean, bean);
	}

	private String string;
	private Map object;
	private Object expectedBean;

	@Before
	public void setUp() {
		string = null;
		object = null;
		expectedBean = null;
	}

	@Test
	public void testBuildString() {
		string = "fds";
		expectedBean = string;
		checkString();
	}

	@Test
	public void testBuildObject() {
		object = new HashMap();
		object.put("strA", "a");
		object.put("strB", "b");
		//
		Testee testee = new Testee();
		testee.setStrA("a");
		testee.setStrB("b");
		//
		expectedBean = testee;
		checkObject();
	}
}

class Testee {
	private String strA;
	private String strB;

	public String getStrA() {
		return strA;
	}

	public void setStrA(String strA) {
		this.strA = strA;
	}

	public String getStrB() {
		return strB;
	}

	public void setStrB(String strB) {
		this.strB = strB;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((strA == null) ? 0 : strA.hashCode());
		result = prime * result + ((strB == null) ? 0 : strB.hashCode());
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
		final Testee other = (Testee) obj;
		if (strA == null) {
			if (other.strA != null)
				return false;
		} else if (!strA.equals(other.strA))
			return false;
		if (strB == null) {
			if (other.strB != null)
				return false;
		} else if (!strB.equals(other.strB))
			return false;
		return true;
	}

}
