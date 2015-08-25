
var Component = function(container, templateUrl) {
	this.container = container;
	this.element = null;
	this.window = window;
	this.eventHelper = new EventHelper();
	if ( templateUrl ) {
		this.loadTemplate(templateUrl);
	}
};

Component.prototype.destroy = function() {
	this.eventHelper.destroy();
	this.container.removeChild(this.element);
};

/**
 * side-effect:
 *  1) setting this.element
 *  2) setting this.elemXXX
 */
Component.prototype.loadTemplate = function(url) {
	var div = document.createElement("div");
	this.container.appendChild(div);
	div.innerHTML = jsloader.doGet(url);
	this.element = div.firstChild;
	this.container.appendChild(div.firstChild);
	this.container.removeChild(div);
	this.bindElements(this.element);
	this.bindHandlers();
};

Component.prototype.bindElements = function(element) {
	if ( element.nodeType != 1 ) {
		return;
	}
	var hmsid = element.getAttribute("hmsid");
	if ( hmsid ) {
		hmsid = "elem"+hmsid.charAt(0).toUpperCase()+hmsid.substring(1);
		this[hmsid] = element;
	}
	for ( var child = element.firstChild; child; child = child.nextSibling ) {
		this.bindElements(child);
	}
};

Component.prototype.bindHandlers = function() {
	for ( var prop in this ) {
		if( !/.*_handler/.test(prop) ) {
			continue;
		}
		var element = this[prop.substring(0, prop.indexOf("_"))];
		if ( !element ) {
			continue;
		}
		var eventType = prop.substring(prop.indexOf("_")+1, prop.lastIndexOf("_"));
		this.eventHelper.attachListener(element, eventType, this[prop], this);
	}
};
