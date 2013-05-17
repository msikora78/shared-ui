define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {

	var data = {
		legend: 'all-javascript',
		description: 'This demonstrates the typical usage via javascript using the tmModalDialog widget.',
		html: '<div id="all-javascript"></div>\n\
			<p><button type="button" id="all-javascript-button" class="btn btn-primary">Click me</button></p>',
		setupString: "function() {\n \
			var allJavascript = $('#all-javascript').tmModalDialog({ title: 'All javascript', content: 'Note that the modalDialog can be closed by pressing the ENTER and ESC keys.' });\n \
\n \
			$('#all-javascript-button').click(function() {\n \
				allJavascript.tmModalDialog('show');\n \
			});\n \
		}"
	};

	data.setup = new Function('$', 'return ' + data.setupString).call(this, $);

	return data;

});