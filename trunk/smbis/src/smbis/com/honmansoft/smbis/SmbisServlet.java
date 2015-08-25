package com.honmansoft.smbis;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

public class SmbisServlet extends HttpServlet {

	private static final long serialVersionUID = -3384200968001134182L;

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		//
		String data = readData(req.getReader());
		
		JSONArray ja = JSONArray.fromString(data);
		System.out.println(ja.length());
		
		resp.getWriter().write("hello");
	}

	private String readData(BufferedReader reader) throws IOException {
		final int bufSize = 1024;
		StringBuffer sb = new StringBuffer(bufSize);
		char[] buf = new char[bufSize];
		int count = 0;
		for (;;) {
			count = reader.read(buf, 0, bufSize);
			if (-1 == count) {
				break;
			}
			sb.append(buf, 0, count);
		}
		return sb.toString();
	}

	private static final String MODEL = "MODEL";
}
