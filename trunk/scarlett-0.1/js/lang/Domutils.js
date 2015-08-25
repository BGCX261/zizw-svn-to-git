
var Domutils = {
	isIE: _Prototype.isIE,
	isFF: _Prototype.isFF,
	strip: _Prototype.strip,
	getDimension: _Prototype.getDimension,
	getPositionedOffset: _Prototype.getPositionedOffset,
	getViewport: _Prototype.getViewport,
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
	formatAmount : function(amount) {
		if ( amount < 10 ) {
			amount = "00" + amount;
		} else if ( amount < 100 ) {
			amount = "0" + amount;
		} else {
			amount = "" + amount;
		}
		amount = amount.substring(0, amount.length-2) + "." + amount.substring(amount.length-2)
		return amount
	},
	formatTime : function(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		return hours+":"+((minutes)<10?"0"+(minutes):(minutes))+":"+(seconds<10?"0"+seconds:seconds);
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
	},
	makeDialog: function(component) {
		var Wrapper = function(model) {
			this.container = document.body;
			this.mask = document.createElement("div");
			this.container.appendChild(this.mask);
			if ( Domutils.isIE() ) {
				this.mask.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=30)";
				this.mask.style.backgroundColor = "lightblue"
			} else if ( Domutils.isFF() ) {
				this.mask.style.MozOpacity = 0.3;
				this.mask.style.backgroundColor = "lightblue"
			} else {
				;
			}
			this.mask.style.position = "absolute";
			this.mask.style.width = "100%";
			this.mask.style.height = "100%";
			this.comp = new component(this.container, model);
			this.comp.__destroy = this.comp.destroy;
			var wrapper = this;
			this.comp.destroy = function() {
				wrapper.destroy();
			};
			Domutils.makeItCenter(this.comp.element);
		};
		Wrapper.prototype.destroy = function() {
			this.comp.__destroy();
			this.container.removeChild(this.mask);
		};
		return Wrapper;
	},
	makeItCenter: function(element) {
		var viewport = this.getViewport();
		element.style.display = "block";
		var left = (viewport.width-element.offsetWidth)/2;
		var top = (viewport.height-element.offsetHeight)*(1-0.618);
		element.style.left = left + "px";
		element.style.top = top + "px";
	}
	
};
