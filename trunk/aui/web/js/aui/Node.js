
var MessageCenter = jsloader.resolve("aui.MessageCenter");

var Node = function(type, parentNode, nori) {
	this.type = type;
	this.parentNode = parentNode;
	this.nori = nori || "";
	if ( type == TYPE_OBJECT ) {
		this.children = {};
	} else if ( type == TYPE_ARRAY ) {
		this.children = [];
	} else {
		;
	}
	if ( this.parentNode ) {
		this.parentNode.children[nori] = this;
	}
	MessageCenter.afterCreate(this);
};

Node.prototype.getPath = function() {
	var path = this.parentNode && this.parentNode.getPath() || "";
	path += "/";
	path += this.nori || "";
	return path;
};

var TYPE_STRING = "string";
var TYPE_NUMGER = "number";
var TYPE_BOOLEAN = "boolean";
var TYPE_OBJECT = "object";
var TYPE_ARRAY = "array";
