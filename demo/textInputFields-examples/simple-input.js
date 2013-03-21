define(['jquery'], function($) {
    var data = {
        legend: 'Simple Text Input',
        html: '<div id="simple-input-text-container">\n' + 
            '    <p>\n' + 
            '        <input type="text" id="simple-input" value="Simple text" />\n' + 
            '   </p>\n' + 
            '</div>'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;

});