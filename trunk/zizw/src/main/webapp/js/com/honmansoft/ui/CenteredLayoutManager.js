
var CenteredLayoutManager = function (container, id, beanId) {
	this.table = document.createElement("table");
	this.table.style.width = "100%";
	this.table.style.height = "100%";
	this.table.border = 1;
	document.body.appendChild(this.table);
	//
	this.tbody = document.createElement("tbody");
	this.table.appendChild(this.tbody);
	//
	this.tr = document.createElement("tr");
	this.tbody.appendChild(this.tr);
	//
	this.td = document.createElement("td");
	this.tr.appendChild(this.td);
	this.td.align = "center";
	this.td.innerHTML = "fds";
};

