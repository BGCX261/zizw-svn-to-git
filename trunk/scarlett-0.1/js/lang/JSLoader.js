
var JSLoader = function() {
	
	this.loadedClasses = {};
	this.loadedResources = {};
	
	this.doGet = function(url) {
		if ( !this.loadedResources[url] ) {
			var xhr = window.XMLHttpRequest ?
				new XMLHttpRequest() :
				new ActiveXObject("Microsoft.XMLHTTP");
			xhr.open("GET", url, false);
			xhr.send("");
			this.loadedResources[url] = xhr.responseText;
		}
		return this.loadedResources[url];
	};

	this.doPost = function(url, data) {
		var xhr = window.XMLHttpRequest ?
			new XMLHttpRequest() :
			new ActiveXObject("Microsoft.XMLHTTP");
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		xhr.send(data);
		return xhr.responseText;
	};
		
	this.doPostAsync = function(url, data, callback, that) {
		var xhr = window.XMLHttpRequest ?
			new XMLHttpRequest() :
			new ActiveXObject("Microsoft.XMLHTTP");
		xhr.onreadystatechange = function() {
			if ( xhr.readyState != 4 ) {
				return;
			}
			if ( xhr.status == 200 ) {
				callback.call(that, xhr.responseText);
			} else {
				throw new Error("xhr.status != 200");
			}
		};
		xhr.open("POST", url, false);
		xhr.send(data);
		return xhr.responseText;
	};

	this.doRmi = function(serviceName, methodName, args) {
		var message = {
			channel: "rmi",
			serviceName: serviceName,
			methodName: methodName,
			args: []
		};
		for ( var i = 0; i < args.length; i++ ) {
			if ( typeof args[i] == "function" ) {
				break;
			}
			message.args.push(args[i]);
		}
		response = this.doPost("/", Lang.toJSONString(message));
		response = Lang.parseJSON(response);
		return response.result;
	};
		
	this.resolve = function(fullName) {
		if ( !this.loadedClasses[fullName] ) {
			var url = "js/" + fullName.replace(".", "/") + ".js";
			var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
			eval(this.doGet(url));
			this.loadedClasses[fullName] = eval(simpleName);
		}
		return this.loadedClasses[fullName];
	};
	
	this.locateService = function(fullName) {
		if ( !this.loadedClasses[fullName] ) {
			var message = {
				channel: "locateservice",
				fullName: fullName
			};
			var source = this.doPost("/", Lang.toJSONString(message));
			var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
			eval(source);
			this.loadedClasses[fullName] = eval(simpleName);
		}
		return this.loadedClasses[fullName];
	};
	
	var jsloader = this;
	
	var Lang = jsloader.resolve("lang.Lang");
	var _Prototype = jsloader.resolve("lang._Prototype");
	var CustomEvent = jsloader.resolve("lang.CustomEvent");
	var Domutils = jsloader.resolve("lang.Domutils");
	var EventHelper = jsloader.resolve("lang.EventHelper");
	var Component = jsloader.resolve("lang.Component");
};	

var jsloader = new JSLoader();
