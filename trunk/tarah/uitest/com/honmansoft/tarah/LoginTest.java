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
		// �����û���
		selenium.type(AUI.LOGIN_USERNAME, "goodusername");
		// ��������
		selenium.type(AUI.LOGIN_PASSWORD, "goodpassword");
		// �����¼��ť
		selenium.click(AUI.LOGIN_LOGIN);		
	}
	
	@Before
	public void setUp() {
		// ����Selenium
		String server = "localhost";
		int port = 4444;
		String browser = TestEnv.BROWSER;
		String url = "http://localhost:8080";
		selenium = new DefaultSelenium(server, port, browser, url);
		selenium.start();
		// �򿪵�¼����
		selenium.open("http://localhost:8080/tarah");
	}

	@After
	public void tearDown() {
		selenium.stop();
	}

	@Test
	// ������ȷ��¼
	public void testLoginOkay() {
		// �ֹ������û�
		addUser();
		// ��¼
		login();
		// �ֹ�ɾ���û�
		deleteUser();
		// ��¼�ɹ�
		ok = selenium.isElementPresent(AUI.APPLICATION);
		Assert.assertTrue(ok);
	}

	@Test
	// ��¼ʧ����ʾ������Ϣ
	public void testLoginFailed() {
		// ��¼
		login();
		// �д�����Ϣ
		ok = selenium.isElementPresent(AUI.LOGIN_ERROR);
		Assert.assertTrue(ok);
	}
}
