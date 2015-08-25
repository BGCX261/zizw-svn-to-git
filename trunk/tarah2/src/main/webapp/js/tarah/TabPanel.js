
var TabPanelBase = jsloader.resolve("tarah.TabPanelBase");

var TabPanel = function(container) {
	TabPanel.superclass.constructor.call(this, container);
};

lang.extend(TabPanel, TabPanelBase);

TabPanel.prototype.add = function(name) {
	if ( this.currentPageName ) {
		this.createMiddleSpace();
		this.incColSpan();
	} else {
		this.clearPageSlot();
		this.createLeftSpace();
		this.incColSpan();
		this.createRightSpace();
		this.incColSpan();
	}
	var button = this.createButton(name);
	this.incColSpan();
	this.createPage(name);
	this.activate(name);
	//
	this.eventHelper.attachListener(button, "click", this.onClickButton, this);
};

TabPanel.prototype.onClickButton = function(ev) {
	var name = ev.target.innerHTML;
	this.activate(name);
};

TabPanel.prototype.activate = function(name) {
	if ( this.currentPageName ) {
		this.unselectButton(this.currentPageName);
		this.unselectPage(this.currentPageName);
	}
	this.selectButton(name);
	this.selectPage(name);
	this.currentPageName = name;
};

TabPanel.prototype.afterInit = function() {
	TabPanel.superclass.afterInit.call(this);	
	this.currentPageName = null;
};
