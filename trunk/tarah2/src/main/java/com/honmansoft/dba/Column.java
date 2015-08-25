package com.honmansoft.dba;

public class Column {
	private String name;
	private Type type;
	private int length;

	public Column(String name, Type type) {
		this.name = name;
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public static enum Type {
		INTEGER, DOUBLE, STRING, DATE, TIME, DATETIME, TEXT, BINARY
	}
}
