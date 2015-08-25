
var NodeFactory = imports("aui.NodeFactory");

var ObjectNode = function(container, path) {
	this.path = path;
	this.table = document.createElement("table");
	container.appendChild(this.table);
	this.tbody = document.createElement("tbody");
	this.table.appendChild(this.tbody);
};

lang.extend(ObjectNode, "aui.AbstractNode");

ObjectNode.prototype._set = function(value) {
	this._removeAll();
	for ( var prop in value ) {
		this._add(prop, value[prop]);
	}	
};

ObjectNode.prototype._add = function(name, value) {
	// get slot
	var slot = this._getSlot(name);
	// create node
	var NodeType = NodeFactory.getInstance().resolveNodeType(value);
	var node = new NodeType(slot, this.path+"/"+name);
	// set value
	node._set(value);
	//
	return node;
};

ObjectNode.prototype._remove = function(name) {
	for ( var child = this.tbody.firstChild; child; child = child.nextSibling ) {
		if ( child.firstChild.innerHTML == name ) {
			this.tbody.removeChild(child);
			return;
		}
	}
};

ObjectNode.prototype._removeAll = function(name) {
	while ( this.tbody.firstChild ) {
		this.tbody.removeChild(this.tbody.firstChild);
	}
};

ObjectNode.prototype._getSlot = function(name) {
	var tr = document.createElement("tr");
	this.tbody.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = name;
	td = document.createElement("td");
	tr.appendChild(td);
	return td;
};
