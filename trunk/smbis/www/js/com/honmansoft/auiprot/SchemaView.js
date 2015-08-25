
var Module = jsloader.resolve("com.honmansoft.ajax.Module");

var SchemaView = function(element, schemaModel) {
	this.schemaModel = schemaModel;
	SchemaView.superclass.constructor.call(this, element);	
	this.elemTypes.innerHTML = "";
	this.initSelect(this.schemaModel.getTypes(), this.elemTypes);
	this.elemProperties.innerHTML = "";
	this.initSelect(this.schemaModel.getProperties(), this.elemProperties);
};

lang.extend(SchemaView, Module);

SchemaView.prototype.initSelect = function(values, select) {
	for ( var i = 0; i < values.length; i++ ) {
		var option = document.createElement("option");
		option.value = values[i];
		option.innerHTML = values[i];
		select.appendChild(option);
	}
};

SchemaView.prototype.elemCreateFlushPoint_click_handler = function(ev) {
	if ( !this.elemTypes.value || !this.elemProperties.value )
		return;
	var flushPoint = this.elemTypes.value + "." + this.elemProperties.value;
	this.schemaModel.createFlushPoint(flushPoint);
	this.refresh();
};

SchemaView.prototype.elemRemoveFlushPoint_click_handler = function(ev) {
	if ( !this.elemFlushPoints.value )
		return;
	this.schemaModel.removeFlushPoint(this.elemFlushPoints.value);
	this.refresh();
};

SchemaView.prototype.refresh = function() {
	this.elemFlushPoints.innerHTML = "";
	this.initSelect(this.schemaModel.getFlushPoints(), this.elemFlushPoints);
};

SchemaView.prototype.getTemplate = function() {
	return "<SELECT hms-id='types' style='width: 10em' MULTIPLE>\
	</SELECT>\
	<SELECT hms-id='properties' style='width: 10em' MULTIPLE>\
	</SELECT>\
	<SELECT hms-id='flushPoints' style='width: 10em' MULTIPLE>\
	</SELECT>\
	<input hms-id='createFlushPoint' type='button' value='Create Flush Point'/>\
	<input hms-id='removeFlushPoint' type='button' value='Remove Flush Point'/>";
};
