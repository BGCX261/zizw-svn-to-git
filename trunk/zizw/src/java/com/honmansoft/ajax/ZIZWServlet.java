package com.honmansoft.ajax;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Method;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class ZIZWServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private BeanRepository beanRepo = new BeanRepository();

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String url = req.getRequestURL().toString();
		String beanId = url.substring(url.lastIndexOf('/') + 1, url
				.lastIndexOf('.'));
		Object bean = beanRepo.getBean(beanId);
		Method[] methods = bean.getClass().getDeclaredMethods();
		StringBuffer sb = new StringBuffer();
		sb.append("var " + beanId + " = {\n");
		for (int i = 0; i < methods.length; i++) {
			String methodName = methods[i].getName();
			sb.append("\t" + methodName + ": function (");
			Class[] classes = methods[i].getParameterTypes();
			String paramList = "";
			for (int j = 0; j < classes.length; j++) {
				String paramName = "arg" + j;
				paramList += paramName;
				if (j != classes.length - 1)
					paramList += ", ";
			}
			sb.append(paramList);
			if ( classes.length > 0 )				
				sb.append(", ");				
			sb.append("callback, ");
			sb.append("that, ");
			sb.append("callbackOnFailure");
			sb.append(") {\n");
			sb.append("\t\t");
			sb.append("return rmi.makeRequest(new rmi.Request(\"");
			sb.append(beanId);
			sb.append("\", \"");
			sb.append(methodName);
			sb.append("\", [");
			sb.append(paramList);
			sb.append("]), callback, that, callbackOnFailure);");
			sb.append("\n");
			sb.append("\t}");
			if (i == methods.length - 1)
				sb.append("\n");
			else
				sb.append(",\n");
		}
		sb.append("}\n");
		System.out.println(sb);
		flushResponse(sb.toString(), resp);
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		//
		String data = readData(req.getReader());
		try {
			processData(data, resp);
		} catch (ApplicationException ex) {
			flushResponse(RMIResponseType.APPLICATION_EXCEPTION, ex, resp);
			return;
		} catch (Exception ex) {
			flushResponse(RMIResponseType.UNKNOWN_EXCEPTION, ex, resp);
			return;
		}
	}

	private void processData(String data, HttpServletResponse resp)
			throws ApplicationException, Exception {
		//
		RMIRequest rmiRequest = null;
		Object bean = null;
		Method method = null;
		Object[] arguments = null;
		//
		try {
			rmiRequest = parseData(data);
			bean = getBean(rmiRequest);
			method = getMethod(bean, rmiRequest);
			arguments = getArguments(bean, method, rmiRequest);
		} catch (RemoteException ex) {
			flushResponse(RMIResponseType.REMOTE_EXCEPTION, ex, resp);
			return;
		}
		//
		Object returnValue = method.invoke(bean, arguments);
		flushResponse(RMIResponseType.RETURN_VALUE, returnValue, resp);
	}

	private void flushResponse(int type, Object value, HttpServletResponse resp)
			throws IOException {
		String jsonString = JSONObject.fromBean(new RMIResponse(type, value))
				.toString();
		flushResponse(jsonString, resp);
	}

	private void flushResponse(String value, HttpServletResponse resp)
			throws IOException {
		Writer writer = resp.getWriter();
		writer.write(value);
		writer.flush();
	}

	// flushResponse(RMIResponseType.APPLICATION_EXCEPTION, ex, resp);
	// flushResponse(RMIResponseType.RETURN_VALUE, returnValue, resp);

	private Object[] getArguments(Object bean, Method method,
			RMIRequest rmiRequest) throws RemoteException {
		Class[] paramTypes = method.getParameterTypes();
		Object[] arguments = new Object[paramTypes.length];
		if (rmiRequest.arguments.length() != paramTypes.length)
			throw new RemoteException(
					RemoteException.ERROR_ARGUMENTS_NOT_MATCH,
					"number of argument expected " + paramTypes.length
							+ " but " + rmiRequest.arguments.length());
		for (int i = 0; i < paramTypes.length; i++) {
			arguments[i] = rmiRequest.arguments.get(i);
			// Class formalType = paramTypes[i];
			// Class realType = arguments[i].getClass();
			// boolean match = formalType.isAssignableFrom(realType);
			// if (match)
			// continue;
			// throw new RemoteException(
			// RemoteException.ERROR_ARGUMENTS_NOT_MATCH,
			// "type of argument expected " + paramTypes[i].getName()
			// + " but " + arguments[i].getClass().getName());
		}
		return arguments;
	}

	private Method getMethod(Object bean, RMIRequest rmiRequest)
			throws RemoteException {
		Class cls = bean.getClass();
		Method[] methods = cls.getMethods();
		Method method = null;
		String errorMessage = "no such method defined " + rmiRequest.methodName;
		for (int i = 0; i < methods.length; i++) {
			if (!rmiRequest.methodName.equals(methods[i].getName()))
				continue;
			if (null == method) {
				method = methods[i];
			} else {
				errorMessage = "overload method is not supported "
						+ rmiRequest.methodName;
				method = null;
				break;
			}
		}
		if (null == method)
			throw new RemoteException(RemoteException.ERROR_METHOD_NOT_FOUND,
					errorMessage);
		return method;
	}

	private Object getBean(RMIRequest rmiRequest) throws RemoteException {
		Object bean = beanRepo.getBean(rmiRequest.beanId);
		if (null == bean)
			throw new RemoteException(RemoteException.ERROR_BEAN_NOT_FOUND,
					"no such bean found " + rmiRequest.beanId);
		return bean;
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

	private RMIRequest parseData(String data) throws RemoteException {
		try {
			return new RMIRequest(data);
		} catch (JSONException ex) {
			throw new RemoteException(RemoteException.ERROR_INVALID_FORMAT,
					"in valid format " + data);
		}
	}
}
