package com.honmansoft.ajax;

import java.util.HashMap;
import java.util.Map;

public class BeanRepository implements RemoteBean {
	private Map beanRepo = new HashMap(100);

	public BeanRepository() {
		beanRepo.put("uisession", new UISession());
	}

	public Object getBean(String beanId) {
		return beanRepo.get(beanId);
	}
}
