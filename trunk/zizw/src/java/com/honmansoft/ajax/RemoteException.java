package com.honmansoft.ajax;

public class RemoteException extends Exception {
	public static final int ERROR_INVALID_FORMAT = 1;
	public static final int ERROR_BEAN_NOT_FOUND = 2;
	public static final int ERROR_METHOD_NOT_FOUND = 3;
	public static final int ERROR_ARGUMENTS_NOT_MATCH = 4;
	private int errorCode;
	private String message;

	public RemoteException(int errorCode, String message) {
		this.errorCode = errorCode;
		this.message = message;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public String getMessage() {
		String[] messagePrefix = new String[] { "", "invalid format",
				"bean not found", "method not found", "arguments not match" };
		return messagePrefix[errorCode] + " : " + this.message;
	}
}
