define(['jquery'], function($) {
    'use strict';

    var data = {
        legend: 'Secondary button',
        description: 'A standard bootstrap button. Use <code>.btn</code> class to get the look and feel.',
        html:'\
            <div id="secondary-buttons-container">\n\
                <p>\n\
                    <button type="button" id="secondary-button" class="btn">Text</button>\n\
                </p>\n\
                <p>\n\
                    <button type="button" id="inactive-secondary-button" class="btn" disabled>Inactive</button>\n\
                </p>\n\
            </div>',
        js: function() {
            $("#secondary-buttons-container .btn").click(function(e) {
                alert(e.target.id + ' was clicked');
            });
        }
    };

    return data;
});