
var Logger = imports("aui.Logger");

var BooleanNode = function(container, path) {
	this.path = path;
	this.input = document.createElement("input");
	this.input.type = "checkbox";
	container.appendChild(this.input);
	this.attachListener(this.input, "change", this.onchange, this);
};

lang.extend(BooleanNode, "aui.AbstractNode");

BooleanNode.prototype._set = function(value) {
	this.input.checked = value;
};

BooleanNode.prototype.onchange = function() {
	Logger.getInstance().log(this.path, this.input.checked);
};
