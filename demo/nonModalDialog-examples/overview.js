define(['jquery', 'widget!tm/widgets/tooltip', 'widget!tm/widgets/popup'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'Non-modal dialogs.',
        html:'\
            <div id="overview-non-modal-container" class="demo-container">\n\
                <p><a id="tooltipTarget" \n\
                    title="It\'s so simple to create a tooltip for my website!"\n\
                    data-placement="top">Tooltip</a></p>\n\
                <p><button type="button" class="btn" id="popupTarget"\n\
                    title="Popup\'s title" \n\
                    data-content="It\'s so simple to create a popup for my website!">Pop up</button>\n\
                <button type="button" class="btn" id="popupWithNoTitle"\n\
                    data-content="It\'s so simple to create a popup for my website!">Pop up with no Title</button>\n\
                <button type="button" class="btn" id="popupWithArrowTarget"\n\
                    title="Popup\'s title" \n\
                    data-content="It\'s so simple to create a popup for my website!"\n\
                    data-show-arrow="true">Pop up with arrow</button>\n\
                <button type="button" class="btn" id="popupWithArrowTargetLittle"\n\
                                    title="Popup\'s title" \n\
                                    data-content="It\'s so simple to create a popup!"\n\
                                    data-show-arrow="true" style="min-width: 30px;">+</button></p>\n\
                <div id="popupContainer" class="tm360"></div>\n\
            </div>',
        js: function() {
            $("#tooltipTarget").tmTooltip();
            $("#overview-non-modal-container .btn:not(a)").tmPopup();
        }
    };

    return data;
});