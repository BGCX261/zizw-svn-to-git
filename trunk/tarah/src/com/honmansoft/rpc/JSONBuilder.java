package com.honmansoft.rpc;

import java.util.Iterator;
import java.util.Map;

public class JSONBuilder {
	public String buildString(String string) {
		return "\"" + string + "\"";
	}

	public String buildBoolean(Boolean bool) {
		if (bool.booleanValue()) {
			return "true";
		} else {
			return "false";
		}
	}

	public String buildObject(Map map) {
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		for (Iterator iter = map.keySet().iterator(); iter.hasNext();) {
			String key = (String) iter.next();
			Object value = map.get(key);
			sb.append("\"" + key + "\"");
			sb.append(":");
			if (value instanceof String) {
				sb.append(buildString((String) value));
			} else if (value instanceof Boolean) {
				sb.append(buildBoolean((Boolean) value));
			} else if (value instanceof Map) {
				sb.append(buildObject((Map) value));
			} else {
				throw null;
			}
			if (iter.hasNext()) {
				sb.append(",");
			}
		}
		sb.append("}");
		return sb.toString();
	}
}
