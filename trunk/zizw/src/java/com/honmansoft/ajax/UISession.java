package com.honmansoft.ajax;

public class UISession implements RemoteBean {
	
	public UINode getRoot() {
		return new UINode("com.honmansoft.ui.CenteredLayoutManager", "", "root");
	}

}
