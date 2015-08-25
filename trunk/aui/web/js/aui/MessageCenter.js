
var MessageCenter = {
	defaultHandlers: [
	],
	handlerMatrix: {
	},
	afterCreate: function(node) {
		var handler = this.locateHandler(node, node.getPath());
		if ( handler ) {
			;
		} else {
			handler = this.findHandler(this.defaultHandlers, node.getPath());
		}
		handler.afterCreate(node);
	},
	locateHandler: function(node, targetPath) {
		if ( node ) {
			;
		} else {
			return null;
		}
		var handler = this.findHandler(this.handlerMatrix[node.getPath()], targetPath);
		if ( handler ) {
			return handler;
		} else {
			return this.locateHandler(node.parentNode, targetPath);
		}
	},
	findHandler: function(handlers, targetPath) {
		if ( !handlers ) {
			return null;
		}
		for ( var i = 0; i < handlers.length; i++ ) {
			if ( handlers[i].accept(targetPath) ) {
				return handlers[i];
			}
		}
		return null;
	}
};

MessageCenter.defaultHandlers.push({
	elements: {
	},
	accept: function() {
		return true;
	},
	afterCreate: function(node) {
		var container = this.getContainer(node.parentNode);
		var element = document.createElement("div");
		element.innerHTML = node.getPath() + "[" + node.type + "]";
		element.style.paddingLeft = "20px";
		container.appendChild(element);
		this.elements[node.getPath()] = element;
	},
	getContainer: function(node) {
		if ( node ) {
			return this.elements[node.getPath()];
		} else {
			return document.body;
		}
	}
});
