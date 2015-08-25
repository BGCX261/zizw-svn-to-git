import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

public class GsonFromJSONTest {

	private Gson gson;

	public List<Pet> petList;

	@Before
	public void setUp() {
		gson = new Gson();
	}

	@Test
	public void testInteger() {
		int intValue = gson.fromJson("21", int.class);
		Assert.assertEquals("", 21, intValue);
	}

	@Test
	public void testFloat() {
		float floatValue = gson.fromJson("12.34", float.class);
		Assert.assertEquals("", 12.34, floatValue, 0.001);
	}

	@Test
	public void testBoolean() {
		boolean booleanValue = gson.fromJson("true", boolean.class);
		Assert.assertTrue("", booleanValue);
	}

	@Test
	public void testString() {
		String stringValue = gson.fromJson("\"abc\"", String.class);
		Assert.assertEquals("", "abc", stringValue);
	}

	@Test
	public void testObject() {
		Pet petValue = gson.fromJson("{\"name\":\"Clark\",\"sex\":false}",
				Pet.class);
		Assert.assertEquals("", new Pet("Clark", false), petValue);
	}

	@Test
	public void testArray() {
		Pet[] petArrayValue = gson
				.fromJson(
						"[{\"name\":\"Clark\",\"sex\":true},{\"name\":\"Vivian\",\"sex\":false}]",
						Pet[].class);
		Assert.assertEquals("", new Pet("Clark", true), petArrayValue[0]);
		Assert.assertEquals("", new Pet("Vivian", false), petArrayValue[1]);
	}

	@Test
	public void testList() throws Exception {
		List<Pet> petArrayValue = gson
				.fromJson(
						"[{\"name\":\"Clark\",\"sex\":true},{\"name\":\"Vivian\",\"sex\":false}]",
						this.getClass().getField("petList").getGenericType());
		Assert.assertEquals("", new Pet("Clark", true), petArrayValue.get(0));
		Assert.assertEquals("", new Pet("Vivian", false), petArrayValue.get(1));
	}

	@Test
	public void testObjectWithList() throws Exception {
		House houseValue = gson
				.fromJson(
						"{\"address\":\"gz\",\"petList\":[{\"name\":\"Clark\",\"sex\":true},{\"name\":\"Vivian\",\"sex\":false}]}",
						House.class);
		Assert.assertEquals("", "gz", houseValue.getAddress());
		Assert.assertEquals("", new Pet("Clark", true), houseValue.getPet(0));
		Assert.assertEquals("", new Pet("Vivian", false), houseValue.getPet(1));
	}
}

interface IPet {
	String getName();

	boolean getSex();
}

class House {
	private String address;
	private List<Pet> petList;
	public String getAddress() {
		return address;
	}
	public Pet getPet(int index) {
		return petList.get(index);
	}
}

class Pet implements IPet {
	private String name;
	private boolean sex;

	public Pet() {
	}

	public Pet(String name, boolean sex) {
		this.name = name;
		this.sex = sex;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + (sex ? 1231 : 1237);
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
		final Pet other = (Pet) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (sex != other.sex)
			return false;
		return true;
	}

	public String getName() {
		return name;
	}

	public boolean getSex() {
		return sex;
	}

}
