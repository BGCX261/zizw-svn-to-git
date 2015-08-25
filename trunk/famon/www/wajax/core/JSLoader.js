
JSLoader = function(baseURL) {
	this.load =  function(resourceURL) {
		var xhr = null;
		if ( window.XMLHttpRequest ) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open("GET", (baseURL?baseURL:"")+resourceURL, false);
		xhr.send("");
		return xhr.responseText;
	};
	this.resolve = function(fullName) {
		var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
		var url = fullName.replace(/\./g, "/") + ".js";
		var jsSource = this.load(url);
		eval(jsSource);		
		return eval(simpleName);
	};
	var EventHelper = this.resolve("wajax.core.EventHelper");
	var domutils = this.resolve("wajax.core.domutils");
};
