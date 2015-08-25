package com.honmansoft.jsob;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ObfNamer implements INamer {

	public String name(String oldName) {
		String newName = map.get(oldName);
		if (null == newName) {
			newName = getNextName();
			map.put(oldName, newName);
		}
		return newName;
	}

	String getNextName() {
		return "_" + nextIndex++;
	}

	public Iterator<Map.Entry<String, String>> iterator() {
		return map.entrySet().iterator();
	}

	int nextIndex = 0;

	Map<String, String> map = new HashMap<String, String>();
}
