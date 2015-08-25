
var rmi = {
};

rmi.getBean = function(id, callback, that, callbackOnFailure) /* throws rmi.RemoteException, rmi.ApplicationException, rmi.UnknownException */ {
	return jsloader.resolve("com.honmansoft.ajax.__RemoteBean." + id);
	//return rmi.makeRequest(new rmi.Request(0, "getBean", [id]), callback, that, callbackOnFailure);
};

rmi.makeRequest = function(request, callback, that, callbackOnFailure) {
	var data = lang.toJSONString(request);
	var url = "ZIZWServlet";
	if ( window.XMLHttpRequest ) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if ( callback ) {
		xhr.onreadystatechange = function() {
			var returnValue = null;
			try {
				returnValue = rmi.handleResponse(xhr, url);
			} catch(ex) {
				if ( callbackOnFailure ) {
					if ( that )
						callbackOnFailure.call(that, ex);
					else
						callbackOnFailure(ex);
				} else {
					;//TODO
				}
			}
			if ( that )
				callback.call(that, returnValue);
			else
				callback(returnValue);
		}
	}
	xhr.open("POST", url, callback ? true : false);
	try {
		xhr.send(data);
	} catch (ex) {
		throw new rmi.RemoteException(ex.message + "[url=" + url + "]");
	}
	if ( callback )
		return;
	return rmi.handleResponse(xhr, url);
};

rmi.handleResponse = function(xhr, url) {
	if ( 200 != xhr.status ) {
		throw new rmi.RemoteException("Can not load resource[url=" + url + "][status=" + xhr.status + "]");
	}
	var response = new rmi.Response(xhr.responseText);
	if ( response.isReturnValue )
		return response.value;
	throw response;
};

rmi.viewResponse = function (resp) {
	new rmi.ResponseViewer(resp);
};

//
//--inner classes
//

rmi.Request = function (beanId, methodName, arguments) {
	this.beanId = beanId;
	this.methodName = methodName;
	this.arguments = arguments;
};

rmi.Response = function (response) {
	return lang.parseJSON(response);		
};
rmi.Response.STATUS_OKAY = 1;

rmi.RemoteException = function (msg) {
	this.message = msg;
};

rmi.ApplicationException = function (msg) {
	this.message = msg;
};

rmi.RemoteExceptionHandler = function (ex) {
	alert("RemoteException: " + ex.message);
};

rmi.ApplicationExceptionHandler = function (ex) {
	alert("ApplicationException: " + ex.message);
};

rmi.UnknownExceptionHandler = function (ex) {
	alert("Unknown exception: " + ex.message);
};

rmi.ResponseViewer = function (resp) {
	var element = document.createElement("div");
	this.element = element;
	document.body.appendChild(this.element);
	this.element.style.width = "800px";
	this.element.style.height = "300px";
	this.element.style.position = "absolute";
	this.element.style.borderStyle = "solid";
	this.element.style.borderColor = "red";
	this.element.style.borderWidth = "1px";
	this.element.style.overflow = "auto";
	//
	this.closeButton = document.createElement("input");
	this.closeButton.type = "button";
	this.closeButton.value = "close";
	this.element.appendChild(this.closeButton);
	this.closeButton.onclick = function () {
		element.parentNode.removeChild(element)
	};
	//
	this.br = document.createElement("br");
	this.element.appendChild(this.br);
	//
	this.pre = document.createElement("pre");
	this.element.appendChild(this.pre);
	//
	var buffer = "";
	function print(obj, deep, prefix) {
		if ( null == obj ) {
			buffer += null;
			return;
		} else {
			;
		}
		prefix.push("|");
		var prop = null;
		for ( var _prop in obj ) {
			if ( "string" == typeof prop ) {
				printLine(deep, prefix, obj);
			}
			prop = _prop;
		}
		printLine(deep, prefix, obj, true);
		function printLine(deep, prefix, obj, isLast) {		
			buffer += "\n";
			for ( var i = 0; i <= deep; i++ ) {
				buffer += i == deep && isLast ? "\\" : prefix[i];
				buffer += i == deep ? "-" : " ";
			}
			buffer += prop;
			buffer += "[" + typeof obj[prop] + "]";
			if ( null == obj[prop] ) {
				buffer += "=null";
			} else if ( "string" == typeof obj[prop] || "number" == typeof obj[prop] || "boolean" == typeof obj[prop] ) {
				buffer += "=" + obj[prop];
			} else if ( "object" == typeof obj[prop] ) {
				if ( isLast )
					prefix[deep] = " ";
				var newPrefix = [];
				for ( var i = 0; i < prefix.length; i++ ) {
					newPrefix.push(prefix[i]);
				}
				print(obj[prop], deep+1, newPrefix);
			} else {
				;
			}
		}
	}
	print(resp, 0, []);
	if ( domutils.isIE() ) {
		this.pre.innerText = buffer;
	} else {
		this.pre.innerHTML = buffer;
	}
};
