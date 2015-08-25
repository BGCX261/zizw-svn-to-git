
var Schemas = function(container) {
	Schemas.superclass.constructor.call(this, container, template);
	jsloader.makeRequest("com.hms.even.services.GetSchemas", null, this.init, this);
	this.setLoading();
};

Lang.extend(Schemas, Component);

Schemas.prototype.setLoading = function() {
	var tr = document.createElement("tr");
	this.elemSchemas.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = "<img src='img/loading.gif'/>";
};

Schemas.prototype.clearLoading = function() {
	this.elemSchemas.removeChild(this.elemSchemas.rows[0]);
};

Schemas.prototype.init = function(response) {
	this.clearLoading();
	var schemas = response.schemas;
	for ( var i = 0; i < schemas.length; i++ ) {
		this.addSchema(schemas[i]);
	}
	this.onresize.fire();
};

Schemas.prototype.elemSchemas_click_handler = function(ev) {
	if ( ev.target.getAttribute("isExpander") == "yes" ) {
		var expanded = ev.target.getAttribute("expanded");
		if ( expanded == "yes" ) {
			this.setExpanded(ev.target, false);
		} else if ( expanded == "no" ) {
			this.setExpanded(ev.target, true);
		} else {
			;
		}
	}
};

Schemas.prototype.removeSchema = function(schema) {
	var rows = this.elemSchemas.rows;
	for ( var i = 0; i < rows.length; i++ ) {
		var row = rows[i];
		if ( row.getAttribute("schema") == schema ) {
			this.elemSchemas.removeChild(row);
			break;
		}
	}
};

Schemas.prototype.addSchema = function(schema) {
	var tr = document.createElement("tr");
	tr.setAttribute("schema", schema);
	this.elemSchemas.appendChild(tr);
	var td = document.createElement("td");
	tr.appendChild(td);
	this.setExpanded(td, false);
	td.style.cursor = "pointer";
	td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = "<span style='cursor: default'>[S]</span>" + schema;
	td.noWrap = true;
};

Schemas.prototype.setExpanded = function(td, expanded) {
	td.setAttribute("isExpander", "yes");
	if ( expanded ) {
		td.setAttribute("expanded", "yes");
		td.innerHTML = "V";
	} else {
		td.setAttribute("expanded", "no");
		td.innerHTML = ">";
	}
};

var template = "<table style='position: absolute'><tbody hmsid='schemas'>\
</tbody></table>";
