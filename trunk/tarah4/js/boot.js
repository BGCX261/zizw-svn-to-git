
var jsloader = new JSLoader();
var Application = jsloader.resolve("tarah.Application");
var application = null;

function init() {
	application = new Application();
}

function destroy() {
	application.destroy();
}
