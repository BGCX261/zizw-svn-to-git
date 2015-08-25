
var Glyph = jsloader.resolve("figure.Glyph");

var HLine = function(container) {
	HLine.superclass.constructor.call(this, container);
	this.element.style.backgroundColor = "black";
	this.element.style.fontSize = "0px";
	this.element.style.lineHeight = "0px";
	this.element.style.height = "2px";
};

lang.extend(HLine, Glyph);

HLine.prototype.setLength = function(length) {
	this.element.style.width = length + "px";
};
