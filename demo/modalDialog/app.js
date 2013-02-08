requirejs.config({
	baseUrl: '../../js',
	paths: {
		'jquery': '../lib/jquery-1.7.2/jquery.min',
		'bootstrap': '../lib/bootstrap-2.2.2/js/bootstrap.min',
		'angular': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.1/angular.min',
		'jquery.throttle': '../lib/jquery.ba-throttle-debounce-1.1/jquery.ba-throttle-debounce.min',
		'widget': '../plugin/widget',
		'mock': '../mock',
		'examples': '../demo/modalDialog/examples'
	},
	shim: {
		bootstrap: ['jquery'],
		angular: {
			exports: 'angular',
			deps: ['jquery']
		},
		'jquery.throttle': ['jquery']
	}
});

define('gadgets.Pref', ['mock/gadgetPrefMock'], function(gadgetPrefMock) {
	return gadgetPrefMock({
		'tm.widgets.modalDialog.ok': 'OK'
	});
});

define('console', ['jquery'], function($) {
	return console || (function() {
		var noOp = function() {};
		var surrogate = {};

		$.each(['info', 'log', 'warn', 'error', 'dir'], function(i, name) {
			surrogate[name] = noOp;
		});

		return surrogate;
	})();
});

define('navigator', [], function() {
	return navigator;
});

define('window', [], function() {
	return window;
});

requirejs(['jquery', 'tm', 'jquery.throttle', 'examples/all-javascript', 'examples/custom-renderer', 'examples/button-list', 'examples/all-markup', 'examples/angular-integration'], function($, tm) {
	var previous = $('#examples');
	var examples = Array.prototype.slice.call(arguments, 3);

	function cleanCode(code) {
		var lines = code.replace(/\t/g, '    ').split('\n');
		var spaceCount = lines[lines.length - 1].search(/\S/);

		for (var i = 0; i < lines.length; i++) {
			var index = lines[i].search(/\S/);

			if (index >= spaceCount) {
				lines[i] = lines[i].substr(spaceCount);
			}
		}

		return lines.join('\n');
	}

	$.each(examples, function(i, example) {
		previous = $('<fieldset class="span12"/>').append(
			$('<legend/>').text(example.legend),
			$('<div/>').html(example.html),
			$('<pre/>').addClass('prettyprint lang-html').text(example.html),
			$('<pre/>').addClass('prettyprint lang-javascript').text(cleanCode(example.setup.toString()))
		).insertAfter(previous);

		example.setup();
	});

	prettyPrint();

	$(window).resize($.throttle(200, function() {
		tm.widthCheck(false);
	}));

	tm.widthCheck(false);
});