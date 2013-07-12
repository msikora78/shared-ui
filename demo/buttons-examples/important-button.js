define(['jquery'], function($) {
    'use strict';

    var data = {
        legend: 'Important button',
        description: 'A standard bootstrap button. Use <code>.btn</code> <code>.btn-success</code> class to get the look and feel.',
        html:'\
            <div id="important-buttons-container">\n\
                <p>\n\
                    <button type="button" id="important-button" class="btn btn-success">Text</button>\n\
                </p>\n\
                <p>\n\
                    <button type="button" id="inactive-important-button" class="btn btn-success" disabled>Inactive</button>\n\
                </p>\n\
            </div>',
		js: function() {
            $("#important-buttons-container .btn").click(function(e) {
                alert(e.target.id + ' was clicked');
            });
        }
    };

    return data;
});