define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {
	return {
		legend: 'all-markup',
		html: '<div id="all-markup">\n' +
		'    <div class="modal-header">\n' +
		'        <h3>My header</h3>\n' +
		'    </div>\n' +
		'    <div class="modal-body">\n' +
		'        <p>My body</p>\n' +
		'    </div>\n' +
		'    <div class="modal-footer">\n' +
		'        <button type="button" class="btn">No</button>\n' +
		'        <button type="button" class="btn btn-primary">Yes</button>\n' +
		'    </div>\n' +
		'</div>\n' +
		'<button type="button" class="btn btn-primary" id="all-markup-button">Click me</button>',
		setup: function() {
			var dialog = $('#all-markup').tmModalDialog();

			dialog.find('.btn').click(function() {
				dialog.tmModalDialog('hide');
			});

			$('#all-markup-button').click(function() {
				dialog.tmModalDialog('show');
			});
		}
	}
});