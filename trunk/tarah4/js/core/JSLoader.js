
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
		__assert(
			this.isValidFullName(fullName), 
			"JSLoader.register", "fullName is not valid", fullName);
		__assert(
			object, 
			"JSLoader.register", "object is not valid", object);
		__assert(
			"undefined" == typeof this.cache[fullName], 
			"JSLoader.register", "already exists", fullName);
		// <<
		this.cache[fullName] = object;
	};
	
	this.remove = function(fullName) {
		__assert(
			this.isValidFullName(fullName), 
			"JSLoader.remove", "fullName is not valid", fullName);
		// <<
		delete this.cache[fullName];
	};
	
	this.load = function(url) {
		__assert(
			this.isValidUrl(url), 
			"JSLoader.load", "url is not valid", url);
		// <<
		var xhr = this.createXhr();
		xhr.open("GET", this.baseURL+url, false);
		// for firefox only
		if ( xhr.overrideMimeType ) {
			xhr.overrideMimeType("text/html;charset=gbk");
		}
		xhr.send("");
		return xhr.responseText;
	};
	
	this.resolve = function(fullName) {
		__assert(
			this.isValidFullName(fullName), 
			"JSLoader.resolve", "fullName is not valid", fullName);
		// <<
		if ( this.cache[fullName] ) {
			return this.cache[fullName];
		}
		var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
		var jsSource = null;
		var url = "js/" + fullName.replace(/\./g, "/") + ".js";
		try {
			jsSource= this.load(url);
		} catch(ex) {
			__assert(
				this.isValidFullName(fullName), 
				"JSLoader.resolve", "can not load", fullName, ex);
		}
		try {
			eval(jsSource);
			this.register(fullName, eval(simpleName));
		} catch(ex) {
			__assert(
				this.isValidFullName(fullName), 
				"JSLoader.resolve", "can not eval", fullName, ex);
		}
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
	var Domutils = this.resolve("core.Domutils");
	var EventHelper = this.resolve("core.EventHelper");
	var CustomEvent = this.resolve("core.CustomEvent");
};

function __assert(expr, source, msg, hint, cause) {
	if ( !expr ) {
		var message = source + ": " + msg;
		if ( !hint ) {
			;
		} else {
			message += ": " + hint
		}
		if ( !cause ) {
			;
		} else if ( cause.message ) {
			message += ": Caused by: " + cause.message;
		} else {
			message += ": Caused by: " + cause;
		}
		throw new Error(message);
	}
}
