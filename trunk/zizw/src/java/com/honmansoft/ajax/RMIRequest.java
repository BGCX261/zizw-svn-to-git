package com.honmansoft.ajax;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class RMIRequest {
	String beanId;

	String methodName;

	JSONArray arguments;

	public RMIRequest(String data) throws JSONException {
		JSONObject jo = JSONObject.fromString(data);
		beanId = jo.getString("beanId");
		methodName = jo.getString("methodName");
		arguments = jo.getJSONArray("arguments");
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("\nbeanId: " + beanId);
		sb.append("\nmethodName: " + methodName);
		sb.append("\narguments' length: " + arguments.length());
		for (int i = 0; i < arguments.length(); i++) {
			Object arg = arguments.get(i);
			sb.append("\n\t[" + i + "]" + arg.getClass().getName() + "/" + arg);
		}
		return sb.toString();
	}
}
