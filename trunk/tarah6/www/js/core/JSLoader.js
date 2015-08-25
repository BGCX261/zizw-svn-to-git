
var JSLoader = function(baseURL) {
	
	this.cache = {};
	this.resourceCache = {};	
	this.baseURL = baseURL ? baseURL : "";
	
	this.register = function(fullName, object) {
		this.cache[fullName] = object;
	};
	
	this.remove = function(fullName) {
		delete this.cache[fullName];
	};
	
	this.load = function(url) {
		if ( !this.resourceCache[url] ) {
			var xhr = this.createXhr();
			xhr.open("GET", this.baseURL+url, false);
			try {
				xhr.send("");
			} catch(ex) {
				throw new Error("Resource not found: " + this.baseURL + url);
			}
			this.resourceCache[url] = xhr.responseText;
		}
		return this.resourceCache[url];
	};
	
	this.resolve = function(fullName) {
		if ( !this.cache[fullName] ) {
			var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
			var jsSource = null;
			var url = "js/" + fullName.replace(/\./g, "/") + ".js";
			jsSource= this.load(url);
			eval(jsSource);
			this.register(fullName, eval(simpleName));
		}
		return this.cache[fullName];
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
	
	var Lang = this.resolve("core.Lang");	
	var Module = this.resolve("core.Module");	
	var _Prototype = this.resolve("core._Prototype");	
	var Domutils = this.resolve("core.Domutils");
	var EventHelper = this.resolve("core.EventHelper");
	var CustomEvent = this.resolve("core.CustomEvent");
};
