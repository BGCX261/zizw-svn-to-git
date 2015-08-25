
var _Prototype = {

	isIE: function() {
		return !!(window.attachEvent && !window.opera);
	},
	
	isFF: function() {
		return navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1;
	},

	hasClassName: function(element, className) {
		var elementClassName = element.className;
		return (elementClassName.length > 0 && (elementClassName == className ||
			new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
	},

	addClassName: function(element, className) {
		var hasClassName = this.hasClassName(element, className);
		if (!hasClassName)
			element.className += (element.className ? ' ' : '') + className;
	},

	removeClassName: function(element, className) {
		element.className = element.className.replace(new RegExp('(^|\\s+)' + className + '(\\s+|$)'), ' ');
	},

	toggleClassName: function(element, className) {
		var hasClassName = this.hasClassName(element, className);
		if ( hasClassName ) {
			this.removeClassName(element, className);
		} else {
			this.addClassName(element, className);
		}
	},

	getRealOffset: function(element) {
		var top = 0, left = 0;
		do {
			top += element.scrollTop  || 0;
			left += element.scrollLeft || 0;
			element = element.parentNode;
		} while (element);
		return new Position(left, top);
	},
	
	getCumulativeOffset: function(element) {
		var top = 0, left = 0;
		do {
			top += element.offsetTop  || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return new Position(left, top);
	},
	
	getPositionedOffset: function(element) {
		var top = 0, left = 0;
		do {
			top += element.offsetTop  || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
			if (element) {
				if(element.tagName=='BODY') break;
				var p = element.style.position;
				if (p == 'relative' || p == 'absolute') break;
			}
		} while (element);
		return new Position(left, top);
	},

	getPageOffset: function(forElement) {
		var top = 0, left = 0;
		var element = forElement;
		do {
			top += element.offsetTop  || 0;
			left += element.offsetLeft || 0;
	    } while (element = element.offsetParent);
	    element = forElement;
		do {
			if (!window.opera || element.tagName=='BODY') {
				top -= element.scrollTop  || 0;
				left -= element.scrollLeft || 0;
			}
		} while (element = element.parentNode);
		return new Position(left, top);
	},
	
	getDimension: function(element) {
		var display = element.style.display;
		//
		var els = element.style;
		var originalVisibility = els.visibility;
		var originalPosition = els.position;
		var originalDisplay = els.display;
		//
		els.visibility = 'hidden';
		els.position = 'absolute';
		els.display = 'block';
		//
		var originalWidth = element.clientWidth;
		var originalHeight = element.clientHeight;
		//
		els.display = originalDisplay;
		els.position = originalPosition;
		els.visibility = originalVisibility;
		return new Dimension(originalWidth, originalHeight);
	},

	strip: function(s) {
		return s.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	
	getViewport: function() {
		var viewport = new Dimension();
		for ( var d in {width:"",height:""} ) {
			var D = d.charAt(0).toUpperCase() + d.substring(1);
			viewport[d] = 
				self['inner' + D] ||
				(document.documentElement['client' + D] || 
				document.body['client' + D]);
		};
	    return viewport;
	}
};

var Position = function(left, top) {
	this.left = left;
	this.top = top;
	this.toString = function() {
		return "[left:" + this.left + ", top:" + this.top + "]";
	};
};

var Dimension = function(width, height) {
	this.width = width;
	this.height = height;
	this.toString = function() {
		return "[width:" + this.width + ", height:" + this.height + "]";
	};
};
