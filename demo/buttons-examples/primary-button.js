define(['jquery'], function($) {
    'use strict';

    var data = {
        legend: 'Primary button',
        description: 'A standard bootstrap button. Use <code>.btn</code> <code>.btn-primary</code> classes to get the look and feel.',
        html:'\
            <div id="primary-buttons-container">\n\
                <p>\n\
                    <button type="button" id="primary-button" class="btn btn-primary">Text</button>\n\
                </p>\n\
                <p>\n\
                    <button type="button" id="inactive-primary-button" class="btn btn-primary" disabled>Inactive</button>\n\
                </p>\n\
            </div>',
        js: function() {
            $("#primary-buttons-container .btn").click(function(e) {
                alert(e.target.id + ' was clicked');
            });
        }
    };

    return data;
});