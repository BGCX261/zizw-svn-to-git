
var AbstractNode = function() {
	
};

AbstractNode.prototype.destroy = function() {
	if (this.eventHelper) {
		this.eventHelper.destroy();
	}
};

AbstractNode.prototype.attachListener = function(target, type, handler, that) {
	if (!this.eventHelper) {
		this.eventHelper = new EventHelper();
	}
	this.eventHelper.attachListener(target, type, handler, that);
};
