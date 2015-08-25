
var JSLoader = function(_eca_baseURL) {
	var _eca_evalEnv = function(_eca_jsSource, _eca_simpleName, _eca_fullName) {
		eval(_eca_jsSource);
		_eca_target = eval(_eca_simpleName);
		if ( "object" == typeof _eca_target || "function" == typeof _eca_target )
			_eca_target.getMetaInfo = function() {
				return {
					simpleName: _eca_simpleName,
					fullName: _eca_fullName
				};
			};
		if ( "function" == typeof _eca_target )
			_eca_target.prototype.getClass = function() {
				return _eca_target;
			};
		return _eca_target;
	}
	var jsloader = function() {
		var cache = {};
		return {
			load: function(resourceURL) {
				var xhr = null;
				if ( window.XMLHttpRequest ) {
					xhr = new XMLHttpRequest();
				} else {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				try {
					xhr.open("GET", (_eca_baseURL?_eca_baseURL:"")+resourceURL, false);
					xhr.send("");
				} catch (ex) {
					throw {
						resourceURL: resourceURL, 
						message: "Resource not found: "+resourceURL,
						cause: ex};
				}
				return xhr.responseText;
			},
			resolve: function(fullName) {
				if ( cache[fullName] ) {
					return cache[fullName];
				}
				var simpleName = fullName.substring(fullName.lastIndexOf(".")+1);
				var url = fullName.replace(/\./g, "/") + ".js";
				var jsSource = this.load(url);
				try {
					cache[fullName] = _eca_evalEnv(jsSource, simpleName, fullName);
				} catch (ex) {
					throw {
						fullName: fullName, 
						message: "Illegal Object: "+fullName,
						cause: ex};
				}
				return cache[fullName];
			}
		};
	}();
	var lang = jsloader.resolve("wajax.core.lang");
	var domutils = jsloader.resolve("wajax.core.domutils");
	var EventHelper = jsloader.resolve("wajax.core.EventHelper");		
	var Module = jsloader.resolve("wajax.core.Module");
	return jsloader;
};
