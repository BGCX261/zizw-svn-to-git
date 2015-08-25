
var AUI = imports("aui.AUI");

var Application = function() {
	var application = AUI.getInstance()._add("application", {
		title:"Scarlett",
		form: {
			date: "",
			amount: "",
			desc:"",
			income:false,
			add: null
		}
	});
};

Application.prototype.destroy = function() {
	AUI.getInstance().destroy();
};
