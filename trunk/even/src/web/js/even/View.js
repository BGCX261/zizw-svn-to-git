
var View = function(componentClass, container, config) {
	View.superclass.constructor.call(this, container, template);
	this.MIN_WIDTH = 100;
	this.headerWidth = this.MIN_WIDTH;
	this.headerHeight = 20;
	this.bodyHeight = 40;
	this.borderWidth = 1;
	if ( config ) {
		if ( config.width ) {
			this.headerWidth = config.width;
		}
		if ( config.height ) {
			this.bodyHeight = config.height;
		}
	}
	//
	this.BEFORE_DRAG_TASK = new BeforeDragTask(this);
	this.RIGHT_RESIZE_TASK = new RightResizeTask(this);
	this.BOTTOM_RESIZE_TASK = new BottomResizeTask(this);
	this.CORNER_RESIZE_TASK = new CornerResizeTask(this);
	this.DRAGGING_TASK = new DraggingTask(this);
	//
	this.task = this.BEFORE_DRAG_TASK;
	//
	this.component = new componentClass(this.elemBody);
	this.component.onresize.addListener(this.resetLayout, this);
	//
	this.resetLayout();
};

Lang.extend(View, Component);

View.prototype.window_mousedown_handler = function(ev) {
	if ( !this.task ) {
		return;
	}
	this.task.mousedownHandler(ev);
};

View.prototype.window_mousemove_handler = function(ev) {
	if ( !this.task ) {
		return;
	}
	this.task.mousemoveHandler(ev);
};

View.prototype.window_mouseup_handler = function(ev) {
	if ( !this.task ) {
		return;
	}
	this.task.mouseupHandler(ev);
};

View.prototype.resetLayout = function() {
	var shadow = 3;
	var rightTop = shadow;
	var rightLeft = (
			this.headerWidth + 
			(Domutils.isFF()?this.borderWidth * 2:0)
		 );
	var rightWidth = shadow;
	var bottomTop = (
			this.headerHeight + this.bodyHeight +  
			(Domutils.isFF()?this.borderWidth * 3:0)
		);
	var bottomLeft = shadow;
	var bottomHeight = shadow;
	var bodyTop = (
			this.headerHeight + 
			(Domutils.isFF()?this.borderWidth * 2:0)
		);
	var elementWidth = rightLeft + rightWidth;
	var elementHeight = bottomTop + bottomHeight;
	//
	this.elemHeader.style.width = this.headerWidth + "px";
	this.elemHeader.style.height = this.headerHeight + "px";
	//
	this.elemBody.style.top = bodyTop + "px";
	this.elemBody.style.width = this.headerWidth + "px";
	this.elemBody.style.height = this.bodyHeight + "px";
	//
	this.element.style.width = elementWidth + "px";
	this.element.style.height = elementHeight + "px";
	//
	this.elemRight.style.top = rightTop + "px";
	this.elemRight.style.left = rightLeft + "px";
	this.elemRight.style.width = rightWidth + "px";
	this.elemRight.style.height = bottomTop + "px";
	//
	this.elemBottom.style.top = bottomTop + "px";
	this.elemBottom.style.left = bottomLeft + "px";
	this.elemBottom.style.width = rightLeft + "px";
	this.elemBottom.style.height = bottomHeight + "px";
	//
	this.elemCorner.style.top = bottomTop + "px";
	this.elemCorner.style.left = rightLeft + "px";
	this.elemCorner.style.width = rightWidth + "px";
	this.elemCorner.style.height = bottomHeight + "px";
};

var template = "<div style='position: absolute'>\	<div hmsid='header' style='position: absolute; left: 0px; top: 0px; border: black 1px solid; cursor: default; background-color: white'>\	</div>\
	<div hmsid='body' style='position: absolute; left: 0px; overflow: auto; background-color: white; border-left: black 1px solid;border-right: black 1px solid;border-bottom: black 1px solid'>\
	</div>\
	<div hmsid='right' style='position: absolute; background-color: gray; cursor: e-resize'></div>\
	<div hmsid='bottom' style='position: absolute; background-color: gray; cursor: n-resize; font-size: 0px'></div>\
	<div hmsid='corner' style='position: absolute; background-color: gray; cursor: nw-resize; font-size: 0px'></div>\
</div>";

