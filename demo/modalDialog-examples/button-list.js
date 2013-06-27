define(['global!console', 'jquery', 'widget!tm/widgets/modalDialog'], function(console, $) {

	var data = {
		legend: 'button-list',
		html: '<div id="button-list"></div>\n\
			<p><button type="button" id="button-list-button" class="btn btn-primary">Click me</button></p>',
		setupString: "function() {\n \
			var yesButton = {\n \
				text: 'Yes',\n \
				type: 'primary',\n \
				callback: function(e, dialog) {\n \
					console.info('yes');\n \
					dialog.tmModalDialog('hide');\n \
				}\n \
			};\n \
\n \
			var noButton = {\n \
				text: 'No',\n \
				callback: function(e, dialog) {\n \
					console.info('no');\n \
					dialog.tmModalDialog('hide');\n \
				}\n \
			};\n \
\n \
			var dialog = $('#button-list').tmModalDialog({\n \
				title: 'button-list',\n \
				content: 'Are you sure?',\n \
				buttons: [noButton, yesButton]\n \
			});\n \
\n \
			$('#button-list-button').click(function() {\n \
				dialog.tmModalDialog('show');\n \
			});\n \
		}"
	};

	data.setup = new Function('console', '$', 'return ' + data.setupString).call(this, console, $);

	return data;

});