
var ActionManager = jsloader.resolve("com.honmansoft.faq.ActionManager");

var Engine = function(cncl) {
	this.cncl = cncl;
	this.aui = {
		__meta: {id:0,valid:false,action:"login"}
	};
	this.namePath = ["/"];
	this.objectPath = [this.aui];
	//
	this.readCommand();
};

Engine.prototype.readCommand = function() {
	this.cncl.read("", this.execute, this);
};

Engine.prototype.execute = function(commandLine) {
	var cmd = this.parseCommandLine(commandLine);
	if ( !cmd[0] ) {
		this.readCommand();
	} else if ( this["cmd_"+cmd[0]] ) {
		this["cmd_"+cmd[0]](cmd);
	} else {
		this.cncl.write("command not found: " + cmd[0]);
		this.readCommand();
	}
};

Engine.prototype.parseCommandLine = function(commandLine) {
	var result = commandLine.split(/\s+/);
	return result;
};

Engine.prototype.cmd_help = function() {
	var result = "";
	for ( var prop in this ) {
		if ( !this[prop] )
			continue;
		if ( 0 != prop.indexOf("cmd_") )
			continue;
		result += " " + prop.substring(4);
	}
	this.cncl.write(result);
	this.readCommand();
};

Engine.prototype.cmd_pwd = function() {
	var pwd = "";
	for ( var i = 1; i < this.namePath.length; i++ ) {
		pwd += "/" + this.namePath[i];
	}
	this.cncl.write(pwd||"/");
	this.readCommand();
};

Engine.prototype.cmd_ls = function(cmd) {
	var actionManager = ActionManager.instance();
	var meta = this.peek().__meta;
	if ( meta.valid ) {
		alert("print");
	} else {
		var action = actionManager.getAction(meta.action);
		var form = {};
		var i = 0;
		var readArgument = function () {
			var prop = action.form[i++].name;
			this.cncl.read(prop, handler, this, prop);
		};
		var handler = function(arg, prop) {
			form[prop] = arg;
			if ( i < action.form.length ) {
				readArgument.call(this);
			} else {
				//post form
				this.readCommand();
			}
		};
		readArgument.call(this);
	}
};

Engine.prototype.peek = function() {
	return this.objectPath[this.objectPath.length-1];
};

Engine.prototype.destroy = function() {
	;
};
