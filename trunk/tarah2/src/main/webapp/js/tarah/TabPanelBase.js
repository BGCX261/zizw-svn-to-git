
var TabPanelBase = function(container) {
	TabPanelBase.superclass.constructor.call(this, container);
};

lang.extend(TabPanelBase, Module);

TabPanelBase.prototype.createLeftSpace = function() {
	var leftSpace = document.createElement("td");
	var firstCell = this.elemButtonRow.cells[0];
	this.elemButtonRow.insertBefore(leftSpace, firstCell);
	//
	leftSpace.className = "tabPanel-buttonLeftSpace";
	leftSpace.innerHTML = "<div style='width: 2px; font-size: 2px'>&nbsp;</div>";
};

TabPanelBase.prototype.createMiddleSpace = function() {
	var middleSpace = document.createElement("td");
	var rightSpace = this.elemButtonRow.cells[this.elemButtonRow.cells.length-2];
	this.elemButtonRow.insertBefore(middleSpace, rightSpace);
	//
	middleSpace.className = "tabPanel-buttonMiddleSpace";
	middleSpace.innerHTML = "<div style='width: 4px; font-size: 4px'>&nbsp;</div>";
};

TabPanelBase.prototype.createRightSpace = function() {
	var leftSpace = document.createElement("td");
	var lastCell = this.elemButtonRow.cells[this.elemButtonRow.cells.length-1];
	this.elemButtonRow.insertBefore(leftSpace, lastCell);
	//
	leftSpace.className = "tabPanel-buttonRightSpace";
	leftSpace.innerHTML = "<div style='width: 2px; font-size: 2px'>&nbsp;</div>";
};

TabPanelBase.prototype.createButton = function(name) {
	var button = document.createElement("td");
	var rightSpace = this.elemButtonRow.cells[this.elemButtonRow.cells.length-2];
	this.elemButtonRow.insertBefore(button, rightSpace);
	//
	button.noWrap = true;
	button.className = "tabPanel-button";
	button.innerHTML = name;
	return button;
};

TabPanelBase.prototype.selectButton = function(name, unselect) {
	var oldClass = unselect ? "tabPanel-buttonSelected" : "tabPanel-button";
	var newClass = unselect ? "tabPanel-button" : "tabPanel-buttonSelected";
	//
	var button = this.getButton(name);
	domutils.removeClassName(button, oldClass);
	domutils.addClassName(button, newClass);
};

TabPanelBase.prototype.getButton = function(name) {	
	var cells = this.elemButtonRow.cells;
	for ( var i = 0; i < cells.length; i++ ) {
		if ( name != cells[i].innerHTML )
			continue;
		return cells[i];
	}
};

TabPanelBase.prototype.unselectButton = function(name) {
	this.selectButton(name, true);
};

TabPanelBase.prototype.selectPage = function(name, unselect) {		
	var page = this.getPage(name);
	if ( unselect ) {
		page.style.display = "none";
	} else {
		page.style.display = "block";
		this.resetPage(page);
	}
};

TabPanelBase.prototype.resetPage = function(page) {
	page.style.top = "5px";	
	page.style.width = "100%";
	page.style.height = (this.elemPageSlot.offsetHeight-5) + "px";
};

TabPanelBase.prototype.unselectPage = function(name) {
	this.selectPage(name, true);
};

TabPanelBase.prototype.incColSpan = function() {
	this.elemPageSlot.colSpan++;
};

TabPanelBase.prototype.clearPageSlot = function() {
	this.elemPageSlot.innerHTML = "";
};

TabPanelBase.prototype.createPage = function(name) {
	var div = document.createElement("div");
	this.elemPageSlot.appendChild(div);
	//
	div.className = "tabPanel-page";
	div.setAttribute("__pageTag", name);
};

TabPanelBase.prototype.getPage = function(name) {
	for ( var child = this.elemPageSlot.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType ) {
			continue;
		}
		if ( name != child.getAttribute("__pageTag") ) {
			continue;
		}
		return child;
	}
};

TabPanelBase.prototype.reset = function() {
	this.elemPageSlot.style.top = "20px";
	this.elemPageSlot.style.height = (this.element.offsetHeight-20) + "px";
	for ( var child = this.elemPageSlot.firstChild; child; child = child.nextSibling ) {
		if ( 1 != child.nodeType ) {
			continue;
		}
		this.resetPage(child);
	}
	for ( var prop in this.children )
		this.children[prop].reset();
};

TabPanelBase.prototype.afterInit = function() {
	;
};

TabPanelBase.prototype.getConfig = function(){return{
	hmsid: "TabPanel",
	template: "<div class='tabPanel' style='width: 100%; height: 100%'>\
		<div class='tabPanel-tableSlot'>\
			<table class='tabPanel-table' cellspacing='0'>\
				<tr hmsid='buttonRow'>\
					<td class='tabPanel-toolbar'><div style='width: 100%'>&nbsp;</div></td>\
				</tr>\
			</table>\
		</div>\
		<div hmsid='pageSlot' class='tabPanel-pageSlot'>\
		</div>\
	</div>"
}};
