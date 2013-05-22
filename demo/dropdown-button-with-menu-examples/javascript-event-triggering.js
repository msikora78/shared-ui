define(['jquery', 'bootstrap'], function($) {
	'use strict';

	var data = {
		legend: 'Javascript events',
		description: 'Dropdown menu items trigger javascript events',
		html: '\
		    <div id="javascriptEventsContainer" class="demo-container">\n\
		    	<table><tr><td>\n\
		                <div class="btn-group">\n\
		                    <a class="btn dropdown-toggle" data-toggle="dropdown">Select<span class="caret" /></a>\n\
		                    <ul class="dropdown-menu">\n\
		                        <li><a id="action1" href="javascript:return 0;">Action 1</a></li>\n\
		                        <li><a id="action2" href="javascript:return 0;">Action 2</a></li>\n\
		                        <li><a id="action3" href="javascript:return 0;">Action 3</a></li>\n\
		                        <li><a id="action4" href="javascript:return 0;">Action 4</a></li>\n\
		                        <li><a id="action5" href="javascript:return 0;">Action 5</a></li>\n\
		                    </ul>\n\
		                </div>\n\
			        </td><td>\n\
			            Log:<br>\n\
			            <div id="javascript-events-console" class="console" />\n\
			        </td></tr>\n\
		    	</table>\n\
		    </div>',
		js: function() {
			$("#javascriptEventsContainer .btn-group ul li a").click(function(e) {
				$("#javascript-events-console").html($("#javascript-events-console").html() + $(e.target).attr("id") + " clicked.<br>");
				$("#javascript-events-console").scrollTop($("#javascript-events-console")[0].scrollHeight);
			});
        }
	};

	return data;
});