define(['jquery', 'bootstrap', 'widget!tm/widgets/checkbox'], function($) {
	'use strict';

	var data = {
		legend: 'Play with dropdown menu width',
		description: '<p>Experimenting with dropdown width at 100% of button width...</p><p>The simplest way to ensure that the dropdown-menu has the same width as the dropdown-toggle is to use a button as the dropdown-toggle and set the widths of the dropdown-toggle to 100% and dropdown-menu to 99.5%. For large labels it there is a little gap.</p>',
		html: '\
			<div id="dropdown-overview-container" class="demo-container">\n\
	            <div id="widthDemo" class="demo-group">\n\
		            <button id="uxNormal" type="button" class="btn btn-primary">Normal</button>\n\
		            <button id="uxLarge" type="button" class="btn">Large</button>\n\
		            <button id="uxExtraLarge" type="button" class="btn">Extra large</button>\n\
		            <button id="uxAutoWidth" type="button" class="btn">Set width from label</button>\n\
		            <div id="uxMenu" class="btn-group" style="display: inline-block; width: 150px;">\n\
		                <button id="uxDropdownToggle" class="btn dropdown-toggle" data-toggle="dropdown" style="width: 100%;"><span>Do something</span><span class="caret" /></button>\n\
						<ul class="dropdown-menu" style="width: 99.5%;">\n\
		                    <li><a tabindex="-1" href="#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#2">Action 2</a></li>\n\
		                    <li><a tabindex="-1" href="#3">Perform an action that has a quite long title</a></li>\n\
		                </ul>\n\
		            </div>\n\
		        </div>\n\
	            <div class="demo-group">\n\
					<label><input type="checkbox" id="uxNoWrap" />Enable nowrap on menu items</label>\n\
					<label><input type="checkbox" id="uxMinWidth" />Use min-width on dropdown-menu</label>\n\
				</div>\n\
		    </div>',
		setupString: '\
			function(){\n\
				function setWidth(e, width) {\n\
					$("#uxMenu").css("width", width);\n\
					$("#widthDemo button").removeClass("btn-primary");\n\
					$(e.target).addClass("btn-primary");\n\
					$("#uxDropdownToggle span:first").text("Do something");\n\
				}\n\
\n\
				$("#uxNormal").click(function(e) { setWidth(e, "150"); });\n\
				$("#uxLarge").click(function(e) { setWidth(e, "300"); });\n\
				$("#uxExtraLarge").click(function(e) { setWidth(e, "600"); });\n\
				$("#uxAutoWidth").click(function(e) {\n\
					setWidth(e, "auto");\n\
					$("#uxDropdownToggle span:first").text("Do something that requires a very long label text");\n\
				});\n\
				$("#uxNoWrap").tmCheckbox().change(function() {\n\
					if ($(this).prop("checked")) {\n\
						$("#widthDemo .dropdown-menu a").addClass("nowrap");\n\
					} else {\n\
						$("#widthDemo .dropdown-menu a").removeClass("nowrap");\n\
					}\n\
				});\n\
				$("#uxMinWidth").tmCheckbox().change(function() {\n\
					if ($(this).prop("checked")) {\n\
						$("#widthDemo .dropdown-menu").removeAttr("style");\n\
						$("#widthDemo .dropdown-menu").css("min-width", "99.5%");\n\
					} else {\n\
						$("#widthDemo .dropdown-menu").removeAttr("style");\n\
						$("#widthDemo .dropdown-menu").css("width", "99.5%");\n\
					}\n\
				});\n\
			}'
	};

	data.setup = new Function('return ' + data.setupString).call(this);

	return data;
});