package com.honmansoft.ajax;

public class RMIResponseType {
	public static final int RETURN_VALUE = 1; // okay

	public static final int REMOTE_EXCEPTION = 2; // api-level error

	public static final int APPLICATION_EXCEPTION = 3; // user-level error

	public static final int UNKNOWN_EXCEPTION = 4;
	// framework-level error
}
