
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
			if ( xhr.status != 200 ) {
				alert("url = " + url + "; status = " + xhr.status);
				throw new Error();
			}
			this.loadedResources[url] = xhr.responseText;
		}
		return this.loadedResources[url];
	};
		
	this.makeRequest = function(service, request, callback, that) {
		var xhr = window.XMLHttpRequest ?
			new XMLHttpRequest() :
			new ActiveXObject("Microsoft.XMLHTTP");
		xhr.onreadystatechange = function() {
			if ( xhr.readyState != 4 ) {
				return;
			}
			if ( xhr.status == 200 ) {
				try {
					var response = Lang.parseJSON(xhr.responseText);	
				} catch(ex) {
					alert("Bad Syntax: " + xhr.responseText);
					return;
				}
				if ( that ) {
					callback.call(that, response);
				} else {
					callback(response);
				}
			} else {
				alert("status = " + xhr.status);
			}
		};
		xhr.open("POST", "rpc/"+service, true);
		if ( typeof request == "undefined" ) {
			xhr.send("");
		} else {
			xhr.send(Lang.toJSONString(request));
		}
	};
		
	this.resolve = function(fullName) {
		if ( !this.loadedClasses[fullName] ) {
			var url = "js/" + fullName.replace(/\./g, "/") + ".js";
			var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
			eval(this.doGet(url));
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
