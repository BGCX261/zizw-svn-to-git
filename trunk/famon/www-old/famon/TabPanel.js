
var Module = jsloader.resolve("wajax.core.Module");

var TabPanel = function(element, parentModule) {
	TabPanel.superclass.constructor.call(this, element, parentModule);
	this.currentTabPage = null;
	this.blankTabPage = new BlankTabPage("Blank", null, this.elemTab, this.elemPage);
	this.setCurrentTabPage("Blank");	
	this.tabPages = [];
};

lang.extend(TabPanel, Module);

TabPanel.prototype.getTemplate = function() {
	return "<table style='width: 100%; height: 100%; position: relative;' cellpading='0' cellspacing='0'>\
		<tr hmsid='tabList' style='height: 1em'>\
			<td hmsid='tabIndent' style='cursor: default'>&nbsp;&nbsp;&nbsp;&nbsp;\
			</td>\
			<td hmsid='tab' style='cursor: default'>Blank\
			</td>\
			<td hmsid='tabTrailing' width='100%' style='cursor: default'>&nbsp;\
			</td>\
		</tr>\
		<tr>\
			<td hmsid='pageHolder' colspan='7'>\
				<div hmsid='page' style='width: 100%; height: 100%; position: relative;'></div>\
			</td>\
		</tr>\
	</table>";
};

TabPanel.prototype.setCurrentTabPage = function(id) {
	var tabPage = this.getTabPage(id);
	if ( !tabPage )
		return;
	if ( this.currentTabPage ) {
		this.currentTabPage.deactivate();
	}
	this.currentTabPage = tabPage;
	this.currentTabPage.activate();
};

TabPanel.prototype.appendTabPage = function(id, name) {
	var isBlank = 0 == this.tabPages.length;
	if ( isBlank )
		this.blankTabPage.hide();
	var tabPage = new TabPage(id, name);	
	tabPage.appendTo(this.elemTabList, this.elemPageHolder, !isBlank);
	if ( isBlank )
		tabPage.activate();
	this.tabPages.push(tabPage);
};

TabPanel.prototype.getTabPage = function(id) {
	if ( this.blankTabPage.id == id )
		return this.blankTabPage;
	for ( var i = 0; i < this.tabPages.length; i++ ) {
		if ( this.tabPages[i].id == id )
			return this.tabPages[i];
	}
	return null;
};

var TabPage = function(id, name) {
	this.id = id;
	this.name = name || id;
	this.createTab();
	this.createPage();
};

TabPage.prototype.appendTo = function(tabList, pageHolder, needCreateTabSpace) {
	if ( needCreateTabSpace ) {
		this.createTabSpace();
		tabList.insertBefore(this.tabSpace, tabList.lastChild);
	}
	tabList.insertBefore(this.tab, tabList.lastChild);
	pageHolder.appendChild(this.page);
};

TabPage.prototype.createTabSpace = function() {
	var td = document.createElement("td");
	td.innerHTML = "&nbsp;";
	td.className = "famon_TabPanel_tabSpace";
	td.style.cursor = "default";
	this.tabSpace = td;
};

TabPage.prototype.createTab = function() {
	var td = null;
	td = document.createElement("td");
	td.innerHTML = this.name;
	td.className = "famon_TabPanel_tab";
	td.style.cursor = "pointer";
	this.tab = td;
};

TabPage.prototype.createPage = function() {
	var div = document.createElement("div");
	div.innerHTML = name;
	div.style.position = "relative";
	div.style.left = "0px";
	div.style.top = "0px";
	div.style.width = "100%";
	div.style.height = "100%";
	div.style.display = "none";
	div.className = "famon_TabPanel_page";
	this.page = div;
};

TabPage.prototype.activate = function() {
	domutils.replaceClassName(this.tab, "famon_TabPanel_tabSelected", "famon_TabPanel_tab");
	this.page.style.display = "block";
};

TabPage.prototype.deactivate = function() {
	domutils.replaceClassName(this.tab, "famon_TabPanel_tab", "famon_TabPanel_tabSelected");
	this.page.style.display = "none";
};

TabPage.prototype.show = function() {
	this.tab.style.display = "";
	this.page.style.display = "";
};

TabPage.prototype.hide = function() {
	this.tab.style.display = "none";
	this.page.style.display = "none";
};

var BlankTabPage = function(id, name, tab, page) {
	this.tab = tab;
	this.page = page;
	BlankTabPage.superclass.constructor.call(this, id, name);
};

lang.extend(BlankTabPage, TabPage);

BlankTabPage.prototype.createTab = function() {};

BlankTabPage.prototype.createPage = function() {};

/* 
TabPanel.prototype.elemTabList_click_handler = function(ev) {
	var target = ev.target;
	if ( !target.getAttribute("_tab_") )
		return;
	if ( target.getAttribute("_tab_id") == this.currentId )
		return;
	this.setCurrentPage(target.getAttribute("_tab_id"));
};

TabPanel.prototype.isBlank = function() {
	return "none" != this.elemTab.style.display;
};

TabPanel.prototype.addPage = function(id, name) {
	name = name || id;
	var isBlank = this.isBlank();
	if ( isBlank ) {
		this.elemTab.style.display = "none";
	}
	var td = null;
	if ( !isBlank ) {
		td = document.createElement("td");
		this.elemTabList.insertBefore(td, this.elemTabTrailing);
		td.innerHTML = "&nbsp;";
		td.className = "famon_TabPanel_tabSpace";
		td.style.cursor = "default";
	}
	td = document.createElement("td");
	this.elemTabList.insertBefore(td, this.elemTabTrailing);
	td.innerHTML = name;
	td.className = "famon_TabPanel_tab";
	td.style.cursor = "pointer";
	td.setAttribute("_tab_", "true");
	td.setAttribute("_tab_id", id);
	//
	var div = document.createElement("div");
	div.innerHTML = name;
	div.style.position = "relative";
	div.style.left = "0px";
	div.style.top = "0px";
	div.style.width = "100%";
	div.style.height = "100%";
	div.style.display = "none";
	div.setAttribute("_tab_", "true");
	div.setAttribute("_tab_id", id);
	this.elemPageHolder.appendChild(div);
};

TabPanel.prototype.getTab = function(id) {
	var tdList = this.elemTabList.getElementsByTagName("td");
	for ( var i = 0; i < tdList.length; i++ ) {
		var td = tdList[i];
		if ( !td.getAttribute("_tab_") )
			continue;
		if ( td.getAttribute("_tab_id") == id )
			return td;
	}
	return null;
};

TabPanel.prototype.getPage = function(id) {
	var divList = this.elemPageHolder.getElementsByTagName("div");
	for ( var i = 0; i < divList.length; i++ ) {
		var div = divList[i];
		if ( !div.getAttribute("_tab_") )
			continue;
		if ( div.getAttribute("_tab_id") == id )
			return div;
	}
	return null;
};

TabPanel.prototype.setCurrentPage = function(id) {
	var td = this.getTab(id);
	var div = this.getPage(id);
	domutils.replaceClassName(td, "famon_TabPanel_tabSelected", "famon_TabPanel_tab");
	div.style.display = "block";
	if ( this.currentId ) {		
		domutils.replaceClassName(this.getTab(this.currentId), "famon_TabPanel_tab", "famon_TabPanel_tabSelected");
		this.getPage(this.currentId).style.display = "none";
	}
	this.currentId = id;	
};

*/