define([], function() {
    'use strict';

    var data = {
        legend: 'Overview',
        html: '\
            <div id="overview-container">\n\
                <p>\n\
                    <span id="block-help-text" class="help-block">Help text</span>\n\
                    <input id="overview-normal-input" type="text" value="Simple text" />\n\
                </p>\n\
                <p>\n\
                    <input id="overview-disabled-input" type="text" disabled value="Simple text" />\n\
                </p>\n\
                <p class="control-group error">\n\
                    <input type="text" id="overview-error-input" value="Simple text" />\n\
                    <span id="error-help-icon" class="help-error-icon" />\n\
                    <span id="error-help-text" class="help-error">Error help text</span>\n\
                </p>\n\
            </div>'
    };

    return data;
});