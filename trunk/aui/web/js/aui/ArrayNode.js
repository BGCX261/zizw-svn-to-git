
var NodeFactory = imports("aui.NodeFactory");

var ArrayNode = function(container, path) {
	this.path = path;
	this.table = document.createElement("table");
	container.appendChild(this.table);
	this.tbody = document.createElement("tbody");
	this.table.appendChild(this.tbody);
};

lang.extend(ArrayNode, "aui.AbstractNode");

ArrayNode.prototype._set = function(value) {
	this._removeAll();
	for ( var i = 0; i < value.length; i++ ) {
		this._add(i, value[i]);
	}	
};

ArrayNode.prototype._add = function(index, value) {
	// get slot
	var slot = this._getSlot(index);
	// create node
	var NodeType = NodeFactory.getInstance().resolveNodeType(value);
	var node = new NodeType(slot, this.path+"/"+name);
	// set value
	node._set(value);
};

ArrayNode.prototype._remove= function(index) {
	this.tbody.removeChild(this.tbody.childNodes[index]);
	this.refreshIndeces();
};

ArrayNode.prototype._removeAll= function(index) {
	while ( this.tbody.firstChild ) {
		this.tbody.removeChild(this.tbody.firstChild);
	}
};

ArrayNode.prototype._getSlot = function(index) {
	if ( index < 0 || index >= this.tbody.childNodes.length ) {
		index = this.tbody.childNodes.length;
	}
	var tr = document.createElement("tr");
	if ( index == this.tbody.childNodes.length ) {
		this.tbody.appendChild(tr);	
	} else {
		this.tbody.insertBefore(tr, this.tbody.childNodes[index]);
	}
	var td = document.createElement("td");
	tr.appendChild(td);
	td = document.createElement("td");
	tr.appendChild(td);
	this.refreshIndeces();
	return td;
};

ArrayNode.prototype.refreshIndeces = function() {
	for ( var child = this.tbody.firstChild; child; child = child.nextSibling ) {
		child.firstChild.innerHTML = child.rowIndex;
	}
};
