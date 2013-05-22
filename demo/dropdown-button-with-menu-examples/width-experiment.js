define(['jquery', 'bootstrap', 'widget!tm/widgets/checkbox'], function($) {
	'use strict';

	var data = {
		legend: 'Play with dropdown menu width',
		description: 'Experimenting with dropdown width at 100% of button width...</p>',
		html: '\
			<div id="dropdown-overview-container" class="demo-container">\n\
	            <div id="widthDemo" class="demo-group">\n\
		            <button id="uxNormal" type="button" class="btn btn-primary">Normal</button>\n\
		            <button id="uxLarge" type="button" class="btn">Large</button>\n\
		            <button id="uxAutoWidth" type="button" class="btn">Set width from label</button>\n\
		            <div id="uxMenu" class="btn-group" style="display: inline-block; width: 150px;">\n\
		                <button id="uxDropdownToggle" class="btn dropdown-toggle" data-toggle="dropdown"><span>Do something</span><span class="caret" /></button>\n\
						<ul class="dropdown-menu">\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#1">Action 1</a></li>\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#2">Action 2</a></li>\n\
		                    <li><a tabindex="-1" href="#dropDownMenu#3">Perform an action that has a quite long title</a></li>\n\
		                </ul>\n\
		            </div>\n\
		        </div>\n\
	            <div class="demo-group">\n\
					<label><input type="checkbox" id="uxNoWrap" />Disable wrapping on menu items</label>\n\
					<label><input type="checkbox" id="uxMinWidth" />Force width on dropdown-menu</label>\n\
				</div>\n\
		    </div>',
		js: function() {
			function setWidth(e, width) {
				$("#uxMenu").css("width", width);
				$("#widthDemo button").removeClass("btn-primary");
				$(e.target).addClass("btn-primary");
				$("#uxDropdownToggle span:first").text("Do something");
			}

			$("#uxNormal").click(function(e) { setWidth(e, "150"); });
			$("#uxLarge").click(function(e) { setWidth(e, "300"); });
			$("#uxAutoWidth").click(function(e) {
				setWidth(e, "auto");
				$("#uxDropdownToggle span:first").text("Do something that requires a very long label text");
			});
			$("#uxNoWrap").tmCheckbox().change(function() {
				if ($(this).prop("checked")) {
					$("#widthDemo .dropdown-menu a").addClass("nowrap");
				} else {
					$("#widthDemo .dropdown-menu a").removeClass("nowrap");
				}
			});
			$("#uxMinWidth").tmCheckbox().change(function() {
				if ($(this).prop("checked")) {
					$("#widthDemo .dropdown-menu").removeAttr("style");
					$("#widthDemo .dropdown-menu").css("width", "99.5%");
				} else {
					$("#widthDemo .dropdown-menu").removeAttr("style");
				}
			});
		}
	};

	return data;
});