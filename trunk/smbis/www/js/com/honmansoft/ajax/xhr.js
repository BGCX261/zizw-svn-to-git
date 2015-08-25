
var xhr = {
	call : function(url, data, successHandler, that, failureHandler) {
		var request = null;
		if ( window.XMLHttpRequest ) {
			request = new XMLHttpRequest();
		} else {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
		request.onreadystatechange = function() {
			if ( XHR_LOADED != request.readyState ) {
				return;
			}
			if ( request.status != 200 ) {
				failureHandler 
					&& failureHandler.call(that);
			} else {
				that
					&& successHandler.call(that, request.responseText)
					|| successHandler(request.responseText);
			}
		};
		request.open("POST", url, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
		request.send(data);
	}
};

var XHR_LOADED = 4;
