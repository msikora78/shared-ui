define(['jquery', 'widget!tm/widgets/dropdownMenu', 'widget!tm/widgets/dropdown'], function($) {
    'use strict';

    var data = {
        legend: 'From a simple element',
        description: 'The widget can recieve a list of items to generate elements and you can provide "link url" and a "Callback" function when you click on an item.',
        html: '\
           <div id="divSelect"></div>',
        js: function() {
            $("#divSelect").tmDropdown({
                items: [{
                    text: "foo",
                    value: "FOO",
                    href: "#dropDownList#1"
                }, {
                    text: "bar",
                    value: "BAR",
                    callback: function(){
                        alert("Ex: This selection can call a function.")
                    }
                }]
            });
        }
    };

    return data;
});