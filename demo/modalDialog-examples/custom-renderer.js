define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {
	'use strict';

	var data = {
		legend: 'Custom renderer',
		html: '\
			<div id="custom-renderer"></div>\n\
			<p>\n\
				<button type="button" id="custom-renderer-button" class="btn btn-primary">Click me</button>\n\
			</p>',
		js: function() {
			function renderError(err) {
				return $('<p/>').text(err.message).after($('<p style=\"color: red\"/>').text(err.code));
			}

			var okButton = {
				text: 'OK',
				callback: function(e, dialog) {
					$('#custom-renderer-button').text('Click me');
					dialog.tmModalDialog('hide');
				}
			};

			var dialog = $('#custom-renderer').tmModalDialog({
				renderer: renderError,
				content: { message: 'An error occured', code: 'THIS_IS_AN_ERROR' },
				title: 'Error report',
				buttons: [okButton]
			});

			$('#custom-renderer-button').click(function() {
				$('#custom-renderer-button').text('I was clicked!');
				dialog.tmModalDialog('show');
			});
		}
	};

	return data;
});