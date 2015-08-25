package com.honmansoft.ajax;

public class UINode {
	private String viewType;
	private String beanId;
	private String id;

	public UINode(String viewType, String beanId, String id) {
		this.viewType = viewType;
		this.beanId = beanId;
		this.id = id;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getViewType() {
		return viewType;
	}

	public void setViewType(String viewType) {
		this.viewType = viewType;
	}

	public String getBeanId() {
		return beanId;
	}

	public void setBeanId(String beanId) {
		this.beanId = beanId;
	}

}
