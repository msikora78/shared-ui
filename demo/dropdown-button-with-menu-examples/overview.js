define(['jquery', 'bootstrap'], function($){
	'use strict';
	
	var data = {
		legend: 'Overview',
		description: 'A standard Bootstrap dropdown menu. Not to confuse with combobox, this control triggers an action rather than letting the user pick a value from a set.',
		html: '\
			<div id="dropdown-overview-container" class="demo-container">\n\
	            <div class="demo-group">\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">Select action<span class="caret" /></a>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">Select very long title action<span class="caret" /></a>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <a class="btn dropdown-toggle disabled" data-toggle="dropdown" href="javascript:void(0)">Select action<span class="caret" /></a>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
	            </div>\n\
	            <div class="demo-group">\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <button class="btn dropdown-toggle" data-toggle="dropdown">Button action<span class="caret" /></button>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <button class="btn dropdown-toggle" data-toggle="dropdown">Button very long title action<span class="caret" /></button>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
		            <div class="btn-group" style="display: inline-block;">\n\
		                <button class="btn dropdown-toggle" data-toggle="dropdown" disabled>Button action<span class="caret" /></button>\n\
		                <ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                </ul>\n\
		            </div>\n\
	            </div>\n\
	        </div>',
		setupString: 'function(){}'
	};

	data.setup = new Function('return ' + data.setupString).call(this);

	return data;
});