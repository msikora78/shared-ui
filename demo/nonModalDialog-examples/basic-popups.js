define(['jquery', 'widget!tm/widgets/popup', 'widget!tm/widgets/checkbox'], function($) {
    'use strict';

    var data = {
        legend: 'Popups',
        description: 'This example demonstrates the positioning of popups. The popup should always be fully visible within the boundaries of the browser window, changing orientation automatically if needed.',
        html:'\
            <div id="basic-popups-container" class="demo-container">\n\
                <p><button type="button" class="btn" \n\
                        title="Popup\'s title" \n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="top-left">Top left\n\
                    </button>\n\
                    <button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="top-right">Top right\n\
                    </button>\n\
                </p>\n\
                <p><button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="left-top">Left top\n\
                    </button>\n\
                    <button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="right-top">Right top\n\
                    </button>\n\
                </p>\n\
                <p><button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="left-bottom">Left bottom\n\
                    </button>\n\
                    <button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="right-bottom">Right bottom\n\
                    </button>\n\
                </p>\n\
                <p><button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="bottom-left">Bottom left\n\
                    </button>\n\
                    <button type="button" class="btn" \n\
                        title="Popup\'s title"\n\
                        data-content="It\'s so simple to create a popup for my website!"\n\
                        data-placement="bottom-right">Bottom right\n\
                    </button>\n\
                </p>\n\
                <label><input id="uxShowArrows" type="checkbox" />Display popups arrows</label>\n\
            </div>',
        js: function() {
            $("#basic-popups-container .btn").tmPopup();
            $("#uxShowArrows").tmCheckbox().on('change', function() {
                $("#basic-popups-container .btn").tmPopup('option', 'showArrow', $("#uxShowArrows").prop('checked'));
            });
        }
    };

    return data;
});