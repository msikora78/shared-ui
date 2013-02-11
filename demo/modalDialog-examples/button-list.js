define(['console', 'jquery', 'widget!tm/widgets/modalDialog'], function(console, $) {

	return {
		legend: 'button-list',
		html: '<div id="button-list"></div>\n<button type="button" id="button-list-button" class="btn btn-primary">Click me</button>',
		setup: function() {
			var yesButton = {
				text: 'Yes',
				type: 'primary',
				callback: function(e, dialog) {
					console.info('yes');
					dialog.tmModalDialog('hide');
				}
			};

			var noButton = {
				text: 'No',
				callback: function(e, dialog) {
					console.info('no');
					dialog.tmModalDialog('hide');
				}
			};

			var dialog = $('#button-list').tmModalDialog({
				title: 'button-list',
				content: 'Are you sure?',
				buttons: [noButton, yesButton]
			});

			$('#button-list-button').click(function() {
				dialog.tmModalDialog('show');
			});
		}
	}

});