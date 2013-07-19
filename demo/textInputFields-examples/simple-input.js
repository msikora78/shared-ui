define(['jquery'], function($) {
    'use strict';

    var data = {
        legend: 'Text Input',
        html: '\
            <div id="simple-text-input-container">\n\
                <div class="control-group">\n\
                    <label class="control-label" for="simple-input">Label</label>\n\
                    <div class="controls">\n\
                        <input type="text" id="simple-input" />\n\
                    </div>\n\
                </div>\n\
                <div class="control-group">\n\
                    <label class="control-label" for="disabled-input">Label</label>\n\
                    <div class="controls">\n\
                        <input type="text" id="disabled-input" value="Disabled" disabled />\n\
                    </div>\n\
                </div>\n\
            </div>'
    };

    return data;
});
