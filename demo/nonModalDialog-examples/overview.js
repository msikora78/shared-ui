define(['jquery', 'bootstrap', 'widget!tm/widgets/tooltip'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'Non-modal dialogs.',
        html:'\
            <div id="overview-non-modal-container" class="demo-container">\n\
                <button type="button" id="tooltipTarget" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!" data-placement="right">Tooltip</button>\n\
                <button type="button" id="popupTarget" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!">Pop up</button>\n\
                <button type="button" id="popupWithArrowTarget" class="btn" \n\
                    title="It\'s so simple to create a tooltip for my website!">Pop up with arrow</button>\n\
            </div>',
        js: function() {
            $("#tooltipTarget").tmTooltip();
        }
    };

    return data;
});