package com.honmansoft.tarah.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.honmansoft.data.tarah.TarahDBA;
import com.honmansoft.tarah.facade.Login;

public class LoginService implements Login {

	public boolean login(String username, String password) {
		Connection conn = TarahDBA.getConnection();
		try {
			PreparedStatement stmt = conn
					.prepareStatement("select * from user where username = ?");
			stmt.setString(1, username);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return rs.getString("password").equals("goodpassword");
			} else {
				return false;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw null;
		}
	}

}
