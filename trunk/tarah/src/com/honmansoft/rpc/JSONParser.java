package com.honmansoft.rpc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JSONParser {

	private int offset;
	private String json;

	public Object parse(String json) {
		this.json = json;
		this.offset = 0;
		return parseValue();
	}

	public Object parseValue() {
		if ('"' == json.charAt(offset)) {
			return parseString();
		} else if ('{' == json.charAt(offset)) {
			return parseObject();
		} else if ('[' == json.charAt(offset)) {
			return parseArray();
		} else if (offset == json.indexOf("true", offset)) {
			offset += 4;
			return Boolean.TRUE;
		} else if (offset == json.indexOf("false", offset)) {
			offset += 5;
			return Boolean.FALSE;
		} else if (offset == json.indexOf("null", offset)) {
			offset += 4;
			return null;
		} else {
			return parseNumber();
		}
	}

	public Object parseArray() {
		List list = new ArrayList();
		offset++;
		for (;;) {
			if (']' == json.charAt(offset)) {
				break;
			} else if (',' == json.charAt(offset)) {
				offset++;
			} else {
				Object value = parseValue();
				list.add(value);
			}
		}
		offset++;
		return list;
	}

	public Object parseObject() {
		Map map = new HashMap();
		offset++;
		for (;;) {
			if ('}' == json.charAt(offset)) {
				break;
			} else if (',' == json.charAt(offset)) {
				offset++;
			} else {
				String name = parseString();
				offset++;
				Object value = parseValue();
				map.put(name, value);
			}
		}
		offset++;
		return map;
	}

	public Double parseNumber() {
		int nextOffset = json.length();
		char[] cs = new char[] { ',', ']', '}' };
		for (int i = 0; i < cs.length; i++) {
			int index = json.indexOf(cs[i], offset);
			if (-1 == index)
				continue;
			nextOffset = nextOffset < index ? nextOffset : index;
		}
		Double number = Double.valueOf(json.substring(offset, nextOffset));
		offset = nextOffset;
		return number;
	}

	public String parseString() {
		int nextOffset = offset;
		do {
			nextOffset = json.indexOf('"', nextOffset + 1);
			if (-1 == nextOffset)
				throw null;
		} while ('\\' == json.charAt(nextOffset - 1));
		String s = json.substring(offset + 1, nextOffset);
		offset = nextOffset + 1;
		return s;
	}
}
