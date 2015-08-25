
var RecordForm = function(container, categoryId) {
	this.categoryId = categoryId;
	RecordForm.superclass.constructor.call(this, container, "html/RecordForm.html");
	var date = jsloader.resolve("scarlett.RecordService").getCurrentDate();
	this.elemDate.value = Domutils.formatDate(date);
	this.sign = -1;
	var CATEGORY_LIST = jsloader.resolve("scarlett.CATEGORY_LIST");
	for ( var i = 0; i < CATEGORY_LIST.length; i++ ) {
		var CATEGORY = CATEGORY_LIST[i];
		var option = document.createElement("option");
		option.value = CATEGORY.id;
		option.innerHTML = CATEGORY.name;
		this.elemCategory.appendChild(option);
	}
	this.elemMinus.checked = true;
	this.elemCategory.value = categoryId;
};

Lang.extend(RecordForm, Component);

RecordForm.prototype.elemAdd_click_handler = function() {
	if ( /^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/.test(this.elemDate.value) ) {
		this.elemDateLabel.style.color = "";
	} else {
		this.elemDateLabel.style.color = "red";
		return;
	}
	if ( this.elemDesc.value.length > 8 ) {
		this.elemDescLabel.style.color = "red";
		return;
	} else if ( this.elemDesc.value.length < 1 ) {
		this.elemDescLabel.style.color = "red";
		return;
	} else {
		this.elemDescLabel.style.color = "";
	}
	if ( this.sign == 1 ) {
		var elemAmount = this.elemIncome;
		var elemAmountLabel = this.elemIncomeLabel;
	} else if ( this.sign == -1 ) {
		var elemAmount = this.elemOutcome;
		var elemAmountLabel = this.elemOutcomeLabel;
	} else {
		throw new Error();
	}
	this.elemIncomeLabel.style.color = "";
	this.elemOutcomeLabel.style.color = "";
	if ( /^[0-9]{1,4}(.[0-9]{2})?$/.test(elemAmount.value) ) {
		elemAmountLabel.style.color = "";
	} else {
		elemAmountLabel.style.color = "red";
		return;
	}
	if ( /^$/.test(this.elemCategory.value) ) {
		this.elemCategoryLabel.style.color = "red";
		return;
	} else {
		this.elemCategoryLabel.style.color = "";
	}
		
	var Record = jsloader.resolve("scarlett.Record");
	var record = new Record(
		this.elemDate.value,
		this.elemDesc.value,
		elemAmount.value*100,
		this.sign,
		this.elemCategory.value
	);
	var recordService = jsloader.resolve("scarlett.RecordService");
	recordService.createRecord(record);
	this.destroy();
};

RecordForm.prototype.elemClose_click_handler = function() {
	this.destroy();
};

RecordForm.prototype.elemIncome_focus_handler = function() {
	this.setSign(1);
};

RecordForm.prototype.elemOutcome_focus_handler = function() {
	this.setSign(-1);
};

RecordForm.prototype.elemPlus_change_handler = function() {
	this.setSign(1);
};

RecordForm.prototype.elemMinus_change_handler = function() {
	this.setSign(-1);
};

RecordForm.prototype.setSign = function(sign) {
	if ( sign == 1 ) {
		this.elemOutcome.value = "";
		this.elemPlus.checked = true;
		this.elemIncome.focus();
		this.sign = 1;
	} else if ( sign == -1 ) {
		this.elemIncome.value = "";
		this.elemMinus.checked = true;
		this.elemOutcome.focus();
		this.sign = -1;
	} else {
		throw new Error();
	}
};
