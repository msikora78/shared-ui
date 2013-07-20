define([], function() {
    'use strict';

    var data = {
        legend: 'Error Text Input',
        description: 'Adding the "error" class to the control-group wrapper displays the error styles, icon, and error/help message.',
        html: '\
            <div id="error-text-input-container">\n\
                <div class="control-group error">\n\
                    <label class="control-label" for="error-text-input">Label</label>\n\
                    <div class="controls">\n\
                        <input type="text" id="error-text-input" value="invalid text" />\n\
                        <i class="help-error-icon"></i>\n\
                        <span class="help-error">Error help text</span>\n\
                    </div>\n\
                </div>\n\
                <div class="control-group error">\n\
                    <label class="control-label" for="error-textarea">Label</label>\n\
                    <div class="controls">\n\
                        <textarea id="error-textarea" value="invalid text" />\n\
                        <i class="help-error-icon"></i>\n\
                        <span class="help-error">Error help text</span>\n\
                    </div>\n\
                </div>\n\
                <p>\n\
                    <a href="javascript:;" id="error-toggle">Remove error CSS class</a>\n\
                </p>\n\
            </div>',
        jsExecute: function(currentElement){
            $("#error-toggle").click(function(e){
                var controlGroups = $("#error-text-input-container .control-group");
                if (controlGroups.hasClass("error")){
                    controlGroups.removeClass("error");
                    $(this).html("Add error CSS class");
                } else {
                    controlGroups.addClass("error");
                    $(this).html("Remove error CSS class");
                }

                return false;
            });
        }
    };

    return data;
});
