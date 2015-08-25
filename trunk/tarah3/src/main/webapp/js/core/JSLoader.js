
var JSLoader = function(baseURL) {
	this.cache = {};
	this.baseURL = baseURL?baseURL:"";
	this.load =  function(resourceURL) {
		return this.doGet(resourceURL);
	};
	this.register = function(fullName, object) {
		this.cache[fullName] = object;
	};
	this.remove = function(fullName) {
		delete this.cache[fullName];
	};
	this.resolve = function(fullName) {
		if ( this.cache[fullName] ) {
			return this.cache[fullName];
		}
		var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
		var isServiceName = this.isServiceName(fullName);
		var jsSource = null;
		if ( isServiceName ) {
			jsSource = meta.getService(fullName);
		} else {
			var url = "js/" + fullName.replace(/\./g, "/") + ".js";
			jsSource= this.load(url);
		}
		eval(jsSource);
		this.register(fullName, eval(simpleName));
		return eval(simpleName);
	};	
	this.doGet = function(url) {
		var xhr = this.createXhr();
		xhr.open("GET", this.baseURL+url, false);
		xhr.send("");
		return xhr.responseText;	
	};
	this.doPost = function(url, content) {
		var xhr = this.createXhr();
		xhr.open("POST", this.baseURL+url, false);
		xhr.send(content);
		return xhr.responseText;	
	};
	this.createXhr = function() {	
		var xhr = null;
		if ( window.XMLHttpRequest ) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhr;
	};
	this.isServiceName = function(fullName) {
		return fullName.indexOf(".facade.") != -1;
	};
	var lang = this.resolve("core.lang");
	var domutils = this.resolve("core.domutils");
	var EventHelper = this.resolve("core.EventHelper");
	var CustomEvent = this.resolve("core.CustomEvent");
};
