
var TestHelper = {
	assertBeSubclassOfModule: function(className, object) {
		assertTrue(className + " should extend Module.", !!object.__module); 
	},
	assertHasChild: function(className, childName, parentObject, childObject, slot) {
		assertTrue(className + " should has a child named " + childName + ".", !!parentObject.children[childName]);
		assertEquals(childName + " is not correct.", childObject, parentObject.children[childName]);
		assertEquals(childName + "'s container is not correct.", slot, parentObject.children[childName].container);
	},
	assertChildDestroyed: function(className, childName, parentObject, childObject, originalChildObject) {
		assertEquals(className + " should has no child named " + childName + ".", "undefined", typeof parentObject.children[childName]);
		assertEquals("The destroyed object is not correct.", originalChildObject, childObject);
	},
	assertElementPresent: function(name, locator) {
		var present = sel.isElementPresent(locator);
		assertTrue(name + " not found.", present);
	}
};

var blert = window.alert;

var __base = document.URL.substring(0, document.URL.indexOf("www"));

var __load = function(url) {
	var xhr = null;
	if ( window.XMLHttpRequest ) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open("GET", __base+url, false);	
	// for firefox only
	if ( xhr.overrideMimeType ) {
		xhr.overrideMimeType("text/html;charset=gbk");
	}
	try {
		xhr.send("");
	} catch(ex) {
		throw new Error("Resource not found: " + this.baseURL + url);
	}
	return xhr.responseText;
};

eval(__load("www/js/core/JSLoader.js"));
eval(__load("../jsunit/app/jsUnitCore.js"));
eval(__load("../selenium-core/core/scripts/htmlutils.js"));							
eval(__load("../selenium-core/core/scripts/selenium-logging.js"));				
eval(__load("../selenium-core/core/scripts/selenium-browserdetect.js"));		
eval(__load("../selenium-core/core/xpath/misc.js"));		
eval(__load("../selenium-core/core/xpath/xpath.js"));
eval(__load("../selenium-core/core/scripts/selenium-browserbot.js"));
eval(__load("../selenium-core/core/scripts/selenium-api.js"));

var jsloader = new JSLoader(document.URL.substring(0, document.URL.indexOf("test")));
var bb = BrowserBot.createForWindow(window);
var sel = new Selenium(bb);

// dependencies
var Lang = jsloader.resolve("core.Lang");	
var Module = jsloader.resolve("core.Module");	
var Domutils = jsloader.resolve("core.Domutils");
var EventHelper = jsloader.resolve("core.EventHelper");
var CustomEvent = jsloader.resolve("core.CustomEvent");
var AUI = jsloader.resolve("tarah.AUI");
