package org.mozilla.javascript;

import java.lang.reflect.Method;

public class Translator {

	static Class receiver;

	static Method receive;

	static {
		try {
			receiver = Class.forName("com.honmansoft.jsob.Receiver");
			receive = receiver.getDeclaredMethod("receive", new Class[] {
					int.class, String.class, char.class, String.class });
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	public static void translate(int token, String string, char quoteChar,
			String numString) {
		try {
			receive.invoke(null, new Object[] { new Integer(token), string,
					new Character(quoteChar), numString });
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

}
