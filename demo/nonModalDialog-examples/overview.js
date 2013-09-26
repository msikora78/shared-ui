define(['jquery', 'widget!tm/widgets/tooltip', 'widget!tm/widgets/popup'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'Non-modal dialogs.',
        html:'\
            <div id="overview-non-modal-container" class="demo-container">\n\
                <p><button type="button" class="btn" id="popupTarget"\n\
                    title="Popup\'s title" \n\
                    data-content="It\'s so simple to create a popup for my website!">Pop up</button>\n\
                <button type="button" class="btn" id="popupWithNoTitle"\n\
                    data-content="It\'s so simple to create a popup for my website!">Pop up with no Title</button></p>\n\
            </div>',
        js: function() {
            $("#overview-non-modal-container .btn:not(a)").tmPopup();
        }
    };

    return data;
});