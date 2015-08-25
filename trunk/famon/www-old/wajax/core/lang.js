
var lang = {

	extend : function(subclass, superclass) { //FROM: yahoo yui
		var f = function() {};
		f.prototype = superclass.prototype;
		subclass.prototype = new f();
		subclass.prototype.constructor = subclass;
		subclass.superclass = superclass.prototype;
		if (superclass.prototype.constructor == Object.prototype.constructor) {
			superclass.prototype.constructor = superclass;
		}
	},
		
	parseJSON : function (jsonString) { //FROM: json.org,json.js
		if (/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(jsonString.replace(/"(\\.|[^"\\])*"/g, '')))
			throw new Error("Not a JS literal: " + jsonString);
		return eval('(' + jsonString + ')');
	},
	
	toJSONString : function (obj) { //FROM: json.org,json.js
		var m = {	'\b': '\\b',
							'\t': '\\t',
							'\n': '\\n',
							'\f': '\\f',
							'\r': '\\r',
							'"' : '\\"',
							'\\': '\\\\'	};
		var s = {
			array: function (x) {
				var a = ['['], b, f, i, l = x.length, v;
				if(l == 0) {
					var isNull = true;
					for(var i in x) {
						isNull = false;
						break;
					}
					if(!isNull) {
						//throw null;
						var a = ['{'], b, f, i, v;
						for (i in x) {
							v = x[i];
								f = s[typeof v];
								if (f) {
									v = f(v);
									if (typeof v == 'string') {
										if (b) {
											a[a.length] = ',';
										}
										a.push(s.string(i), ':', v);
										b = true;
									}
								}
							}
						a[a.length] = '}';
						return a.join('');
					}
				} else {
					for (i = 0; i < l; i += 1) {
						v = x[i];
						f = s[typeof v];
						if (f) {
							v = f(v);
							if (typeof v == 'string') {
								if (b) {
									a[a.length] = ',';
								}
								a[a.length] = v;
								b = true;
							}
						}
					}
				}
				a[a.length] = ']';
				return a.join('');
			},
			'boolean': function (x) {
				return String(x);
			},
			'null': function (x) {
				return "null";
			},
			number: function (x) {
				return isFinite(x) ? String(x) : 'null';
			},
			object: function (x) {
				if (x) {
					if (x instanceof Array) {
						return s.array(x);
					}
					var a = ['{'], b, f, i, v;
					for (i in x) {
						v = x[i];
							f = s[typeof v];
							if (f) {
								v = f(v);
								if (typeof v == 'string') {
									if (b) {
										a[a.length] = ',';
									}
									a.push(s.string(i), ':', v);
									b = true;
								}
							}
						}
					a[a.length] = '}';
					return a.join('');
				}
				return 'null';
			},
			string: function (x) {
				if (/["\\\x00-\x1f]/.test(x)) {
					x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
							var c = m[b];
							if (c) {
								return c;
							}
							c = b.charCodeAt();
							return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
					});
				}
        		return '"' + x + '"';
			}
		};
		return s[typeof obj](obj);
	}
};
 