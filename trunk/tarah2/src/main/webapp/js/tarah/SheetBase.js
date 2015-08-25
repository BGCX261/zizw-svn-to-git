
var SheetBase = function(container) {
	SheetBase.superclass.constructor.call(this, container);
};

lang.extend(SheetBase, Module);

SheetBase.prototype.elemGridSlot_scroll_handler = function() {
	this.elemColHeaderSlot.scrollLeft = this.elemGridSlot.scrollLeft;	
	this.elemRowHeaderSlot.scrollTop = this.elemGridSlot.scrollTop;
};

SheetBase.prototype.elemColHeaderSlot_mouseover_handler = function(ev) {
	var target = ev.target;
	if ( target.tagName && "TD" == target.tagName ) {
		var offset = domutils.getCumulativeOffset(target);
		var offsetX = ev.clientX - offset.left + this.elemColHeaderSlot.scrollLeft;
		if ( 0 < offsetX && offsetX <= 4 ) {
			this.cellToResize = target.previousSibling;
		} else if ( target.offsetWidth - 4  <= offsetX && offsetX < target.offsetWidth ) {
			this.cellToResize = target;
		} else {
			this.cellToResize = null;
		}		
		if ( this.cellToResize && "TD" == this.cellToResize.tagName ) {
			document.body.style.cursor = "e-resize";
			this.beforeResize = true;
		}
	}
};

SheetBase.prototype.elemColHeaderSlot_mouseout_handler = function(ev) {
	var target = ev.target;
	if ( target.tagName && "TD" == target.tagName ) {
		var offset = domutils.getCumulativeOffset(target);
		var offsetX = ev.clientX - offset.left;
		if ( !this.resizeTask )
			document.body.style.cursor = "default";
		this.beforeResize = false;
	}
};

SheetBase.prototype.elemColHeaderSlot_mousedown_handler = function(ev) {
	if ( !this.beforeResize )
		return;
	if ( this.resizeTask )
		return;
	this.resizeTask = new ResizeTask(this, this.cellToResize, ev);
};

SheetBase.prototype.appendColHeaderCols = function(count) {
	var rows = this.elemColHeader.rows;
	for ( var i = 0; i < rows.length; i++ ) {
		for ( var j = 0; j < count; j++ ) {
			var cell = document.createElement("td");
			var lastCell = rows[i].lastChild;
			while ( "TD" !=lastCell.tagName )
				lastCell = lastCell.previousSibling;
			rows[i].insertBefore(cell, lastCell);
			cell.className = "sheet-colHeaderCell";
			cell.noWrap = true;
			cell.innerHTML = "<div class='sheet-colHeaderCellDiv'></div>";
			this.colCount++;
		}
	}
};

SheetBase.prototype.appendGridCols = function(count) {
	var rows = this.elemGrid.rows;
	for ( var i = 0; i < rows.length; i++ ) {
		for ( var j = 0; j < count; j++ ) {
			var cell = document.createElement("td");
			rows[i].appendChild(cell);
			cell.className = "sheet-gridCell";
			cell.noWrap = true;
			cell.innerHTML = "<div class='sheet-gridCellDiv'></div>";
		}
	}
};
	
SheetBase.prototype.appendRowHeaderRows = function(count) {
	for ( var i = 0; i < count; i++ ) {
		var row = document.createElement("tr");
		this.elemRowHeader.appendChild(row);
		row.className = "sheet-rowHeaderRow";
		var cell = document.createElement("td");
		row.appendChild(cell);
		cell.className = "sheet-rowHeaderCell";
		cell.noWrap = true;
		this.rowCount++;
		cell.innerHTML = "<div class='sheet-rowHeaderCellDiv'>" + this.rowCount + "</div>";
		
	}
};

