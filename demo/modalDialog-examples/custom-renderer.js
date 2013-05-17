define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {

	var data = {
		legend: 'custom-renderer',
		html: '<div id="custom-renderer"></div>\n\
			<p><button type="button" id="custom-renderer-button" class="btn btn-primary">Click me</button></p>',
		setupString: "function() {\n \
			function renderError(err) {\n \
				return $('<p/>').text(err.message).after($('<p style=\"color: red\"/>').text(err.code));\n \
			}\n \
\n \
			var okButton = {\n \
				text: 'OK',\n \
				callback: function(e, dialog) {\n \
					$('#custom-renderer-button').text('Click me');\n \
					dialog.tmModalDialog('hide');\n \
				}\n \
			};\n \
\n \
			var dialog = $('#custom-renderer').tmModalDialog({\n \
				renderer: renderError,\n \
				content: { message: 'An error occured', code: 'THIS_IS_AN_ERROR' },\n \
				title: 'Error report',\n \
				buttons: [okButton]\n \
			});\n \
\n \
			$('#custom-renderer-button').click(function() {\n \
				$('#custom-renderer-button').text('I was clicked!');\n \
				dialog.tmModalDialog('show');\n \
			});\n \
		}"
	};

	data.setup = new Function('$', 'return ' + data.setupString).call(this, $);

	return data;

});