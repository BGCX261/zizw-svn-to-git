
var Logger = imports("aui.Logger");

var FlushNode = function(container, path) {
	this.path = path;
	this.input = document.createElement("input");
	this.input.type = "button";
	this.input.value = "Flush";
	container.appendChild(this.input);
	this.attachListener(this.input, "click", this.doFlush, this);
};

lang.extend(FlushNode, "aui.AbstractNode");

FlushNode.prototype._set = function(value) {
	;
};

FlushNode.prototype.set = function() {
	alert(this.path + ":" + Logger.getInstance());
	Logger.getInstance().clean();
};

FlushNode.prototype.doFlush = function() {
	this.set();
};
