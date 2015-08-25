package com.honmansoft.tarah;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.honmansoft.tarah.testutils.AUI;
import com.honmansoft.tarah.testutils.TestBase;
import com.honmansoft.tarah.testutils.TestEnv;
import com.thoughtworks.selenium.DefaultSelenium;
import com.thoughtworks.selenium.Selenium;

public class LoginTest extends TestBase {

	private Selenium selenium;

	boolean ok = false;

	private void addUser() {
		Connection conn = TestEnv.getConnection();
		try {
			long id = TestEnv.getNextId("user");
			String username = "goodusername";
			String password = TestEnv.makePassword("goodpassword");
			PreparedStatement stmt = conn
					.prepareStatement("insert into user (id,username,password) values(?, ?, ?)");
			stmt.setLong(1, id);
			stmt.setString(2, username);
			stmt.setString(3, password);
			stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void deleteUser() {
		Connection conn = TestEnv.getConnection();
		try {
			PreparedStatement stmt = conn
					.prepareStatement("delete from user where username = ?");
			stmt.setString(1, "goodusername");
			stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void login() {
		// 输入用户名
		selenium.type(AUI.LOGIN_USERNAME, "goodusername");
		// 输入密码
		selenium.type(AUI.LOGIN_PASSWORD, "goodpassword");
		// 点击登录按钮
		selenium.click(AUI.LOGIN_LOGIN);		
	}
	
	@Before
	public void setUp() {
		// 启动Selenium
		String server = "localhost";
		int port = 4444;
		String browser = TestEnv.BROWSER;
		String url = "http://localhost:8080";
		selenium = new DefaultSelenium(server, port, browser, url);
		selenium.start();
		// 打开登录界面
		selenium.open("http://localhost:8080/tarah");
	}

	@After
	public void tearDown() {
		selenium.stop();
	}

	@Test
	// 可以正确登录
	public void testLoginOkay() {
		// 手工创建用户
		addUser();
		// 登录
		login();
		// 手工删除用户
		deleteUser();
		// 登录成功
		ok = selenium.isElementPresent(AUI.APPLICATION);
		Assert.assertTrue(ok);
	}

	@Test
	// 登录失败显示错误信息
	public void testLoginFailed() {
		// 登录
		login();
		// 有错误信息
		ok = selenium.isElementPresent(AUI.LOGIN_ERROR);
		Assert.assertTrue(ok);
	}
}
