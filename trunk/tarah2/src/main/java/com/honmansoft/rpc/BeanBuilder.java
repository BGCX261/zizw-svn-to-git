package com.honmansoft.rpc;

import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

public class BeanBuilder {

	public boolean buildBoolean(Object object) {
		if (object instanceof Boolean) {
			return ((Boolean) object).booleanValue();
		} else {
			throw null;
		}
	}

	public byte buildByte(Object object) {
		if (object instanceof Byte) {
			return ((Byte) object).byteValue();
		} else {
			throw null;
		}
	}

	public short buildShort(Object object) {
		if (object instanceof Short) {
			return ((Short) object).shortValue();
		} else {
			throw null;
		}
	}

	public int buildInt(Object object) {
		if (object instanceof Integer) {
			return ((Integer) object).intValue();
		} else {
			throw null;
		}
	}

	public long buildLong(Object object) {
		if (object instanceof Long) {
			return ((Long) object).longValue();
		} else {
			throw null;
		}
	}

	public float buildFloat(Object object) {
		if (object instanceof Float) {
			return ((Float) object).floatValue();
		} else {
			throw null;
		}
	}

	public double buildDouble(Object object) {
		if (object instanceof Double) {
			return ((Double) object).doubleValue();
		} else {
			throw null;
		}
	}

	public char buildChar(Object object) {
		if (object instanceof Character) {
			return ((Character) object).charValue();
		} else {
			throw null;
		}
	}

	public String buildString(Object object) {
		if (object instanceof String) {
			return (String) object;
		} else {
			throw null;
		}
	}

	public Object buildEnum(Object object, Class enumClass) {
		if (object instanceof String && enumClass.isEnum()) {
			try {
				Method method = enumClass.getMethod("valueOf", String.class);
				return method.invoke(null, object);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
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
					if (null == field)
						continue;
					if (boolean.class == fieldType) {
						Object value = buildBoolean(field);
						method.invoke(bean, new Object[] { value });
					} else if (byte.class == fieldType) {
						Object value = buildByte(field);
						method.invoke(bean, new Object[] { value });
					} else if (short.class == fieldType) {
						Object value = buildShort(field);
						method.invoke(bean, new Object[] { value });
					} else if (int.class == fieldType) {
						Object value = buildInt(field);
						method.invoke(bean, new Object[] { value });
					} else if (long.class == fieldType) {
						Object value = buildLong(field);
						method.invoke(bean, new Object[] { value });
					} else if (float.class == fieldType) {
						Object value = buildFloat(field);
						method.invoke(bean, new Object[] { value });
					} else if (double.class == fieldType) {
						Object value = buildDouble(field);
						method.invoke(bean, new Object[] { value });
					} else if (char.class == fieldType) {
						Object value = buildChar(field);
						method.invoke(bean, new Object[] { value });
					} else if (String.class == fieldType) {
						Object value = buildString(field);
						method.invoke(bean, new Object[] { value });
					} else if (fieldType.isEnum()) {
						Object value = buildEnum(field, fieldType);
						method.invoke(bean, new Object[] { value });
					} else if (field instanceof List) {
						Object value = buildArray((List) field, fieldType
								.getComponentType());
						method.invoke(bean, new Object[] { value });
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

	public Object buildArray(List list, Class elemType) {
		Object array = Array.newInstance(elemType, list.size());
		for (int i = 0; i < list.size(); i++) {
			if (boolean.class == elemType) {
				Array.setBoolean(array, i, buildBoolean(list.get(i)));
			} else if (byte.class == elemType) {
				Array.setByte(array, i, buildByte(list.get(i)));
			} else if (short.class == elemType) {
				Array.setShort(array, i, buildShort(list.get(i)));
			} else if (int.class == elemType) {
				Array.setInt(array, i, buildInt(list.get(i)));
			} else if (long.class == elemType) {
				Array.setLong(array, i, buildLong(list.get(i)));
			} else if (float.class == elemType) {
				Array.setFloat(array, i, buildFloat(list.get(i)));
			} else if (double.class == elemType) {
				Array.setDouble(array, i, buildDouble(list.get(i)));
			} else if (char.class == elemType) {
				Array.setChar(array, i, buildChar(list.get(i)));
			} else if (String.class == elemType) {
				Array.set(array, i, buildString(list.get(i)));
			} else if (elemType.isEnum()) {
				Array.set(array, i, buildEnum(list.get(i), elemType));
			} else if (list.get(i) instanceof Map) {
				Array.set(array, i, buildObject((Map) list.get(i), elemType));
			} else {
				throw null;
			}
		}
		return array;
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
