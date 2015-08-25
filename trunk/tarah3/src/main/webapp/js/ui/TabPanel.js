
var Module = jsloader.resolve("ui.Module");

var TabPanel = function(container) {
	TabPanel.superclass.constructor.call(this, container);
	// init members;
	this.trButtonRow = null;
	this.currentButton = null;
	// create table
	var table = document.createElement("table");
	this.element.appendChild(table);
	table.style.width = "100%";
	table.style.height = "20px";
	table.cellSpacing = 0;
	table.cellPadding = 0;
	// create tbody
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	// create row: button
	this.trButtonRow = this.createButtonRow(tbody);
	// bind listeners
	this.eventHelper.attachListener(this.trButtonRow, "mousedown", this.trButtonRow_mousedown_hander, this);
};

lang.extend(TabPanel, Module);

TabPanel.prototype.trButtonRow_mousedown_hander = function(ev) {
	var target = ev.target;
	if ( 
		target.nodeType== 1 && 
		target.tagName == "TD" &&
		target.getAttribute(ATTR_PAGE_NAME) ) {
		this.selectButton(target.getAttribute(ATTR_PAGE_NAME));
	}
};

TabPanel.prototype.append = function(pageName) {
	if ( this.isFirstButton() ) {
		this.createLeftSpaceCell(this.trButtonRow);
		this.createRightSpaceCell(this.trButtonRow);
		this.createButtonCell(this.trButtonRow, pageName);
	} else {
		this.createMiddleSpaceCell(this.trButtonRow);
		this.createButtonCell(this.trButtonRow, pageName);
	}
	this.selectButton(pageName);
};

TabPanel.prototype.selectButton= function(pageName) {
	for ( var i = 0; i < this.trButtonRow.cells.length; i++ ) {
		var cell = this.trButtonRow.cells[i];
		if ( cell.getAttribute(ATTR_PAGE_NAME) != pageName ) {
			continue;
		}
		if ( this.currentButton ) {
			this.currentButton.style.borderStyle = "solid";
			this.currentButton.style.borderWidth = "1px";
			this.currentButton.style.borderColor = "black";
		}
		cell.style.borderBottomWidth = "0px";
		this.currentButton = cell;
		break;
	}
};

TabPanel.prototype.isFirstButton = function() {
	return 1 == this.trButtonRow.cells.length;
};

TabPanel.prototype.createLeftSpaceCell = function(tr) {
	var td = document.createElement("td");
	tr.insertBefore(td, tr.cells[tr.cells.length-1]);
	td.style.borderBottomStyle = "solid";
	td.style.borderBottomWidth = "1px";
	td.style.borderBottomColor = "black";
	td.style.cursor = "default";
	var div = document.createElement("div");
	td.appendChild(div);
	div.innerHTML = "&nbsp;";
	div.style.fontSize = "2px";
	div.style.width = "2px";
	return td;
};

TabPanel.prototype.createMiddleSpaceCell = function(tr) {
	var td = document.createElement("td");
	tr.insertBefore(td, tr.cells[tr.cells.length-2]);
	td.style.borderBottomStyle = "solid";
	td.style.borderBottomWidth = "1px";
	td.style.borderBottomColor = "black";
	td.style.cursor = "default";
	var div = document.createElement("div");
	td.appendChild(div);
	div.innerHTML = "&nbsp;";
	div.style.fontSize = "4px";
	div.style.width = "4px";
	return td;
};

TabPanel.prototype.createRightSpaceCell = function(tr) {
	var td = document.createElement("td");
	tr.insertBefore(td, tr.cells[tr.cells.length-1]);
	td.style.borderBottomStyle = "solid";
	td.style.borderBottomWidth = "1px";
	td.style.borderBottomColor = "black";
	td.style.cursor = "default";
	var div = document.createElement("div");
	td.appendChild(div);
	div.innerHTML = "&nbsp;";
	div.style.fontSize = "2px";
	div.style.width = "2px";
	return td;
};

TabPanel.prototype.createButtonCell = function(tr, pageName) {
	var td = document.createElement("td");
	tr.insertBefore(td, tr.cells[tr.cells.length-2]);
	td.style.cursor = "pointer";
	td.style.borderStyle = "solid";
	td.style.borderWidth = "1px";
	td.style.borderColor = "black";
	td.style.paddingLeft = "2px";
	td.style.paddingRight = "2px";
	td.innerHTML = pageName;
	td.setAttribute(ATTR_PAGE_NAME, pageName);
	return td;
};

TabPanel.prototype.createButtonRow = function(tbody) {
	var tr = document.createElement("tr");
	tbody.appendChild(tr);
	this.createToolbarCell(tr);
	return tr;
};

TabPanel.prototype.createToolbarCell = function(tr) {
	var td = document.createElement("td");
	tr.appendChild(td);
	td.style.width = "100%";
	td.style.borderBottomStyle = "solid";
	td.style.borderBottomWidth = "1px";
	td.style.borderBottomColor = "black";
	td.innerHTML = "&nbsp;";
	return td;
};

var ATTR_PAGE_NAME = "__pageName";
