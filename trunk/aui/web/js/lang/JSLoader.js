
var JSLoader = function() {
	
	this.loadedClasses = {};
	
	this.parseClassName = function(className) {
		var spaceName = "js";
		var fullName = className;
		var simpleName = className.substring(className.lastIndexOf('.')+1)
		//
		var url = spaceName;
		var nameParts = fullName.split(".");
		for ( var i = 0; i < nameParts.length; i++ ) {
			url += "/" + nameParts[i];
		}
		url += ".js";
		return {
			spaceName:spaceName,
			fullName:fullName,
			simpleName:simpleName,
			url:url
		};
	};
	
	this.createXhr = function() {
		if ( window.XMLHttpRequest ) {
			return new XMLHttpRequest();
		} else {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	};
	
	this.loadResource = function(url) {
		var xhr = this.createXhr();
		xhr.open("GET", url, false);
		xhr.send("");
		return xhr.responseText;
	};
	
	this.resolve = function(className) {
		if ( this.loadedClasses[className] ) {
			return this.loadedClasses[className];
		}
		var parsedClassName = this.parseClassName(className);
		var source = this.loadResource(parsedClassName.url);
		eval(source);
		return (this.loadedClasses[className]=eval(parsedClassName.simpleName));
	};
	
	var jsloader = this;
	
	var lang = jsloader.resolve("lang.lang");
	var _Prototype = jsloader.resolve("lang._Prototype");
	var Domutils = jsloader.resolve("lang.Domutils");
	var EventHelper = jsloader.resolve("lang.EventHelper");
	
	var imports = function(className) {
		var klass = jsloader.resolve(className);
		var proxy = function() {
			return new klass(
				arguments[0],
				arguments[1],
				arguments[2],
				arguments[3],
				arguments[4],
				arguments[5],
				arguments[6],
				arguments[7],
				arguments[8],
				arguments[9]
				);
		};
		proxy.getInstance = function() {
			if ( (typeof klass) == "object" ) {
				return klass;
			} else if ( klass.__instance ) {
				return klass.__instance;
			} else {
				klass.__instance = new klass();
				return klass.__instance;
			}
		};
		return proxy;
	};
};
