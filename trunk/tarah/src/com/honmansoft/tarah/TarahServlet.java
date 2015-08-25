package com.honmansoft.tarah;

import java.io.IOException;
import java.io.Reader;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.honmansoft.rpc.RPC;

public class TarahServlet extends HttpServlet {

	private WebApplicationContext context;
	private RPC rpc;

	@Override
	public void init(ServletConfig config) throws ServletException {
		ServletContext servletContext = config.getServletContext();
		context = WebApplicationContextUtils
				.getWebApplicationContext(servletContext);
		rpc = (RPC) context.getBean("rpc");
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String request = read(req.getReader());
		String response = rpc.process(request);
		resp.getWriter().write(response);
		resp.flushBuffer();
	}

	private String read(Reader reader) throws IOException {
		StringBuffer sb = new StringBuffer();
		int bufsize = 1024, count = 0;
		char[] buf = new char[bufsize];
		while (true) {
			count = reader.read(buf, 0, bufsize);
			if (-1 == count)
				break;
			sb.append(buf, 0, count);
		}
		return sb.toString();
	}

}