SheetBase.prototype.appendGridRows = function(count) {
	var cellCount = this.elemGrid.rows[0].cells.length;
	for ( var i = 0; i < count; i++ ) {
		var row = document.createElement("tr");
		this.elemGrid.appendChild(row);
		row.className = "sheet-gridRow";
		for ( var j = 0; j < cellCount; j++ ) {
			var cell = document.createElement("td");
			row.appendChild(cell);
			cell.className = "sheet-gridCell";
			cell.noWrap = true;
			cell.innerHTML = "<div class='sheet-gridCellDiv'></div>";
		}
	}
};

SheetBase.prototype.resetCornerSlot = function() {
	if ( domutils.isIE() ) {
		this.elemCornerSlot.style.width = (this.elemCornerSlot.offsetWidth) + "px";
		this.elemCornerSlot.style.height = (this.elemCornerSlot.offsetHeight) + "px";
	} else {
		this.elemCornerSlot.style.width = (this.elemCornerSlot.offsetWidth-2) + "px";
		this.elemCornerSlot.style.height = (this.elemCornerSlot.offsetHeight-2) + "px";
	}
}

SheetBase.prototype.resetColHeaderSlot = function() {
	var left = this.elemCornerSlot.offsetWidth;
	var height = this.elemCornerSlot.offsetHeight;
	var width = this.element.offsetWidth - this.elemCornerSlot.offsetWidth - this.elemGridSlot.offsetWidth + this.elemGridSlot.clientWidth;
	this.elemColHeaderSlot.style.left = left + "px";
	this.elemColHeaderSlot.style.width = width + "px";
	this.elemColHeaderSlot.style.height = height + "px";
};

SheetBase.prototype.resetRowHeaderSlot = function() {
	var top = this.elemCornerSlot.offsetHeight;
	var width = this.elemCornerSlot.offsetWidth;
	var height = this.element.offsetHeight  - this.elemCornerSlot.offsetHeight - this.elemGridSlot.offsetHeight + this.elemGridSlot.clientHeight;
	this.elemRowHeaderSlot.style.top = top + "px";
	this.elemRowHeaderSlot.style.width = width + "px";
	this.elemRowHeaderSlot.style.height = height + "px";
};

SheetBase.prototype.resetByScrollbar = function() {
	var width = this.elemColHeaderSlot.offsetWidth - this.elemGridSlot.offsetWidth + this.elemGridSlot.clientWidth;
	var height = this.elemRowHeaderSlot.offsetHeight - this.elemGridSlot.offsetHeight + this.elemGridSlot.clientHeight;
	this.elemColHeaderSlot.style.width = width + "px";
	this.elemRowHeaderSlot.style.height = height + "px";
};

SheetBase.prototype.resetGridSlot = function() {
	var top = this.elemCornerSlot.offsetHeight;
	var left = this.elemCornerSlot.offsetWidth;
	var width = this.element.offsetWidth - this.elemCornerSlot.offsetWidth;
	var height = this.element.offsetHeight  - this.elemCornerSlot.offsetHeight;
	this.elemGridSlot.style.top = top + "px";
	this.elemGridSlot.style.left = left + "px";
	this.elemGridSlot.style.width = width + "px";
	this.elemGridSlot.style.height = height + "px";
};

/****************************/

/*****************************************************************
 

                         sheet.width    sheet.height    cornerSlot.width    cornerSlot.height
colHeaderSlot.left:      -              -               X                   -
colHeaderSlot.width:     X              -               X                   -
colHeaderSlot.height:    -              -               -                   X
colHeaderRow.height:     -              -               -                   X

gridSlot.top:            -              -               -                   X
gridSlot.left:           -              -               X                   -
gridSlot.width:          X              -               X                   -
gridSlot.height:         -              X               -                   X

rowHeaderSlot:top:       -              -               -                   X
rowHeaderSlot:height:    -              X               -                   X
rowHeaderSlot:width:     -              -               X                   -
rowHeaderCell.width:     -              -               X                   -

 

	
******************************************************************/

