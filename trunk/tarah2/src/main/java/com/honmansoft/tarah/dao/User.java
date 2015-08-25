package com.honmansoft.tarah.dao;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class User {

	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	String digestPassword(String password) {
		try {
			MessageDigest alga = MessageDigest.getInstance("MD5");
			alga.update(password.getBytes());
			byte[] digesta = alga.digest();
			return byte2hex(digesta);
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

	String byte2hex(byte[] bytes) {
		String hex = "";
		for (int n = 0; n < bytes.length; n++) {
			String x = (java.lang.Integer.toHexString(bytes[n] & 0xFF));
			hex += x.length() == 1 ? "0" + x : x;
		}
		return hex.toUpperCase();
	}

	public boolean checkPassword(String password) {
		if (password == null || this.password == null)
			return false;
		return this.password.equals(digestPassword(password));
	}
}
