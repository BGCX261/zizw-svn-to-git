
var Session = function() {
	try {
		this.bean = rmi.getBean("uisession");
		this.root = this.bean.getRoot();
	} catch (ex) {
		rmi.viewResponse(ex);
	}
	this.createUINode(this.root);
};

Session.prototype.destroy = function() {
};

Session.prototype.createUINode = function(node, container) {
	var View = jsloader.resolve(node.viewType);
	new View(container, node.id, node.beanId);
};


