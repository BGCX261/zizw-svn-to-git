
var Node = jsloader.resolve("com.honmansoft.auiprot.Node");

var InstanceModel = function(schemaModel, connection, isClient) {
	this.schemaModel = schemaModel;
	this.connection = connection;
	this.isClient = isClient;
	this.nodes = [];
	this.log = [];
	this.createNode(this.schemaModel.getRootType());
	if ( this.isClient ) {
		this.connection.setClient(this);
	} else {
		this.connection.setServer(this);
	}
};

InstanceModel.prototype.getNodes = function() {
	return this.nodes;
};

InstanceModel.prototype.getProperties = function(nodeId) {
	var node = this.nodes[nodeId];
	return node.getProperties();
};

InstanceModel.prototype.getProperty = function(nodeId, propertyName) {
	var node = this.nodes[nodeId];
	return node.getProperty(propertyName);
};

InstanceModel.prototype.createNode = function(type) {
	var node = new Node(this.nodes.length, type);
	this.nodes.push(node);
	return node;
};

InstanceModel.prototype.execute = function(action, doLog) {
	var actionType = action.actionType;
	var node = this.nodes[action.nodeId];
	var isFlushPoint = this.schemaModel.isFlushPoint(node.type + "." + action.propertyName);
	if ( isFlushPoint ) {
		this.flush(action);
		return;
	}
	if ( "change" == actionType ) {
		node.setProperty(action.propertyName, action.propertyValue);
	} else {
		throw Error("unknown action type");
	}
	this.view.refresh();
	if ( doLog ) {
		this.log.push(action);
	}
};

InstanceModel.prototype.getSocket = function() {
	return this.isClient ? this.connection.getClientSocket() : this.connection.getServerSocket();
};

InstanceModel.prototype.flush = function(flushPoint) {
	var delta = {};
	delta.flushPoint = flushPoint;
	delta.log = this.log;	
	this.log = [];
	this.getSocket().transmit(delta);
};

InstanceModel.prototype.synchronize = function(delta) {
	for ( var i = 0; i < delta.log.length; i++ ) {
		var action = delta.log[i];
		this.execute(action);
	}
	if ( this.isClient ) {
		
	} else {
		this.processRequest(delta.flushPoint);
	}
};

InstanceModel.prototype.getRequest = function() {
	return this.request;
};

InstanceModel.prototype.processRequest = function(flushPoint) {
	var nodeId = flushPoint.nodeId;
	var type = this.nodes[nodeId].type;
	var propertyName = flushPoint.propertyName;
	this.request = "[" + nodeId + "]" + type + "." + propertyName;
	this.view.refresh();
};
