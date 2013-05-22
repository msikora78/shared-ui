define([], function() {
    'use strict';

    var data = {
        legend: 'Error text input with help text',
        html: '\
            <div id="error-input-text-container">\n\
                <p class="control-group error">\n\
                    <input type="text" id="error-input-with-help" value="Error text" />\n\
                    <span id="error-help-text" class="help-error">Error help text<span>\n\
                </p>\n\
            </div>'
    };

    return data;
});