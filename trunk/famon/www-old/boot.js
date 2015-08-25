
var jsloader = new JSLoader();
var FamonApp = jsloader.resolve("famon.Application");
var famonApp = null;

function init() {
	famonApp = new FamonApp(document.body);
}

function destroy() {
	famonApp.destruct();
}
