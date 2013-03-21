define(['jquery'], function($) {
    var data = {
        legend: 'Error Text Input With Help Text',
        html: '<div id="error-input-text-container">\n' + 
            '    <p class="control-group error">\n' + 
            '        <input type="text" id="error-input-with-help" value="Error text" />\n' + 
            '        <span id="error-help-text" class="help-error">Error help text</span>\n' + 
            '   </p>\n' + 
            '</div>'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;

});