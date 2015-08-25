
var NumberNode = function(container, path) {
	this.path = path;
	NumberNode.superclass.constructor.call(this, container);
};

lang.extend(NumberNode, "aui.StringNode");
