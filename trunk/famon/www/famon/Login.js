
var Login = function(container) {
	var element = document.createElement("div");
	container.appendChild(element);
	element.innerHTML = "<table>\
		<tr>\
			<td>Username:\
			</td>\
			<td><input />\
			</td>\
		</tr>\
		<tr>\
			<td>Password:\
			</td>\
			<td><input type='password'/>\
			</td>\
		</tr>\
		<tr>\
			<td>\
			</td>\
			<td><input type='button' value='Login'/>\
			</td>\
		</tr>\
	</table>";
};

Login.prototype.destruct = function() {
	;
};
