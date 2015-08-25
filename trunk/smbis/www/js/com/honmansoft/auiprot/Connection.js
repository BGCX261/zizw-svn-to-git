
var Connection = function() {	
	this.clientSocket = new Socket();
	this.serverSocket = new Socket();
};

Connection.prototype.setClient = function(client) {
	this.clientSocket.client = client;
	this.serverSocket.server = client;
};

Connection.prototype.setServer = function(server) {
	this.clientSocket.server = server;
	this.serverSocket.client = server;
};

Connection.prototype.getClientSocket = function() {
	return this.clientSocket;
};

Connection.prototype.getServerSocket = function() {
	return this.serverSocket;
};

var Socket = function() {
	this.client = null;
	this.server = null;
};

Socket.prototype.transmit = function(delta) {
	this.server.synchronize(delta);
};

Socket.prototype.receive = function(delta) {
	this.client.synchronize(delta);
};
