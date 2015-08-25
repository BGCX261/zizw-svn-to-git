
var Module = jsloader.resolve("wajax.core.Module");

var Workspace = function(element, parentModule) {
	Workspace.superclass.constructor.call(this, element, parentModule);
};

lang.extend(Workspace, Module);

Workspace.prototype.getTemplate = function() {
	return "<table width='100%' height='100%'>\
		<tr>\
			<td style='height: 1em' colspan='2' align='right'><a href='#'>Help</a>\
			</td>\
		</tr>\
		<tr>\
			<td style='height: 1em'>\
			</td>\
			<td style='width: 100%' rowspan='2' hmsid='switcher' hmstype='famon.AccountViewSwitcher'>\
			</td>\
		</tr>\
		<tr>\
			<td valign='top' hmsid='calendar' hmstype='famon.Calendar'>\
			</td>\
		</tr>\
	</table>";
};
