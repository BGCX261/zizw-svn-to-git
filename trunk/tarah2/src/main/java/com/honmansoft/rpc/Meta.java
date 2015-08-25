package com.honmansoft.rpc;

import java.lang.reflect.Method;

public class Meta {
	public String getServiceStub(String serviceName) {
		try {
			StringBuffer sb = new StringBuffer();
			Class cls = Class.forName(serviceName);
			sb.append("var " + cls.getSimpleName() + "={");
			Method[] methods = cls.getMethods();
			for (int i = 0; i < methods.length; i++) {
				sb.append(methods[i].getName() + ":function(");
				Class[] params = methods[i].getParameterTypes();
				String plist = "";
				for (int j = 0; j < params.length; j++) {
					plist += "_" + j;
					if (params.length - 1 != j) {
						plist += ",";
					}
				}
				sb.append(plist);
				sb.append("){");
				sb.append("var req={");
				sb.append("serviceName:\\\"" + cls.getName()
						+ "\\\",");
				sb.append("methodName:\\\"" + methods[i].getName()
						+ "\\\",");
				sb.append("arguments:[" + plist + "]");
				sb.append("};");
				sb
						.append("var resp=jsloader.doPost(\\\"TarahServlet\\\",lang.toJSONString(req));");
				sb.append("return lang.parseJSON(resp).result;");
				sb.append("}");
				if (methods.length - 1 != i) {
					sb.append(",");
				}
				sb.append("");
			}
			sb.append("};");
			return sb.toString();
		} catch (ClassNotFoundException e) {
			throw null;
		}
	}
}
