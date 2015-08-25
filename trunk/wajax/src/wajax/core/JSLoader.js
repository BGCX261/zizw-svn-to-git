
var JSLoader = function(_eca_config) {
	if ( "undefined" == typeof _eca_config ) {
		_eca_config = {baseURL:JSLoader.serverlessTestEnvBaseURL};
	}
	var _eca_evalEnv = function(_eca_jsSource, _eca_simpleName) {
		var jsloader = {
			load: _eca_jsloader.load,
			resolve: _eca_jsloader.resolve
		};
		eval(_eca_jsSource);
		return eval(_eca_simpleName);
	}
	var WajaxError = {
		ResourceNotFound: function(url) {
			this.url = url;
			this.message = "Resource Not Found: " + url;
		},
		BadObject: function(fullName) {
			this.fullName = fullName;
			this.message = "Bad Object: " + fullName;
		}
	};
	var _eca_jsloader = function() {
		var cache = {};
		return {
			load: function(url) {
				var xhr = null;
				if ( window.XMLHttpRequest ) {
					xhr = new XMLHttpRequest();
				} else {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
				try {
					xhr.open("GET", _eca_config.baseURL+url, false);
					xhr.send("");
				} catch (ex) {
					throw new (WajaxError.ResourceNotFound)(url);
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
					cache[fullName] = _eca_evalEnv(jsSource, simpleName);
				} catch (ex) {
					throw new (WajaxError.BadObject)(fullName);
				}
				return cache[fullName];
			}
		};
	}();
	var lang = _eca_jsloader.resolve("wajax.core.lang");
	var domutils = _eca_jsloader.resolve("wajax.core.domutils");
	var EventHelper = _eca_jsloader.resolve("wajax.core.EventHelper");
	WajaxError.temp = _eca_jsloader.resolve("wajax.core.WajaxError");
	WajaxError.temp.ResourceNotFound = WajaxError.ResourceNotFound;
	WajaxError.temp.BadObject = WajaxError.BadObject;
	WajaxError = WajaxError.temp;	
	var lang = _eca_jsloader.resolve("wajax.core.lang");
	if ( _eca_config.defaultImports instanceof Array )
		for ( var _eca_i = 0; _eca_i < _eca_config.defaultImports.length; _eca_i++ ) {
			if ( "string" != typeof _eca_config.defaultImports[_eca_i] )
				continue;
			try {
				eval("var " + _eca_config.defaultImports[_eca_i].substring(_eca_config.defaultImports[_eca_i].lastIndexOf('.')+1) + " = _eca_jsloader.resolve(_eca_config.defaultImports[_eca_i]);");
			} catch(ex) {
				if ( ex instanceof WajaxError.ResourceNotFound ) {
					;
				} else if ( ex instanceof WajaxError.BadObject ) {
					;
				} else {
					throw ex;
				}
			}
		}
	return _eca_jsloader;
};

try {
	JSLoader.serverlessEnvBaseURL = document.URL.match("(file:/{2,3}([^" + "(/|\\\\)" + "]+" + "(/|\\\\)" + ")+)www" + "(/|\\\\)")[0];
} catch(ex) {
	;
}

try {
	JSLoader.serverlessTestEnvBaseURL = document.URL.match("(file:/{2,3}([^" + "(/|\\\\)" + "]+" + "(/|\\\\)" + ")+)test" + "(/|\\\\)")[1] + "src/";
} catch(ex) {
	;
}
