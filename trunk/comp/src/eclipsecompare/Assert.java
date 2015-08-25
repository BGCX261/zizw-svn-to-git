package eclipsecompare;
/*
 * Created on 2005-6-24
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */

/**
 * @author Administrator
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class Assert {
	public static void isTrue(boolean value) {
		if (!value) {
			throw new RuntimeException("ASSERTION FAILED!!");
		}
	}
}
