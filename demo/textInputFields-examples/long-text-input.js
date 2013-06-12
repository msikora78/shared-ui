define(['jquery'], function($) {
    'use strict';
    
    var data = {
        legend: 'Long Text Input',
        html: '\
            <div id="long-input-text-container">\n\
                <p>\n\
                    <input placeholder = "abc" type="text" id="long-input" value="Lorem ipsum dolor sit amet, consectetur adipisicing elit" />\n\
               </p>\n\
            </div>'
    };

    return data;
});