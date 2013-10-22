define(['jquery', 'widget!tm/widgets/tooltip', 'widget!tm/widgets/popup'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'Tooltips appear on element hover.',
        html:'\
            <div id="overview-non-modal-container" class="demo-container">\n\
                <p><a id="tooltipTarget" \n\
                    title="It\'s so simple to create a tooltip for my website!"\n\
                    data-placement="top">Tooltip</a></p>\n\
                <p><a href="#" title="Tooltip from an element\'s \'title\' property.">System Tooltip</a></p>\n\
            </div>',
        js: function() {
            $("#tooltipTarget").tmTooltip();
        }
    };

    return data;
});