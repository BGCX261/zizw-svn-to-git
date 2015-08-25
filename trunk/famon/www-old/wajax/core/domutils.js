
var utilsIntern = {
	
	setClassName : function(element, newClassName, oldClassName) {
		var newClassNameList = this._makeNewClassNameList(element.className, newClassName, oldClassName);
		element.className = newClassNameList;
	},
	
	_makeNewClassNameList : function(classNameList, newClassName, oldClassName) {		
		classNameList = classNameList.replace(
			new RegExp("( |\t|^)( |\t)*"+newClassName+"( |\t)*( |\t|$)", "g"),
			" ");
		classNameList = classNameList.replace(
			new RegExp("( |\t|^)( |\t)*"+oldClassName+"( |\t)*( |\t|$)", "g"),
			" ");
		return classNameList + " " + newClassName;
	}	
};

var PrototypeDistilled = {

	Version: '1.5.1.1',	

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
  
	isIE: function() {
		return !!(window.attachEvent && !window.opera);
	},
	
	isFirefox: function() {
		return navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1;
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

var domutils = {
	getRealOffset: PrototypeDistilled.getRealOffset,
	getPositionedOffset: PrototypeDistilled.getPositionedOffset,
	getPageOffset: PrototypeDistilled.getPageOffset,
	getCumulativeOffset: PrototypeDistilled.getCumulativeOffset,
	getDimension: PrototypeDistilled.getDimension,
	isIE: PrototypeDistilled.isIE,
	isFirefox: PrototypeDistilled.isFirefox,
	//////////////////////////////////////////////////////
	
	addClassName : function(element, className) {
		utilsIntern.setClassName(element, className);
	},
	
	removeClassName : function(element, className) {
		utilsIntern.setClassName(element, null, className);
	},
	
	replaceClassName : function(element, newClassName, oldClassName) {
		utilsIntern.setClassName(element, newClassName, oldClassName);
	}, 
	
	hasClassName : function(element, className) {
		var re = new RegExp("( |\t|^)" + className + "( |\t|$)");
		return re.test(element.className);
	}
	
};
