define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {

	var data = {
		legend: 'all-javascript',
		html: '<div id="all-javascript"></div>\n<button type="button" id="all-javascript-button" class="btn btn-primary">Click me</button>',
		setupString: "function() {\n \
			var allJavascript = $('#all-javascript').tmModalDialog({ title: 'All javascript', content: 'Hello World' });\n \
\n \
			$('#all-javascript-button').click(function() {\n \
				allJavascript.tmModalDialog('show');\n \
			});\n \
		}"
	};

	data.setup = new Function('$', 'return ' + data.setupString).call(this, $);

	return data;

});