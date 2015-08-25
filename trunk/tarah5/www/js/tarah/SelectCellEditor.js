
var SelectCellEditor = function(container, model) {
	SelectCellEditor.superclass.constructor.call(this);
	this.container = container;
	this.model = [
		{ realValue: "", displayValue: "" }
	];
	if ( model )
		for ( var i = 0; i < model.length; i++ ) {
			this.model.push({ realValue: model[i].realValue, displayValue: model[i].displayValue });
		}
	this.container.innerHTML = "";
	this.element = Domutils.createElem(this.container, "SELECT");
	this.element.style.width = "100%";
	for ( var i = 0; i < this.model.length; i++ ) {
		var option = Domutils.createElem(this.element, "OPTION");
		option.value = this.model[i].realValue;
		option.innerHTML = this.model[i].displayValue;
	}
	var value = this.container.getAttribute("__value");
	if ( value ) {
		this.element.value = value;
	}
};

Lang.extend(SelectCellEditor, Module);

SelectCellEditor.prototype.beforeDestroy = function() {
	this.container.setAttribute("__value", this.element.value);
};
