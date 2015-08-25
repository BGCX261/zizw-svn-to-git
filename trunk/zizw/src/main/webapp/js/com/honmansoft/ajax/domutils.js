
var domutils = {
	
	isFirefox : function() {
		return navigator.userAgent.indexOf("Firefox") > 0;
	},

	isIE : function() {
		return navigator.appName == "Microsoft Internet Explorer";
	},

	isLeftButton: function(button) {
		if(this.isIE())
			return button == 1;
		else if(this.isFirefox())
			return button == 0;
	},

	isRightButton: function(button) {
		if(this.isIE())
			return button == 2;
		else if(this.isFirefox())
			return button == 2;
	},

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
	}
};

var utilsIntern = {
	
	setClassName : function(element, newClassName, oldClassName) {
		var newClassNameList = this._makeNewClassNameList(element.className, newClassName, oldClassName);
		element.className = newClassNameList;
	},
	
	_makeNewClassNameList : function(classNameList, newClassName, oldClassName) {
		var newClassNameList = null;
		if ( typeof classNameList !== "string" )
			throw new Error("classNameList error!");
		var toFind = null;
		if ( oldClassName ) {
			if ( typeof oldClassName !== "string" )
				throw new Error("oldClassName error!");
			toFind = oldClassName;
		} else {
			if ( typeof newClassName !== "string" )
				throw new Error("newClassName error!");
			toFind = newClassName;
		}
		var indexFound = classNameList.indexOf(toFind);
		if ( -1 === indexFound ) {
			if ( typeof newClassName !== "string" )
				throw new Error("newClassName error!");
			newClassNameList = classNameList + " " + newClassName;
		} else if ( oldClassName ) {
			newClassNameList = classNameList.substring(0, indexFound);
			newClassNameList += newClassName ? newClassName : "";
			newClassNameList += classNameList.substring(indexFound+oldClassName.length);
		} else {
			newClassNameList = classNameList;
		}
		return newClassNameList;
	}	
};
