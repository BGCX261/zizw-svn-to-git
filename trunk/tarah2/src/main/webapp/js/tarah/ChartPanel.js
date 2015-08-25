
var ChartPanel = function(container) {
	ChartPanel.superclass.constructor.call(this, container);
};

lang.extend(ChartPanel, Module);
var FusionCharts = jsloader.resolve("thirdparty.FusionCharts");
			
ChartPanel.prototype.reset = function() {
};

ChartPanel.prototype.afterInit = function() {
	var xml = document.implementation.createDocument("", "", null);
	var nodeChart = xml.createElement("chart");
	xml.appendChild(nodeChart);
	var nodeSet = xml.createElement("set");
	nodeChart.appendChild(nodeSet);
	nodeSet.setAttribute("label", "大米");
	nodeSet.setAttribute("value", 100.12);
	nodeSet = xml.createElement("set");
	//
	nodeSet = xml.createElement("set");
	nodeChart.appendChild(nodeSet);
	nodeChart.appendChild(nodeSet);
	nodeSet.setAttribute("label", "水果");
	nodeSet.setAttribute("value", 113.50);
	//
	nodeSet = xml.createElement("set");
	nodeChart.appendChild(nodeSet);
	nodeChart.appendChild(nodeSet);
	nodeSet.setAttribute("label", "蔬菜");
	nodeSet.setAttribute("value", 11.11);
	//
	nodeSet = xml.createElement("set");
	nodeChart.appendChild(nodeSet);
	nodeChart.appendChild(nodeSet);
	nodeSet.setAttribute("label", "油");
	nodeSet.setAttribute("value", 150.43);
	//
	nodeSet = xml.createElement("set");
	nodeChart.appendChild(nodeSet);
	nodeChart.appendChild(nodeSet);
	nodeSet.setAttribute("label", "煤气");
	nodeSet.setAttribute("value", 300.99);
	//
	var chart = new FusionCharts(
		"swf/FusionCharts/Column3D.swf", 
		"chartId", 
		"400", "300", "0", "1");		   			
	chart.setDataXML(domutils.xml2string(xml.documentElement));
	chart.render(this.element);
};

ChartPanel.prototype.getConfig = function(){return{
	hmsid: "ChartPanel",
	template: "hello"
}};
