
var NodeFactory = function() {
	
};

NodeFactory.prototype.resolveNodeType = function(value) {
	if ( (typeof value) == "boolean" ) {
		return imports("aui.BooleanNode");
	} else if ( (typeof value) == "number" ) {
		return imports("aui.NumberNode");
	} else if ( (typeof value) == "string" ) {
		return imports("aui.StringNode");
	} else if ( (typeof value) == "object" ) {
		if ( value == null) 
			return imports("aui.FlushNode");
		if ( value instanceof Array )
			return imports("aui.ArrayNode");
		else
			return imports("aui.ObjectNode");
	} else {
		throw null;
	}
};
