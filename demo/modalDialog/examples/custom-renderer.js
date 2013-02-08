define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {

	return {
		legend: 'custom-renderer',
		html: '<div id="custom-renderer"></div>\n<button type="button" id="custom-renderer-button" class="btn btn-primary">Click me</button>',
		setup: function() {
			function renderError(err) {
				return $('<p/>').text(err.message).after($('<p style="color: red"/>').text(err.code));
			}

			var dialog = $('#custom-renderer').tmModalDialog({
				renderer: renderError,
				content: { message: 'An error occured', code: 'THIS_IS_AN_ERROR' },
				title: 'Error report'
			});

			$('#custom-renderer-button').click(function() {
				dialog.tmModalDialog('show');
			});
		}
	};

});