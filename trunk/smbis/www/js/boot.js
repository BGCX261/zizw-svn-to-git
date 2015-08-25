
var xhr = jsloader.resolve("com.honmansoft.ajax.xhr");
var lang = jsloader.resolve("com.honmansoft.ajax.lang");

function init() {	
//	xhr.call("Smbis", "love", function(resp) {
//		alert("output delta: " + resp)
//	});
	var recorder = new ClientRecorder();
	var typeSystem = new TypeSystem();
	var beanSystem = new BeanSystem(recorder, typeSystem);
	var uiSystem = new UISystem();
	var root = beanSystem.getBean(uiSystem.getRoot());
	root.setProperty("init", true);
}

function destroy() {
	;
}

var ChangeAction = function(id, name, value) {
	this.action = "change";
	this.id = id;
	this.name = name;
	this.value = value;
};

var Bean = function(type, id, recorder, typeSystem) {
	this.type = type;
	this.id = id;
	this.recorder = recorder;
	this.typeSystem = typeSystem;
	this.properties = {};
	this.setProperty = function(name, value) {
		this.properties[name] = value;
		var action = new ChangeAction(this.id, name, value);
		this.recorder.push(action);
		this.typeSystem.isFlushPoint(this.type, name) &&
			this.recorder.flush(action);
	};
	this.getProperty = function(name) {
		return this.properties[name];
	};
};

var BeanSystem = function(recorder, typeSystem) {
	this.recorder = recorder;
	this.typeSystem = typeSystem;
	this.beans = [];
	this.createBean = function(type) {
		var bean = new Bean(type, this.beans.length, this.recorder, this.typeSystem);
		this.beans.push(bean);
		return bean;
	};
	this.getBean = function(id) {
		return this.beans[id];
	};
	this.createBean("Session");
};

var TypeSystem = function() {
	this.types = {};
	this.isFlushPoint = function(type, property) {
		return this.types[type][property].isFlushPoint ? true : false;
	};
	this.types["Session"] = {
		init: { isFlushPoint: true }
	}
};

var UISystem = function() {
	this.getRoot = function() {
		return 0;
	};
	this.getChildren = function() {
		return [];
	};
};

var Recorder = function() {
	this.actionList = [];
	this.disabled = false;
	this.push = function(action) {
		if ( this.disabled )
			return;
		this.actionList.push(action);
//		alert("recorded: " + lang.toJSONString(action));
	};
	this.setDisabled = function(disabled) {
		this.disabled = disabled;
	};
	this.getDisabled = function() {
		return this.disabled;
	};
};

var ClientRecorder = function() {
	this.flush = function(action) {
		fakeServer.call("Smbis", lang.toJSONString(this.actionList), function(resp) {
			alert("output delta: " + resp)
		});
		this.actionList = [];
	};
};

ClientRecorder.prototype = new Recorder();

var ServerRecorder = function() {
	this.flush = function(action) {
		alert("do some thing on server");
	};
};

ServerRecorder.prototype = new Recorder();

var fakeServer = new function() {
	var recorder = new ServerRecorder();
	var typeSystem = new TypeSystem();
	var beanSystem = new BeanSystem(recorder, typeSystem);
	var uiSystem = new UISystem();
	this.call = function(service, actionList, callback, that) {
		actionList = lang.parseJSON(actionList);
		recorder.setDisabled(true);
		for ( var i = 0; i < actionList.length; i++ ) {
			var action = actionList[i];			
			var bean = beanSystem.getBean(action.id);
			if ( "change" === action.action ) {
				bean.setProperty(action.name, action.value);
			} else {
				throw new Error("unknown action type");
			}
		}
		recorder.setDisabled(false);
	};
}();


