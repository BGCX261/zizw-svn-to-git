
var Module = jsloader.resolve("com.honmansoft.ajax.Module");

var InstanceView = function(element, instanceModel) {
	this.instanceModel = instanceModel;
	this.instanceModel.view = this;
	InstanceView.superclass.constructor.call(this, element);	
	this.initSelect(this.instanceModel.getNodes(), this.elemNodes);
	this.initSelect(this.instanceModel.schemaModel.getProperties(), this.elemPropertyName);
	this.refresh();
};

lang.extend(InstanceView, Module);

InstanceView.prototype.getTemplate = function() {	
	return "<SELECT hms-id='nodes' style='width: 10em' MULTIPLE>\
	</SELECT>\
	<SELECT hms-id='properties' style='width: 10em' MULTIPLE>\
	</SELECT>\
	<SELECT hms-id='children' style='width: 10em' MULTIPLE>\
	</SELECT><br/>\
	<SELECT hms-id='propertyName' style='width: 10em'>\
	</SELECT>\
	<input hms-id='propertyValue' style='width: 10em'/>\
	<input hms-id='change' type='button' value='Change'/><br/>\
	<input hms-id='complete' type='button'/>";
};

InstanceView.prototype.disable = function(disable) {
	if ( disable ) {
		this.elemChange.disabled = true;
		this.elemComplete.disabled = true;
	} else {
		this.elemChange.disabled = false;
		this.elemComplete.disabled = false;
	}
};

InstanceView.prototype.elemChange_click_handler = function(ev) {
	if ( !this.elemNodes.value )
		return;
	var nodeId = this.getCurrentNodeId();
	var action = {
		actionType: "change",
		nodeId: nodeId,
		propertyName: this.elemPropertyName.value,
		propertyValue: this.elemPropertyValue.value
	};
	this.instanceModel.execute(action, true);
};

InstanceView.prototype.elemComplete_click_handler = function(ev) {
	this.instanceModel.request = null;
	this.refresh();
	this.instanceModel.flush();
};

InstanceView.prototype.elemNodes_change_handler = function(ev) {
	this.refresh();
};

InstanceView.prototype.elemProperties_change_handler = function(ev) {
	var propertyName = ev.target.value.substring(0, ev.target.value.indexOf('='));
	this.elemPropertyName.value = propertyName;
	this.elemPropertyName_change_handler();
};

InstanceView.prototype.elemPropertyName_change_handler = function(ev) {
	if ( !this.elemNodes.value )
		return;
	var propertyName = this.elemPropertyName.value;
	var propertyValue = this.instanceModel.getProperty(this.getCurrentNodeId(), propertyName);
	if ( "undefined" == typeof propertyValue )
		this.elemPropertyValue.value = "";
	else
		this.elemPropertyValue.value = propertyValue;
};

InstanceView.prototype.refresh = function() {
	if ( this.instanceModel.isClient ) {
		this.elemComplete.style.display = "none";
	} else if ( this.instanceModel.getRequest() ) {
		this.disable(false);
		this.elemComplete.value = this.instanceModel.getRequest();
	} else {
		this.disable(true);
		this.elemComplete.value = "No coming request.";
	}
	if ( !this.elemNodes.value )
		return;
	this.elemProperties.innerHTML = "";
	this.initSelect(this.instanceModel.getProperties(this.getCurrentNodeId()), this.elemProperties);
};

InstanceView.prototype.getCurrentNodeId = function() {
	return this.elemNodes.value.match(/\[([0-9]+)\]/)[1];
};

InstanceView.prototype.initSelect = function(values, select) {
	for ( var i = 0; i < values.length; i++ ) {
		var option = document.createElement("option");
		option.value = values[i];
		option.innerHTML = values[i];
		select.appendChild(option);
	}
};
