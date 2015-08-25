package com.honmansoft.rpc;

import java.lang.reflect.Method;
import java.util.Map;

public class BeanBuilder {

	public String buildString(Object object) {
		if (object instanceof String) {
			return (String) object;
		} else {
			throw null;
		}
	}

	public Object buildObject(Map object, Class beanClass) {
		try {
			if (object instanceof Map) {
				Object bean = beanClass.newInstance();
				Method[] methods = beanClass.getMethods();
				for (Method method : methods) {
					Class fieldType = getFieldType(method);
					if (null == fieldType)
						continue;
					String fieldName = getFieldName(method);
					Object field = object.get(fieldName);
					if (String.class == fieldType) {
						String stringField = buildString(field);
						method.invoke(bean, new Object[] { stringField });
					} else {
						throw null;
					}
				}
				return bean;
			} else {
				throw null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw null;
		}
	}

	private String getFieldName(Method method) {
		String name = method.getName();
		name = Character.toLowerCase(name.charAt(3)) + name.substring(4);
		return name;
	}

	private Class getFieldType(Method method) {
		if (!method.getName().startsWith("set")) {
			return null;
		} else if (method.getParameterTypes().length != 1) {
			return null;
		} else {
			return method.getParameterTypes()[0];
		}
	}
}
