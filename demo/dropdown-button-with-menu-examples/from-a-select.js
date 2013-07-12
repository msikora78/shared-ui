define(['jquery', 'widget!tm/widgets/dropdownMenu'], function($) {
    'use strict';

    var data = {
        legend: 'From a select',
        description: '',
        html: '\
               <select>\n\
                   <option data-href="#dropDownMenu#5">Foo</option>\n\
                   <option>Bar</option>\n\
                   <option>Foo Bar</option>\n\
               </select>',
        js: function() {

            $('select').tmDropdownMenu();
        }
    };

    return data;
});