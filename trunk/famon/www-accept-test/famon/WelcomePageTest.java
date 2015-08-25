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
		// ������ʾ��ȷ
		expectedString = "Welcome to " + Constants.SYS_OUTER_NAME;
		Assert.assertEquals(expectedString, sel.getTitle());
		// �û���ǩ�ɼ�
		locator = "//span[@hmsid='lblUsername']";
		Assert.assertTrue(sel.isVisible(locator));
		// �û���ǩ��ʾ��ȷ
		expectedString = "Username:";
		Assert.assertEquals(expectedString, sel.getText(locator));
		// �û������ɼ�
		locator = "//input[@hmsid='txtUsername' and @type='text']";
		Assert.assertTrue(sel.isVisible(locator));
		// �����ǩ�ɼ�
		locator = "//span[@hmsid='lblPassword']";
		Assert.assertTrue(sel.isVisible(locator));
		// �����ǩ��ʾ��ȷ
		expectedString = "Password:";
		Assert.assertEquals(expectedString, sel.getText(locator));
		// ���������ɼ�
		locator = "//input[@hmsid='txtPassword' and @type='password']";
		Assert.assertTrue(sel.isVisible(locator));
		// ��¼��ť�ɼ�
		locator = "//input[@hmsid='btnLogin' and @type='button']";
		Assert.assertTrue(sel.isVisible(locator));
		// ��¼��ť��ǩ��ʾ��ȷ
		expectedString = "Login";
		locator = "//input[@hmsid='btnLogin' and @type='button']@value";
		Assert.assertEquals(expectedString, sel.getAttribute(locator));
	}

	@Test
	public void testLoginOkay() {
		// �����û���
		inputString = "good-username";
		locator = "//input[@hmsid='txtUsername']";
		sel.type(locator, inputString);
		// ��������
		inputString = "good-password";
		locator = "//input[@hmsid='txtPassword']";
		sel.type(locator, inputString);
		// �����¼��ť
		locator = "//input[@hmsid='btnLogin']";
		sel.click(locator);
		// �ȴ�ҳ�����룬5�볬ʱ
		sel.waitForPageToLoad("5000");
		// ��������������ȷ
		expectedString = "Famon Workspace";
		Assert.assertEquals(expectedString, sel.getTitle());
	}

	@Test
	public void testLoginFailed() {
		// �����û���
		inputString = "bad-username";
		locator = "//input[@hmsid='txtUsername']";
		sel.type(locator, inputString);
		// ��������
		inputString = "bad-password";
		locator = "//input[@hmsid='txtPassword']";
		sel.type(locator, inputString);
		// �����¼��ť
		locator = "//input[@hmsid='btnLogin']";
		sel.click(locator);
		// ��Ȼ�ڵ�¼����
		expectedString = "Welcome to Famon";
		Assert.assertEquals(expectedString, sel.getTitle());
		// ��ʾ�˴�����Ϣ
		expectedString = "Login failed!";
		locator = "//span[@hmsid='lblError']";
		Assert.assertEquals(expectedString, sel.getText(locator));
	}

	@After
	public void tearDown() {
		sel.stop();
	}
}
