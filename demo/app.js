requirejs.config({
	baseUrl: '../js',
	paths: {
		'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min',
		'bootstrap': 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.0/bootstrap.min',
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
		
		var $javascript = null;
		var $html = null;
		var $description = example.description ? $('<p/>').html(cleanCode(example.description)) : $('<div/>');

		if (example.js) {
			$javascript = $('<p/>').text('Javascript code:');
			$javascript.append($('<pre/>').addClass('prettyprint lang-javascript').text(cleanCode(example.js.toString())));
		}

		if (example.html) {
			$html = $('<p/>').text('HTML Markup:').append($('<pre/>').addClass('prettyprint lang-html').text(cleanCode(example.html)))
		}

		previous = $('<fieldset/>').append(
			$('<legend/>').text(example.legend),
			$description,
			$('<div/>').html(example.html),
			$html,
			$javascript
		).insertAfter(previous);

		example.js && example.js();
	});

	prettyPrint();

	$(window).resize($.throttle(200, function() {
		tm.widthCheck(false);
	}));

	tm.widthCheck(false);
});