
var Engine = jsloader.resolve("com.honmansoft.smbis.console.Engine");

var Console = function(element) {	
	Console.superclass.constructor.call(this, element);
};

lang.extend(Console, Module);

Console.prototype.getTemplate = function() {
	return "<div>\
		<div hms-id='output'></div>\
		<div>\
			<span hms-id='prompt' style='display: none'></span>\
			<input hms-id='input' style='display: none'></input>\
		</div>\
	</div>";
};

Console.prototype.elemInput_keydown_handler = function(ev) {
	if ( 13 != ev.keyCode )
		return;
	var input = this.elemInput.value;
	this.write(this.prompt + " " + input);
	this.elemPrompt.style.display = "none";
	this.elemInput.style.display = "none";
	var call = "";
	call += "this.arguments[1].call(this.arguments[2], input";
	for ( var i = 3; i < this.arguments.length; i++ ) {
		call += ", this.arguments[" + i + "]";
	}
	call += ");"
	eval(call);
};

Console.prototype.read = function(prompt, callback, that) {
	this.arguments = arguments;
	this.prompt = prompt || Console.DEFAULT_PROMPT;
	this.elemPrompt.style.display = "";
	this.elemInput.style.display = "";
	this.elemPrompt.innerHTML = this.prompt + " ";
	this.elemInput.value = "";
	this.elemInput.focus();
};

Console.prototype.write = function(message) {
	var div = document.createElement("div");
	this.elemOutput.appendChild(div);
	div.innerHTML = message;
	this.elemInput.scrollIntoView();
};

Console.DEFAULT_PROMPT = "&gt;";
