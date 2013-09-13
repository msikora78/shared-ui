requirejs.config({
    baseUrl: '../js',
    paths: {
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min',
        'bootstrap': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min',
        'angular': '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.1/angular.min',
        'jquery.throttle': '//cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min',
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
        // new dom node for this example
        var current = $('<fieldset/>');

        // legend (required)
        current.append($('<legend/>').text(example.legend));

        // description
        if (example.description){
            current.append($('<p/>').html(cleanCode(example.description)));
        }

        // html to render and/or display
        if (example.html){
            current.append($('<div/>').html(example.html));
        }
        if (example.html || example.htmlDisplay){ // either/or; dont include both!
            var htmlDisplayNode = $('<p/>').text('HTML Markup:');
            htmlDisplayNode.append($('<pre/>').addClass('prettyprint lang-html').text(cleanCode(example.html || example.htmlDisplay)));
            current.append(htmlDisplayNode);
        }

        // javascript to run and/or display
        if (example.js || example.jsDisplay){ // either/or; dont include both!
            var jsStr = example.js ? example.js.toString() : example.jsDisplay.toString();
            var jsDisplayNode = $('<p/>').text('Javascript code:');
            jsDisplayNode.append($('<pre/>').addClass('prettyprint lang-javascript').text(cleanCode(jsStr)));
            current.append(jsDisplayNode);
        }

        // append new dom to the page and update previous reference for next iteration
        previous = current.insertAfter(previous);

        // run javascript
        if (example.js) {
            example.js();
        }

        // run-only javascript (not displayed) passing this examples node (in case it's needed)
        if (example.jsExecute){
            example.jsExecute(current);
        }
    });

    prettyPrint();

    $(window).resize($.throttle(200, function() {
        tm.widthCheck(false);
    }));

    tm.widthCheck(false);
});