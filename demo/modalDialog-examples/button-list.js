define(['global!console', 'jquery', 'widget!tm/widgets/modalDialog'], function(console, $) {
	'use strict';

	var data = {
		legend: 'Buttons list',
		description: 'You can supply a custom buttons list via javascript to the widget.',
		html: '\
			<div id="button-list"></div>\n\
			<p><button type="button" id="button-list-button" class="btn btn-primary">Click me</button></p>\n\
			<p><input type="text" id="uxResult"/></p>',
		js: function() {
			var yesButton = {
				text: 'Yes',
				type: 'primary',
				callback: function(e, dialog) {
					result.val('yes');
					dialog.tmModalDialog('hide');
				}
			};

			var noButton = {
				text: 'No',
				callback: function(e, dialog) {
					result.val('no');
					dialog.tmModalDialog('hide');
				}
			};

			var dialog = $('#button-list').tmModalDialog({
				title: 'button-list',
				content: 'Are you sure?',
				buttons: [noButton, yesButton]
			});

			var result = $('#uxResult');

			$('#button-list-button').click(function() {
				dialog.tmModalDialog('show');
				result.val('');
			});
		}
	};

	return data;
});