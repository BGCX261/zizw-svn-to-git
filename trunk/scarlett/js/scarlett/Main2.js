
var Main2 = function(container) {
	this.container = container;
	var template = jsloader.doGet("html/Main2.html");
	this.container.innerHTML = template;
	Domutils.bindElements(this, this.container);
	//
	this.gbar = new (jsloader.resolve("scarlett.GBar"))(this.elemGbar);
	//
	this.nav = new (jsloader.resolve("scarlett.Nav"))(this.elemNav);
	//
	this.maincell = new (jsloader.resolve("scarlett.Maincell"))(this.elemMaincell);
};

Main2.prototype.destroy = function() {
	
};