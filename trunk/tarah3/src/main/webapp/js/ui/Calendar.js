
var CalendarBase = jsloader.resolve("ui.CalendarBase");
var CalendarService = jsloader.resolve("util.CalendarService");

var Calendar = function(container) {
	Calendar.superclass.constructor.call(this, container);
	this.setCalendarService(new CalendarService);
	this.refresh();
};

lang.extend(Calendar, CalendarBase);
