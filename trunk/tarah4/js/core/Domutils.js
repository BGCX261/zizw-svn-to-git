
var PrototypeDistilled = {

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
	}
};

var Domutils = {
	isIE: PrototypeDistilled.isIE,
	isFF: PrototypeDistilled.isFF,
	hasClassName: PrototypeDistilled.hasClassName,
	addClassName: PrototypeDistilled.addClassName,
	removeClassName: PrototypeDistilled.removeClassName,
	toggleClassName: PrototypeDistilled.toggleClassName,
	getDimension: PrototypeDistilled.getDimension,
	getPageOffset: PrototypeDistilled.getPageOffset,
	getPositionedOffset: PrototypeDistilled.getPositionedOffset,
	getCumulativeOffset: PrototypeDistilled.getCumulativeOffset,
	getRealOffset: PrototypeDistilled.getRealOffset,
	strip: PrototypeDistilled.strip,
	attachListener: function(target, type, handler) {
		if ( this.isIE() ) {
			target.attachEvent("on"+type, handler);
		} else {
			target.addEventListener(type, handler, false);
		}
	},	
	detachListener: function(target, type, handler) {	
		if ( this.isIE() ) {
			target.detachEvent("on"+type, handler);
		} else {
			target.removeEventListener(type, handler, false);
		}
	},
	stopPropagation: function(ev) {
		if (ev.stopPropagation) {
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true;
		}
	},
	preventDefault: function(ev) {
		if (ev.preventDefault) {
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
	},	
	stopEvent : function(ev) {
		this.preventDefault(ev);
		this.stopPropagation(ev);
	},
	formatDate : function(date) {
		var fullYear = date.getFullYear();
		var month = date.getMonth();
		var dayOfMonth = date.getDate();
		return fullYear+"-"+(month+1)+"-"+(dayOfMonth<10?"0"+dayOfMonth:dayOfMonth);
	},
	log : function(msg) {
		if ( this.isFF() && window.console )
			window.console.log(msg);
	},
	xml2string : function(elem) {
		var s = "";
		s += "<" + elem.tagName;
		for ( var i = 0; i < elem.attributes.length; i++ ) {
			var attr = elem.attributes.item(i);
			s += " " + attr.nodeName + "=";
			s += "'" + attr.nodeValue + "'";
		}
		s += ">";
		for ( var child = elem.firstChild; child; child = child.nextSibling ) {
			s += this.xml2string(child);
		}
		s += "</" + elem.tagName + ">";
		return s;
	},
	isOnDOM : function(elem) {
		for ( var temp = elem; temp; temp = temp.parentNode )
			if ( document.body == temp )
				return true;
		return false;
	},
	createElement : function(parentNode, tagName) {
		__assert(
			parentNode && this.isOnDOM(parentNode), 
			"Domutils.createElement", "parentNode is not valid", parentNode);
		__assert(
			isValidTagName(tagName), 
			"Domutils.createElement", "tagName is not valid", tagName);
		// <<
		var elem = document.createElement(tagName);
		parentNode.appendChild(elem);
		return elem;
	}
};

var isValidTagName = function(tagName) {
	if ( !tagName )
		return false;
	tagName = Domutils.strip(tagName);
	if ( !tagName )
		return false;
	return /^[A-Z]+$/.test(tagName); 
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
