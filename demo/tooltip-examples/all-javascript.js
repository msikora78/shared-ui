define(['jquery', 'widget!tm/widgets/tooltip'], function($) {
    'use strict';

    var data = {
        legend: 'Javascript',
        description: 'Tooltip built using javascript only.',
        html:'\
            <div id="overview-non-modal-container" class="demo-container">\n\
                <p><a id="javascriptTooltipTarget">Tooltip</a></p>\n\
            </div>',
        js: function() {
            $("#javascriptTooltipTarget").tmTooltip({
                title: "It's so easy to create a tooltip for my website using only javascript.",
                placement: 'top'
            });
        }
    };

    return data;
});