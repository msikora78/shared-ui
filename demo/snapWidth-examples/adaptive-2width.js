define(['jquery'], function($) {

    var data = {
        legend: 'Adaptive - 2 width',
        description: 'Include the following to snap the <code>div#container</code> width between \
            944px and 1052px wide (depending on the browser width).',
        htmlString:'\
<div id="container">\n\
  YOUR CONTENT HERE\n\
</div>',
        setupString: '$(function(){\n\
          var isSmallScreen = false;\n\
          // throttle tm.widthCheck calls to once every 200ms\n\
          var resizeHandler = $.throttle(200, function(event){\n\
            // apply/remove \'small-screen\' class to body for 2-width div#container\n\
            isSmallScreen = tm.widthCheck();\n\
          });\n\
          resizeHandler(); // run once on page load ...\n\
          $(window).resize( resizeHandler ); // and also after resize events\n\
        });'
    };

    return data;
});