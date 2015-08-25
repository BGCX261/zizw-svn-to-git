package com.hms.rpc;

import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;

public class RPCServlet extends HttpServlet {

	private Gson gson = new Gson();
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.getWriter().write("abc");
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String uri = req.getRequestURI();
		String className = uri.substring(uri.lastIndexOf('/')+1);
		//
		int SIZE = 1024, count = 0;
		StringBuffer sb = new StringBuffer(SIZE);
		char[] buffer = new char[SIZE];
		Reader reader = req.getReader();
		for(;;) {
			count = reader.read(buffer, 0, SIZE);
			if ( count == -1) {
				break;
			}
			sb.append(buffer, 0, count);
		}
		String requestText = sb.toString();
		//
		Class klass = null;
		try {
			klass = Class.forName(className);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		}
		//
		Object service = null;
		try {
			service = klass.newInstance();
		} catch (InstantiationException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		}
		Method method = null;
		Method[] methods = klass.getMethods();
		for ( Method m : methods ) {
			if ( m.getName().equals("execute") ) {
				method = m;
				break;
			}
		}
		if ( method == null ) {
			throw new RuntimeException();
		}
		//
		Object response = null;
		try {
			if ( method.getGenericParameterTypes().length == 0 ) {
				response = method.invoke(service);	
			} else {
				Type paramType = method.getGenericParameterTypes()[0];
				response = method.invoke(service, gson.fromJson(requestText, paramType));
			}
		} catch (IllegalArgumentException e) {
			throw new RuntimeException(e);
		} catch (JsonParseException e) {
			throw new RuntimeException(e);
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
		
		//
		String responseText = gson.toJson(response);
		resp.getWriter().write(responseText);
	}

}
