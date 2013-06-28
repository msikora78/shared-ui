define(['jquery', 'bootstrap', 'widget!tm/widgets/dropdownMenu'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'A standard Bootstrap dropdown menu. You can provide "text", "value" and "link url" to each items. (A Callback can be also provide if you pass an array of items).',
        html: '\
			<div id="dropdown-overview-container" class="demo-container">\n\
	            <div class="demo-group">\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <a id="overview-dropdown-link1" class="btn dropdown-toggle" href="javascript:void(0);">Select action<span class="caret" /></a>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <a id="overview-dropdown-link2" class="btn dropdown-toggle disabled" href="javascript:void(0);">Select action<span class="caret" /></a>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
                    <div class="btn-group" style="display: inline-block;">\n\
                        <button id="overview-dropdown-btn1" class="btn btn-primary dropdown-toggle">Button action primary<span class="caret" /></button>\n\
                        <ul class="dropdown-menu">\n\
                            <li><a tabindex="-1" href="#dropDownMenu#1">Action sadasdasd asdasd asd asdasdasd a 1</a></li>\n\
                            <li><a tabindex="-1" href="#dropDownMenu#2">Action 2</a></li>\n\
                        </ul>\n\
                    </div>\n\
	            </div>\n\
	        </div>',
        js: function() {
            $("#overview-dropdown-link1").tmDropdownMenu();
            $("#overview-dropdown-link2").tmDropdownMenu();
            $("#overview-dropdown-btn1").tmDropdownMenu();
        }
    };

    return data;
});