define(['jquery', 'widget!tm/widgets/modalDialog'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'These examples demonstrate the tmModalDialog widget fonctionalities.',
        html: '\
            <div id="overview">\n\
                <div class="modal-footer">\n\
                    <button type="button" onclick="$(\'#overview\').tmModalDialog(\'hide\')" class="btn">Text</button>\n\
                    <button type="button" onclick="$(\'#overview\').tmModalDialog(\'hide\')" class="btn btn-primary">Text</button>\n\
                </div>\n\
            </div>\n\
            <p><button type="button" id="overview-button" class="btn btn-primary">Show</button></p>',
        js: function() {
            var overviewDialog = $('#overview').tmModalDialog({ 
                title: 'Title Text', 
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
            });

            $('#overview-button').click(function() {
                overviewDialog.tmModalDialog('show');
            });
        }
    };

    return data;
});