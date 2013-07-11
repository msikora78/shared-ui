requirejs.config({
    baseUrl: '../js',
    paths: {
        'jquery': 'https://portal.shared.dev2.websys.tmcs/shared/js/lib/jquery-1.7.2.min',
        'bootstrap': 'https://portal.shared.dev2.websys.tmcs/shared/js/lib/bootstrap-2.1.0.min',
        'angular': '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.1/angular.min',
        'jquery.throttle': 'https://portal.shared.dev2.websys.tmcs/shared/js/lib/jquery.ba-throttle-debounce-1.1.min',
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
        var current = $('<fieldset/>');

        current.append($('<legend/>').text(example.legend));

        // description
        if (example.description){
            current.append($('<p/>').html(cleanCode(example.description)));
        }

        // html to render and/or display
        if (example.html){
            current.append($('<div/>').html(example.html));
        }
        if (example.html || example.htmlString){
            var hStr = example.html || example.htmlString;
            current.append($('<pre/>').addClass('prettyprint lang-html').text(cleanCode(hStr)));
        }

        // javascript to run and/or display
        if (example.setup || example.setupString){
            var sStr = example.setup ? example.setup.toString() : example.setupString;
            current.append($('<pre/>').addClass('prettyprint lang-javascript').text(cleanCode(sStr)));
        }

        previous = current.insertAfter(previous);

        if (example.setup) {
            example.setup();
        }

        // javascript to run only (not displayed)
        if (example.runScript){
            example.runScript(current);
        }
    });

    prettyPrint();

    $(window).resize($.throttle(200, function() {
        tm.widthCheck(false);
    }));

    tm.widthCheck(false);
});