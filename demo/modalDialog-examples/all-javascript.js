define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {
	'use strict';

	var data = {
		legend: 'Javascript',
		description: 'This demonstrates the typical usage via javascript using the tmModalDialog widget.',
		html: '\
			<div id="all-javascript"></div>\n\
			<p>\n\
				<button type="button" id="all-javascript-button" class="btn btn-primary">Click me</button>\n\
			</p>',
		js: function() {
			var allJavascript = $('#all-javascript').tmModalDialog({ title: 'All javascript', content: 'Note that the modalDialog can be closed by pressing the ENTER and ESC keys.' });

			$('#all-javascript-button').click(function() {
				allJavascript.tmModalDialog('show');
			});
		}
	};

	return data;
});