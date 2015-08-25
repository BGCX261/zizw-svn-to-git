package com.honmansoft.rpc;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;

public class RPC implements BeanFactoryAware {

	private JSONParser jsonParser = new JSONParser();
	private JSONBuilder jsonBuilder = new JSONBuilder();
	private BeanBuilder beanBuilder = new BeanBuilder();
	private Object meta = new Meta();
	private BeanFactory context;

	public String process(String request) {
		Map obj = (Map) jsonParser.parse(request);
		//
		String serviceName = (String) obj.get("serviceName");
		Object bean = getService(serviceName);
		//
		String methodName = (String) obj.get("methodName");
		Method method = null;
		Method[] methods = bean.getClass().getMethods();
		for (Method m : methods) {
			if (m.getName().equals(methodName)) {
				method = m;
				break;
			}
		}
		//
		List arguments = (List) obj.get("arguments");
		Object[] args = new Object[arguments.size()];
		Class[] classes = method.getParameterTypes();
		for (int index = 0; index < classes.length; index++) {
			Class cls = classes[index];
			if (String.class == cls) {
				args[index] = beanBuilder.buildString(arguments.get(index));
			} else {
				throw null;
			}
		}
		//
		Object result = null;
		try {
			result = method.invoke(bean, args);
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Map response = new HashMap();
		response.put("result", result);
		return jsonBuilder.buildObject(response);
	}

	public Object getService(String serviceName) {
		if (serviceName.equals("meta"))
			return getMetaService();
		return context.getBean(serviceName);
	}

	public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
		this.context = beanFactory;
	}

	private Object getMetaService() {
		return meta;
	}
}