var ResizeTask = function(sheetBase, cellToResize, ev) {
	this.sheetBase = sheetBase;
	this.cellToResize = cellToResize;
	this.originalWidth = this.cellToResize.offsetWidth;
	this.originalX = ev.clientX;
	this.originalY = ev.clientY;
	//
	this.eventHelper = new EventHelper();
	this.eventHelper.attachListener(document, "mouseup", this.document_mouseup_handler, this);
	this.eventHelper.attachListener(document, "mousemove", this.document_mousemove_handler, this);
	if ( domutils.isIE() )
		this.eventHelper.attachListener(document, "selectstart", this.document_select_handler, this);	
	//
	this.colIndex = -1;
	for ( var i = 0; i < this.cellToResize.parentNode.cells.length; i++ ) {
		if ( this.cellToResize.parentNode.cells[i] == this.cellToResize ) {
			this.colIndex = i;
			break;
		}
	}
	this.cellToResize2 = this.sheetBase.elemGrid.rows[0].cells[this.colIndex]
	this.cellToResize.firstChild.innerHTML = "resizing: " + this.colIndex;
};

ResizeTask.prototype.document_mouseup_handler = function(ev) {
	this.cellToResize.firstChild.innerHTML = "&nbsp;";
	this.destroy();
};

ResizeTask.prototype.document_mousemove_handler = function(ev) {
	var deltaX = ev.clientX - this.originalX;
	var newWidth = this.originalWidth + deltaX;
	if ( newWidth > SheetBase.DEFAULT_CELL_WIDTH ) {
		this.cellToResize.style.width = newWidth + "px";
		this.cellToResize2.style.width = newWidth + "px";
	}
};

ResizeTask.prototype.document_select_handler = function(ev) {
	if ( domutils.isIE() )
		domutils.stopEvent(ev);
};

ResizeTask.prototype.destroy = function() {
	document.body.style.cursor = "default";
	this.sheetBase.resizeTask = null;
	this.eventHelper.destroy();
};

SheetBase.DEFAULT_CELL_WIDTH = 70;
SheetBase.DEFAULT_CELL_HEIGHT = 20;

SheetBase.prototype.reset = function() {	
	this.resetGridSlot();
	this.resetColHeaderSlot();
	this.resetRowHeaderSlot();
	this.resetCornerSlot();
};

SheetBase.prototype.afterInit = function() {
	this.element.className = "sheet";
	this.rowCount = 1;
	this.colCount = 1;
};

SheetBase.prototype.getConfig = function(){return{
	hmsid: "Sheet",
	template: "<div class='sheet-cornerSlot' hmsid='cornerSlot' style='width: 50px; height: 20px'>\
		</div>\
		<div class='sheet-colHeaderSlot' hmsid='colHeaderSlot'>\
			<table class='sheet-colHeaderTable' cellspacing='0'>\
				<tbody hmsid='colHeader'>\
					<tr class='sheet-colHeaderRow' hmsid='colHeaderRow'>\
						<td class='sheet-colHeaderCell' nowrap><div class='sheet-colHeaderCellDiv' id='whg'></div></td>\
						<td><div class='sheet-colHeaderCellDiv'></div></td>\
					</tr>\
				</tbody>\
			</table>\
		</div>\
		<div class='sheet-gridSlot' hmsid='gridSlot'>\
			<table class='sheet-gridTable' cellspacing='0'>\
				<tbody hmsid='grid'>\
					<tr class='sheet-gridRow'>\
						<td class='sheet-gridCell' nowrap><div class='sheet-gridCellDiv'></div></td>\
					</tr>\
				</tbody>\
			</table>\
		</div>\
		<div class='sheet-rowHeaderSlot' hmsid='rowHeaderSlot'>\
			<table class='sheet-rowHeaderTable' cellspacing='0'>\
				<tbody hmsid='rowHeader'>\
					<tr class='sheet-rowHeaderRow'>\
						<td class='sheet-rowHeaderCell' nowrap><div class='sheet-rowHeaderCellDiv'>1</div></td>\
					</tr>\
				</tbody>\
			</table>\
		</div>"
}};
