
var Calendar = jsloader.resolve("tarah.Calendar");

var DateNavigator = function(container) {
	DateNavigator.superclass.constructor.call(this, container, fullName);
	this.onChange = new CustomEvent();
	this.setDate(new Date());
};

Lang.extend(DateNavigator, Module);

DateNavigator.prototype.elemPrevButton_click_handler = function() {
	var date = new Date(this.date.getTime());
	date.setDate(this.date.getDate()-1);
	this.setDate(date);
};

DateNavigator.prototype.elemNextButton_click_handler = function() {
	var date = new Date(this.date.getTime());
	date.setDate(this.date.getDate()+1);
	this.setDate(date);
};

DateNavigator.prototype.elemTodayButton_click_handler = function() {
	this.setDate(new Date());
};

DateNavigator.prototype.elemShowCalendarButton_click_handler = function() {
	this.children.calendar = new Calendar(document.body, this.date);
	this.setCalendarPosition();
	this.children.calendar.onOkay.addListener(function(newDate) {
		this.removeChild("calendar");
		this.setDate(newDate);
	}, this);
	this.children.calendar.onCancel.addListener(function() {
		this.removeChild("calendar");
		this.refreshDateView();
	}, this);
	this.refreshDateView();
};

DateNavigator.prototype.setCalendarPosition = function() {
	var position = Domutils.getPositionedOffset(this.elemShowCalendarButton);
	var dim = Domutils.getDimension(this.elemShowCalendarButton);
	this.children.calendar.element.style.left = position.left + "px";
	this.children.calendar.element.style.top = (position.top+dim.height+3) + "px";
};

DateNavigator.prototype.setDate = function(date) {
	if ( 
		this.date &&
		this.date.getFullYear() == date.getFullYear() &&
		this.date.getMonth() == date.getMonth() &&
		this.date.getDate() == date.getDate()
		 ) {
		return;
	}
	this.date = date;
	this.refreshDateView();
	this.onChange.fire(this.date);
};

DateNavigator.prototype.refreshDateView = function() {
	var year = this.date.getFullYear();
	var month = this.date.getMonth();
	var day = this.date.getDate();
	this.elemYear.innerHTML = year;
	this.elemMonth.innerHTML = month + 1;
	this.elemDay.innerHTML = day;
	var today = new Date();
	if ( this.children.calendar ) {
		this.elemPrevButton.disabled = true;
		this.elemNextButton.disabled = true;
		this.elemTodayButton.disabled = true;
		this.elemShowCalendarButton.disabled = true;
	} else if ( today.getFullYear() == year && today.getMonth() == month && today.getDate() == day ) {		
		this.elemPrevButton.disabled = false;
		this.elemNextButton.disabled = false;
		this.elemTodayButton.disabled = true;
		this.elemShowCalendarButton.disabled = false;
	} else {
		this.elemPrevButton.disabled = false;
		this.elemNextButton.disabled = false;
		this.elemTodayButton.disabled = false;
		this.elemShowCalendarButton.disabled = false;
	}
};
