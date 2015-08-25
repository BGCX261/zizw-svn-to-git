
var ViewController = function(container) {
	ViewController.superclass.constructor.call(this, container, template);
};

Lang.extend(ViewController, Component);

ViewController.prototype.elemSchemas_click_handler = function(ev) {
	if ( this.elemSchemas.checked ) {
		var View = jsloader.resolve("even.View");
		this.schemas = new View(
			jsloader.resolve("even.Schemas"), 
			document.body,
			{width: 200, height: 300});
	} else {
		this.schemas.destroy();
		this.schemas = null;
	}
};

var template = "<div>\
	<span><input hmsid='schemas' type='checkbox'/>Schemas</span>\
</div>";
