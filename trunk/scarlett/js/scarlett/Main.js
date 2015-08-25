
var Main = function(container) {
	Main.superclass.constructor.call(this, container, "html/Main.html");
	this.currentCategoryId = null;
	this.elistCategory = {};
	this.sheet = null;
	this.window_resize_handler();
	var CATEGORY_LIST = jsloader.resolve("scarlett.CATEGORY_LIST");
	for ( var i = 0; i < CATEGORY_LIST.length; i++ ) {
		var button = document.createElement("input");
		button.type = "button";
		button.setAttribute("categoryId", CATEGORY_LIST[i].id);
		button.value = CATEGORY_LIST[i].name;
		button.style.height = "40px";
		this.elemCategoryBanner.appendChild(button);
		this.elistCategory[CATEGORY_LIST[i].id] = button;
	}
	this.setCurrentCategoryId("small");
};

Lang.extend(Main, Component);

Main.prototype.getCurrentCategoryId= function() {
	return this.currentCategoryId;
};

Main.prototype.setCurrentCategoryId = function(id) {
	if ( this.currentCategoryId == id ) {
		return;
	}
	if ( this.currentCategoryId ) {
		this.passivateCategory(this.currentCategoryId);
	}
	this.currentCategoryId = id;
	this.activateCategory(this.currentCategoryId);
};

Main.prototype.activateCategory = function(id) {
	this.elistCategory[id].disabled = true;
	var Sheet = jsloader.resolve("scarlett.Sheet");
	this.sheet = new Sheet(this.elemSheetSlot, id);
};

Main.prototype.passivateCategory = function(id) {
	this.elistCategory[id].disabled = false;
	this.sheet.destroy();
};

Main.prototype.elemCategoryBanner_click_handler = function(ev) {
	if ( ev.target.tagName != "INPUT" ) {
		return;
	}
	for ( var prop in this.elistCategory ) {
		if ( ev.target == this.elistCategory[prop] ) {
			this.setCurrentCategoryId(prop);
			break;
		}
	}
};

Main.prototype.elemNewRecord_click_handler = function(ev) {
	var RecordFormDialog = Domutils.makeDialog(jsloader.resolve("scarlett.RecordForm"));
	new RecordFormDialog(this.getCurrentCategoryId());
};

Main.prototype.window_resize_handler = function(ev) {
	var viewport = Domutils.getViewport();
	//
	var elementMargin = 5;
	var elementWidth = viewport.width - elementMargin * 2;
	var elementHeight = viewport.height - elementMargin * 2;
	var sideBarWidth = 100;
	var sheetSlotWidth = elementWidth-sideBarWidth;
	if ( sheetSlotWidth < 400 ) {
		sheetSlotWidth = 400;
	}
	//
	this.element.style.left = elementMargin + "px";
	this.element.style.top = elementMargin + "px";
	this.element.style.width = elementWidth + "px";
	this.element.style.height = elementHeight + "px";
	//
	this.elemCategoryBanner.style.width = "100%";
	this.elemCategoryBanner.style.height = "40px";
	//
	this.elemSheetSlot.style.top = "40px";
	this.elemSheetSlot.style.width = sheetSlotWidth + "px";
	//
	this.elemSideBar.style.top = "40px";
	this.elemSideBar.style.left = sheetSlotWidth + "px";
	this.elemSideBar.style.width = sideBarWidth + "px";
};
