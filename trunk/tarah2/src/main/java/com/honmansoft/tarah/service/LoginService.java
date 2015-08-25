package com.honmansoft.tarah.service;

import com.honmansoft.tarah.facade.Login;

public class LoginService implements Login {

	public boolean login(String username, String password) {
		System.out.println(username + "/" + password);
		return false;
	}

}
