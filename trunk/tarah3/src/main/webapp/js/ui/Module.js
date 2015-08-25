
var Module = function(container) {
	// init members
	this.container = container;
	this.element = this.createElement(this.container);
	// create event helper
	this.eventHelper = new EventHelper();
};

Module.prototype.destroy = function() {
	this.eventHelper.destroy();
	this.container.removeChild(this.element);
};

Module.prototype.createElement = function(container) {
	var div = document.createElement(div);
	container.appendChild(div);
	div.style.position = "absolute";
	div.style.width = "100%";
	div.style.height = "100%";
	return div;
};
