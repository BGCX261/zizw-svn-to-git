
var Calendar = jsloader.resolve("tarah.Calendar");
var TabBook = jsloader.resolve("tarah.TabBook");

var MainFrame = function(container) {
	MainFrame.superclass.constructor.call(this, container);
};

lang.extend(MainFrame, Module);

MainFrame.prototype.setUsername = function(userInfo) {
	this.userInfo = userInfo;
	this.elemUsername.innerHTML = this.userInfo.name;
};

MainFrame.prototype.resetPosition = function() {
};

MainFrame.MARGIN = 10;

MainFrame.prototype.reset = function() {
	var width = (this.container.clientWidth-MainFrame.MARGIN*2);
	var height = (this.container.clientHeight-MainFrame.MARGIN*2);
	this.element.style.width = width + "px";
	this.element.style.height = height + "px";
	this.element.style.margin = MainFrame.MARGIN + "px";
	//
	this.elemCalendar.style.width = "200px";
	//
	this.elemBook.style.left = this.elemCalendar.offsetWidth + "px";
	this.elemBook.style.width = (this.element.offsetWidth-this.elemCalendar.offsetWidth-MainFrame.MARGIN) + "px";
	this.elemBook.style.height = (this.element.offsetHeight-30-MainFrame.MARGIN) + "px";
	//
	for ( var prop in this.children )
		this.children[prop].reset();
};

MainFrame.prototype.afterInit = function(){
	;
};

MainFrame.prototype.getConfig = function(){return{
	hmsid: "MainFrame",
	template: "<div style='border-bottom:1px solid black; position:absolute; right:0pt; height:24px; width:100%;'>\
		<table style='width: 100%'>\
			<tr>\
				<td><strong>Welcom To Tarah</strong>\
				</td>\
				<td align='right'><span hmsid='username'></span> | <a href='#'>Logout</a>\
				</td>\
			</tr>\
		</table>\
	</div>\
	<div hmsid='calendar' hmstype='tarah.Calendar' style='position: absolute; top: 30px'>\
	</div>\
	<div hmsid='book' hmstype='tarah.TabBook' style='position: absolute; top: 30px'>\
	</div>"
}};
