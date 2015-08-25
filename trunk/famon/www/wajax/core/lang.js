
var lang = {
	
	extend : function(subclass, superclass) {
		var f = function() {};
		f.prototype = superclass.prototype;
		subclass.prototype = new f();
		subclass.prototype.constructor = subclass;
		subclass.superclass = superclass.prototype;
		if (superclass.prototype.constructor == Object.prototype.constructor) {
			superclass.prototype.constructor = superclass;
		}
	}
	
};
