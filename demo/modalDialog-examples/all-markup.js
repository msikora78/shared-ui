define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {
    var data = {
	legend: 'all-markup',
	description: 'You can specify the action to be used when the user hit ESC (with <code>data-secondary-action</code>) or ENTER (with <code>data-primary-action</code>).',
	html: '<div id="all-markup" class="large">\n' +
	'    <div class="modal-header">\n' +
	'        <h3>My header</h3>\n' +
	'    </div>\n' +
	'    <div class="modal-body">\n' +
	'        <p>My body</p>\n' +
	'    </div>\n' +
	'    <div class="modal-footer">\n' +
	'        <button type="button" class="btn" >Maybe</button>\n' +
	'        <button type="button" data-secondary-action class="btn" >No</button>\n' +
	'        <button type="button" data-primary-action class="btn btn-primary">Yes</button>\n' +
	'    </div>\n' +
	'</div>\n' +
	'<button type="button" class="btn btn-primary" id="all-markup-button">Click me</button>',
	setupString: "function() {\n \
	    var dialog = $('#all-markup').tmModalDialog();\n \
\n \
	    dialog.find('.btn[data-primary-action]').click(function() {\n \
		alert('Yes');\n \
	    });\n \
\n \
	    dialog.find('.btn[data-secondary-action]').click(function() {\n \
		dialog.tmModalDialog('hide');\n \
	    });\n \
\n \
	    $('#all-markup-button').click(function() {\n \
		dialog.tmModalDialog('show');\n \
	    });\n \
	}"
    };

    data.setup = new Function('$', 'return ' + data.setupString).call(this, $);

    return data;
});