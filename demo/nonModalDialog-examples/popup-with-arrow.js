define(['jquery', 'widget!tm/widgets/popup'], function($) {
    'use strict';

    var data = {
        legend: 'Popup With Arrow',
        description: 'Non-modal dialogs.',
        html:'\
            <div class="demo-container row-fluid">\n\
                <p class="span2"></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="bottom-right"\n\
                        data-show-arrow="true">Bottom-right</a></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" style="margin-left: 30px" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="top-right"\n\
                        data-show-arrow="true">Top-right</a></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" style="margin-left: 30px" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="top-left"\n\
                        data-show-arrow="true">Top-left</a></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" style="margin-left: 30px" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="bottom-left"\n\
                        data-show-arrow="true">Bottom-left</a></p>\n\
                <p class="span2"></p>\n\
            </div>\n\
            <div class="demo-container row-fluid">\n\
                <p class="span2"></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="right-bottom"\n\
                        data-show-arrow="true">Right-bottom</a></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" style="margin-left: 30px" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="right-top"\n\
                        data-show-arrow="true">Right-top</a></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" style="margin-left: 30px" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="left-top"\n\
                        data-show-arrow="true">Left-top</a></p>\n\
                <p class="span2">\n\
                    <a class="popupWithArrow" style="margin-left: 30px" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="left-bottom"\n\
                        data-show-arrow="true">Left-bottom</a></p>\n\
                <p class="span2"></p>\n\
            </div>',
        js: function() {
            $(".popupWithArrow").tmPopup();
        }
    };

    return data;
});