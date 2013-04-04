requirejs.config({
	baseUrl: '../js',
	paths: {
		'jquery': '../lib/jquery-1.7.2/jquery.min',
		'bootstrap': '../lib/bootstrap-2.1.0/js/bootstrap',
		'angular': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.1/angular.min',
		'jquery.throttle': '../lib/jquery.ba-throttle-debounce-1.1/jquery.ba-throttle-debounce.min',
		'widget': '../plugin/widget',
		'mock': '../mock',
		'demo': '../demo',
		'global': '../plugin/global'
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

define('global!gadgets', ['mock/gadgetPrefMock'], function(gadgetPrefMock) {
	var prefs = gadgetPrefMock({
		'tm.widgets.modalDialog.ok': 'OK'
	});

	return {
		Prefs: function() {
			return prefs;
		}
	};
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

var url = decodeURIComponent(location.search.match(/\burl=(.*)(?:&|$)/)[1]);

requirejs(['jquery', 'tm/core', url, 'jquery.throttle'], function($, tm, data) {
	var previous = $('#examples');

	$('h1').text(data.title);

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

	$.each(data.examples, function(i, example) {
		var $javascript = example.setup ? $('<pre/>').addClass('prettyprint lang-javascript').text(cleanCode(example.setup.toString())) : null;
		var $description = example.description ? $('<p/>').html(cleanCode(example.description)) : $('<div/>');

		previous = $('<fieldset/>').append(
			$('<legend/>').text(example.legend),
			$description,
			$('<div/>').html(example.html),
			$('<pre/>').addClass('prettyprint lang-html').text(cleanCode(example.html)),
			$javascript
		).insertAfter(previous);

		example.setup && example.setup();
	});

	prettyPrint();

	$(window).resize($.throttle(200, function() {
		tm.widthCheck(false);
	}));

	tm.widthCheck(false);
});