define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {

	return {
		legend: 'all-javascript',
		html: '<div id="all-javascript"></div>\n<button type="button" id="all-javascript-button" class="btn btn-primary">Click me</button>',
		setup: function() {
			var allJavascript = $('#all-javascript').tmModalDialog({ title: 'All javascript', content: 'Hello World' });

			$('#all-javascript-button').click(function() {
				allJavascript.tmModalDialog('show');
			});
		}
	};

});