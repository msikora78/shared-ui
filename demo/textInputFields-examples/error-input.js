define(['jquery'], function($) {
    var data = {
        legend: 'Error Text Input',
        html: '<div id="error-input-text-container">\n' + 
            '    <p class="control-group error">\n' + 
            '        <input type="text" id="error-input" value="Error text" />\n' + 
            '   </p>\n' + 
            '</div>'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;

});