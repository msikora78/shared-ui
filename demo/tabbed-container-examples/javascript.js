define(['jquery', 'widget!tm/widgets/tabbedContainer'], function($) {
    'use strict';

    var data = {
        legend: 'Javacript.',
        description: 'Tabbed Container can be fully generated in a specific element.',
        html: '\
        <div style="padding: 20px">\n\
            <div id="tabbed-container-javascript"></div>\n\
        </div>',
        js: function() {
            $("#tabbed-container-javascript").tmTabbedContainer({
                nav: [{
                    id: "js-tab1",
                    text: "Tab One",
                    content: "Content for Tab One"
                }, {
                    id: "js-tab2",
                    text: "Tab Two",
                    content: "Content for Tab Two"
                }]
            });
        }
    };

    return data;
});