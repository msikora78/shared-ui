define(['jquery'], function($) {
    var data = {
        legend: 'Long Text Input',
        html: '<div id="long-input-text-container">\n' + 
            '    <p>\n' + 
            '        <input placeholder = "abc" type="text" id="long-input" value="A very very very long text with a very very very long explication of a very very very long text" />\n' + 
            '   </p>\n' + 
            '</div>'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;

});