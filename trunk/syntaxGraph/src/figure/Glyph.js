
var Glyph = function(container) {
	this.container = container;
	this.element = document.createElement("div");
	this.element.style.position = "absolute";
	this.container.appendChild(this.element);
};

Glyph.prototype.getElement = function() {
	return this.element;
};

Glyph.prototype.setPosition = function(left, top) {
	this.element.style.left = left;
	this.element.style.top = top;
};
