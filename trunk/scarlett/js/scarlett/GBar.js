
var GBar = function(container) {
	this.container = container;
	var template = jsloader.doGet("html/GBar.html");
	this.container.innerHTML = template;
};

GBar.prototype.destroy = function() {
	
};
