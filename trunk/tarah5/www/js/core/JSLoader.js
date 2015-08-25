
var JSLoader = function(baseURL) {
	
	// ---------------------------------------- //
	// Members
	// ---------------------------------------- //
	
	this.cache = {};
	
	this.baseURL = baseURL ? baseURL : "";
	
	// ---------------------------------------- //
	// Public Methods
	// ---------------------------------------- //
	
	this.register = function(fullName, object) {
		this.cache[fullName] = object;
	};
	
	this.remove = function(fullName) {
		delete this.cache[fullName];
	};
	
	this.load = function(url) {
		var xhr = this.createXhr();
		xhr.open("GET", this.baseURL+url, false);
		// for firefox only
		if ( xhr.overrideMimeType ) {
			xhr.overrideMimeType("text/html;charset=gbk");
		}
		try {
			xhr.send("");
		} catch(ex) {
			throw new Error("Resource not found: " + this.baseURL + url);
		}
		return xhr.responseText;
	};
	
	this.resolve = function(fullName) {
		if ( this.cache[fullName] ) {
			return this.cache[fullName];
		}
		var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
		var jsSource = null;
		var url = "js/" + fullName.replace(/\./g, "/") + ".js";
		jsSource= this.load(url);
		eval(jsSource);
		return eval(simpleName);
	};	
	
	// ---------------------------------------- //
	// Private Methods
	// ---------------------------------------- //
	
	this.createXhr = function() {
		var xhr = null;
		if ( window.XMLHttpRequest ) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhr;
	};
	
	this.isValidFullName = function(fullName) {
		if ( !fullName )
			return false;
		fullName = this.strip(fullName);
		if ( "" == fullName )
			return false;
		return /^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*$/.test(fullName);
	};
		
	this.isValidUrl = function(url) {
		if ( !url )
			return false;
		url = this.strip(url);
		if ( "" == url )
			return false;
		return /^[a-zA-Z_][a-zA-Z0-9_]*(\/[a-zA-Z_][a-zA-Z0-9_]*)*(\.[a-zA-Z]+)?$/.test(url);
	};
	
	this.strip = function(str) {
    	return str.replace(/^\s+/, '').replace(/\s+$/, '');
	};
	
	var Lang = this.resolve("core.Lang");	
	var Module = this.resolve("core.Module");	
	var _Prototype = this.resolve("core._Prototype");	
	var Domutils = this.resolve("core.Domutils");
	var EventHelper = this.resolve("core.EventHelper");
	var CustomEvent = this.resolve("core.CustomEvent");
};
