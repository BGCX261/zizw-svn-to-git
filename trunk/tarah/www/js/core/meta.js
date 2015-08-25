
var meta = {
	getService: function(serviceName) {				
		var req = {
			serviceName: "meta",
			methodName: "getServiceStub",
			arguments: [serviceName]};
		var resp = jsloader.doPost("TarahServlet", lang.toJSONString(req));
		return lang.parseJSON(resp).result;
	}
};
