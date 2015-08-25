
var AUI = function() {
	this.path = "";
};

lang.extend(AUI, "aui.ObjectNode");

AUI.prototype._getSlot = function(name) {
	return document.body;
};
