
var Glyph = jsloader.resolve("figure.Glyph");

var Box = function(container) {
	Box.superclass.constructor.call(this, container);
	this.element.style.borderWidth = "1px";
	this.element.style.borderStyle = "solid";
	this.element.style.borderColor = "black";
};

lang.extend(Box, Glyph);
