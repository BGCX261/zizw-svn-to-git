
var Domutils = {
	isIE: _Prototype.isIE,
	isFF: _Prototype.isFF,
	attachListener: function(target, type, handler) {
		if ( _Prototype.isIE() ) {
			target.attachEvent("on"+type, handler);
		} else {
			target.addEventListener(type, handler, false);
		}
	},	
	detachListener: function(target, type, handler) {	
		if ( _Prototype.isIE() ) {
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
		return fullYear+"-"+((month+1)<10?"0"+(month+1):(month+1))+"-"+(dayOfMonth<10?"0"+dayOfMonth:dayOfMonth);
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
	createElem : function(parentNode, tagName) {
		var elem = document.createElement(tagName);
		parentNode.appendChild(elem);
		return elem;
	}
};
