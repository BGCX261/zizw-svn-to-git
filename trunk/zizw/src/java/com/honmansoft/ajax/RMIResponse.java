package com.honmansoft.ajax;

public class RMIResponse {

	private int type;

	private Object value;

	public RMIResponse(int type, Object value) {
		this.type = type;
		this.value = value;
	}

	public int getType() {
		return type;
	}

	public Object getValue() {
		return value;
	}

	public boolean getIsReturnValue() {
		return this.type == RMIResponseType.RETURN_VALUE;
	}

	public boolean getIsRemoteException() {
		return this.type == RMIResponseType.REMOTE_EXCEPTION;
	}

	public boolean getIsApplicationException() {
		return this.type == RMIResponseType.APPLICATION_EXCEPTION;
	}

	public boolean getIsUnknownException() {
		return this.type == RMIResponseType.UNKNOWN_EXCEPTION;
	}
}
