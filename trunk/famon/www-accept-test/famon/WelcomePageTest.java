package famon;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.thoughtworks.selenium.DefaultSelenium;
import com.thoughtworks.selenium.Selenium;

public class WelcomePageTest {
	private Selenium sel;

	private String url = Constants.SYS_BASE_URL + Constants.SYS_INNER_NAME;

	private String expectedString;

	private String inputString;

	private String locator;

	@Before
	public void setUp() {
		sel = new DefaultSelenium("localhost", 4444, Constants.BROWSER_NAME,
				Constants.SYS_BASE_URL);
		sel.start();
		sel.open(url);
	}

	@Test
	public void testRepresentation() {
		// 标题显示正确
		expectedString = "Welcome to " + Constants.SYS_OUTER_NAME;
		Assert.assertEquals(expectedString, sel.getTitle());
		// 用户标签可见
		locator = "//span[@hmsid='lblUsername']";
		Assert.assertTrue(sel.isVisible(locator));
		// 用户标签显示正确
		expectedString = "Username:";
		Assert.assertEquals(expectedString, sel.getText(locator));
		// 用户输入框可见
		locator = "//input[@hmsid='txtUsername' and @type='text']";
		Assert.assertTrue(sel.isVisible(locator));
		// 密码标签可见
		locator = "//span[@hmsid='lblPassword']";
		Assert.assertTrue(sel.isVisible(locator));
		// 密码标签显示正确
		expectedString = "Password:";
		Assert.assertEquals(expectedString, sel.getText(locator));
		// 密码输入框可见
		locator = "//input[@hmsid='txtPassword' and @type='password']";
		Assert.assertTrue(sel.isVisible(locator));
		// 登录按钮可见
		locator = "//input[@hmsid='btnLogin' and @type='button']";
		Assert.assertTrue(sel.isVisible(locator));
		// 登录按钮标签显示正确
		expectedString = "Login";
		locator = "//input[@hmsid='btnLogin' and @type='button']@value";
		Assert.assertEquals(expectedString, sel.getAttribute(locator));
	}

	@Test
	public void testLoginOkay() {
		// 输入用户名
		inputString = "good-username";
		locator = "//input[@hmsid='txtUsername']";
		sel.type(locator, inputString);
		// 输入密码
		inputString = "good-password";
		locator = "//input[@hmsid='txtPassword']";
		sel.type(locator, inputString);
		// 点击登录按钮
		locator = "//input[@hmsid='btnLogin']";
		sel.click(locator);
		// 等待页面载入，5秒超时
		sel.waitForPageToLoad("5000");
		// 工作界面载入正确
		expectedString = "Famon Workspace";
		Assert.assertEquals(expectedString, sel.getTitle());
	}

	@Test
	public void testLoginFailed() {
		// 输入用户名
		inputString = "bad-username";
		locator = "//input[@hmsid='txtUsername']";
		sel.type(locator, inputString);
		// 输入密码
		inputString = "bad-password";
		locator = "//input[@hmsid='txtPassword']";
		sel.type(locator, inputString);
		// 点击登录按钮
		locator = "//input[@hmsid='btnLogin']";
		sel.click(locator);
		// 仍然在登录界面
		expectedString = "Welcome to Famon";
		Assert.assertEquals(expectedString, sel.getTitle());
		// 显示了错误信息
		expectedString = "Login failed!";
		locator = "//span[@hmsid='lblError']";
		Assert.assertEquals(expectedString, sel.getText(locator));
	}

	@After
	public void tearDown() {
		sel.stop();
	}
}
