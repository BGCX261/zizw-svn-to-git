
var jsloader = function() {

	//
	// Responsibility: provide eval environment
	var _eca_eval = function(_eca_name, _eca_source) {
		// jsloader: used by evaluated code to resolve other names
		var jsloader = _eca_loader;
		eval(_eca_source);
		return eval(_eca_name);
	};
	
	//
	// Responsibility: enclose the rest parts of JSLoader
	var _eca_loader = function() {

		//
		// Responsibility: manage the loaded class/object
		var ClassRepository = function() {
			var root = {};
			var findPackage = function(name, fCreate) {
				var nameParts = name.split(".");
				var pack = root;
				for ( var i = 0; i < nameParts.length-1; i++ ) {
					if ( pack[nameParts[i]] )
						;
					else if ( fCreate )
						pack[nameParts[i]] = {};
					else
						return null;
					pack = pack[nameParts[i]]
				}
				return pack;
			};
			return {
				get: function(name) {
					var pack = findPackage(name, false);
					var objName = name.substring(name.lastIndexOf(".")+1);
					if ( pack && pack[objName] )
						return pack[objName];
					else
						return null;
				},
				set: function(name, obj) {
					var pack = findPackage(name, true);
					var objName = name.substring(name.lastIndexOf(".")+1);
					pack[objName] = obj;
				},
				resolve: function(name) { 
					return this.get(name); 
				}
			};
		};

		//
		// Responsibility: validate class name
		var isValidName = function(name) {
			return /^[a-zA-Z_][a-zA-Z_0-9]*(\.[a-zA-Z_][a-zA-Z_0-9]*)*$/.test(name);
		};

		//
		// Responsibility: load a resource from server
		var loadResource = function(url) {
			var path = "js";
			var xhr = null;
			if ( window.XMLHttpRequest ) {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xhr.open("GET", path+url, false);
			xhr.send("");
			if ( 200 != xhr.status ) {
				throw new Error("Can not load resource: " + url + ", status=" + xhr.status);
			}
			return xhr.responseText;
		};
		
		//
		// Responsibility: load a class/object 
		var DynamicLoader = function() {
			var name2url = function(name) {
				var url = "";
				var nameParts = name.split(".");
				for ( var i = 0; i < nameParts.length; i++ ) {
					url += "/" + nameParts[i];
				}
				url += ".js";
				var className = nameParts[--i];
				return [url, className];
			};
			return {
				resolve: function(name) {
					var url = name2url(name);
					var source = loadResource(url[0]);
					return _eca_eval(url[1], source);
				}
			};
		};
				
		var classRepository = new ClassRepository();
		
		// classRepository as the first loader
		var loaderChain = [classRepository]; 
		
		// dynamicLoader as the second loader
		loaderChain.push(new DynamicLoader());
		
		return {
			resolve: function(name) {
				if ( !isValidName(name) )
					throw new Error("Not a valid name: " + name);
				for ( var i = 0; i < loaderChain.length; i++ ) {
					var obj = loaderChain[i].resolve(name);
					if ( null == obj ) continue;
					if ( i > 0 )
						classRepository.set(name, obj);
					return obj;
				}
				return null;
			}
		};
	}();

	//
	// import objects implicitly	
	var lang = _eca_loader.resolve("com.honmansoft.ajax.lang");
	var domutils = _eca_loader.resolve("com.honmansoft.ajax.domutils");
	var xhr = _eca_loader.resolve("com.honmansoft.ajax.xhr");
	var Module = _eca_loader.resolve("com.honmansoft.ajax.Module");
	
	return _eca_loader;
}();

// set docBase
//document.write("<base href='" + document.URL.match("[a-zA-Z]+://([^/]+/){1,2}")[0] + "'/>");