var BeforeDragTask = function(view) {
	this.view = view;
	this.mousedownHandler = function(ev) {
		var target = ev.target;
		if ( target == this.view.elemHeader ) {
			this.view.originalX = this.view.element.offsetLeft;
			this.view.originalY = this.view.element.offsetTop;
			this.view.startX = ev.clientX;
			this.view.startY = ev.clientY;
			this.view.task = this.view.DRAGGING_TASK;
		} else if ( target == this.view.elemRight ) {
			this.view.originalHeaderWidth = this.view.headerWidth;
			this.view.startX = ev.clientX;
			this.view.task = this.view.RIGHT_RESIZE_TASK;
		} else if ( target == this.view.elemBottom ) {
			this.view.originalBodyHeight = this.view.bodyHeight;
			this.view.startY = ev.clientY;
			this.view.task = this.view.BOTTOM_RESIZE_TASK;
		} else if ( target == this.view.elemCorner ) {
			this.view.originalHeaderWidth = this.view.headerWidth;
			this.view.originalBodyHeight = this.view.bodyHeight;
			this.view.startX = ev.clientX;
			this.view.startY = ev.clientY;
			this.view.task = this.view.CORNER_RESIZE_TASK;
		} else {
			;
		}
		for ( var p = ev.target; p; p = p.parentNode ) {
			if ( p == this.view.element ) {
				var zIndex = document.body.getAttribute("lastZindex");
				if ( !zIndex ) {
					zIndex = 0;
				}
				document.body.setAttribute("lastZindex", ++zIndex);
				this.view.element.style.zIndex = zIndex;
				break;
			}
		}
	};
	this.mousemoveHandler = function(ev) {
		;
	};
	this.mouseupHandler = function(ev) {
		;
	};
};

var DraggingTask = function(view) {
	this.view = view;
	this.mousemoveHandler = function(ev) {
		var deltaX = ev.clientX - this.view.startX;
		var deltaY = ev.clientY - this.view.startY;
		this.view.element.style.left = this.view.originalX + deltaX;
		this.view.element.style.top = this.view.originalY + deltaY;
	};
	this.mouseupHandler = function(ev) {
		this.view.task = this.view.BEFORE_DRAG_TASK;
	};
};

var RightResizeTask = function(view) {
	this.view = view;
	this.mousemoveHandler = function(ev) {
		var deltaX = ev.clientX - this.view.startX;
		this.view.headerWidth = this.view.originalHeaderWidth + deltaX;
		this.view.resetLayout();
	};
	this.mouseupHandler = function(ev) {
		this.view.task = this.view.BEFORE_DRAG_TASK;
	};
};

var BottomResizeTask = function(view) {
	this.view = view;
	this.mousemoveHandler = function(ev) {
		var deltaY = ev.clientY - this.view.startY;
		this.view.bodyHeight = this.view.originalBodyHeight + deltaY;
		this.view.resetLayout();
	};
	this.mouseupHandler = function(ev) {
		this.view.task = this.view.BEFORE_DRAG_TASK;
	};
};

var CornerResizeTask = function(view) {
	this.view = view;
	this.mousemoveHandler = function(ev) {
		var deltaX = ev.clientX - this.view.startX;
		var deltaY = ev.clientY - this.view.startY;
		this.view.headerWidth = this.view.originalHeaderWidth + deltaX;
		this.view.bodyHeight = this.view.originalBodyHeight + deltaY;
		this.view.resetLayout();
	};
	this.mouseupHandler = function(ev) {
		this.view.task = this.view.BEFORE_DRAG_TASK;
	};
};
