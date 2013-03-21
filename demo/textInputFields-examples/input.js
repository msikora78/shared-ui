define(['jquery'], function($) {

    var data = {
        legend: 'text-input',
        html: '<div id="text-input"></div>\n<input type="text" id="input" class="" />'
    };

    data.setup = new Function('return ' + data.setupString).call(this);

    return data;

});