package org.whg.util;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;

public class Dial {

	public static void main(String[] args) throws Exception {
		String[] urls = new String[] {
				"http://192.168.2.1/login.htm?page=login&pws=021021",
				"http://192.168.2.1/status_main.htm?page=status_main&button=pppoeconnect" };
		for (String url : urls)
			makeRequest(url);
	}

	private static void makeRequest(String urlString) throws Exception {
		makeRequest(urlString, false);
	}

	private static void makeRequest(String urlString, boolean printResponse)
			throws Exception {
		URL url = new URL(urlString);
		URLConnection conn = url.openConnection();
		int bufSize = 1024;
		char[] buf = new char[bufSize];
		StringBuffer sb = new StringBuffer();
		InputStream is = conn.getInputStream();
		Reader reader = new InputStreamReader(is);
		for (int count = 0; -1 != count; count = reader.read(buf, 0, bufSize)) {
			sb.append(buf, 0, count);
		}
		if (printResponse) {
			System.out.println(sb);
		}

	}

}
