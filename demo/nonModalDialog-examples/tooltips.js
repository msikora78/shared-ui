define(['jquery', 'bootstrap', 'widget!tm/widgets/tooltip'], function($) {
    'use strict';

    var data = {
        legend: 'Tooltips',
        description: 'This example demonstrates the positioning of tooltips. The tooltip should always be fully visible within the boundaries of the browser window, changing orientation automatically if needed.',
        html:'\
            <div id="tooltips-non-modal-container" class="demo-container">\n\
                <p><button type="button" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!" data-placement="top">Top</button></p>\n\
                <p><button type="button" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!" data-placement="left">Left</button></p>\n\
                <p><button type="button" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!" data-placement="right">Right</button></p>\n\
                <p><button type="button" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!">Bottom</button></p>\n\
            </div>',
        js: function() {
            $("#tooltips-non-modal-container .btn").tmTooltip();
        }
    };

    return data;
});