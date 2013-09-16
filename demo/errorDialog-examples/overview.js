define(['jquery', 'tm/core', 'tm/errorDialog'], function($, tm) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'This demonstrates how to use the tm.errorDialog modal generator.',
        html: '\
            <p>\n\
                <button id="fake-error-link" class="btn btn-primary">Fake an error</button>\n\
            </p>',
        js: function() {
            $('#fake-error-link').click(function() {
                var title = 'System Error';
                var content = 'This is a standard dialog for a basic, general system error. The text can be changed on a case-by-case basis.';
                tm.errorDialog(content, title);
            });
        }
    };

    return data;
});
