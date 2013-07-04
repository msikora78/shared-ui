define(['jquery', 'widget!tm/widgets/dropdownMenu', 'widget!tm/widgets/dropdown'], function($) {
    'use strict';

    var data = {
        legend: 'From a select',
        description: '',
        html: '\
               <select>\n\
                   <option>Foo</option>\n\
                   <option>Bar</option>\n\
                   <option>Foo Bar</option>\n\
               </select>',
        js: function() {

            $('select').tmDropdown();
        }
    };

    return data;
});