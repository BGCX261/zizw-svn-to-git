
var Logger = imports("aui.Logger");

var StringNode = function(container, path) {
	this.path = path;
	this.input = document.createElement("input");
	container.appendChild(this.input);
	this.attachListener(this.input, "change", this.onchange, this);
};

lang.extend(StringNode, "aui.AbstractNode");

StringNode.prototype._set = function(value) {
	this.input.value = value;
};

StringNode.prototype.onchange = function() {
	Logger.getInstance().log(this.path, this.input.value);
};
