define(['jquery'], function($) {

    var data = {
        legend: 'Adaptive - 2 width',
        description: 'Include the following to snap the <code>div#container</code> width between \
            944px and 1052px wide (depending on the browser width).',
        htmlDisplay:'\
<div id="container">\n\
  YOUR CONTENT HERE\n\
</div>',
        jsDisplay: function(){
            $(function(){
                var isSmallScreen = false;
                // throttle tm.widthCheck calls to once every 200ms
                var resizeHandler = $.throttle(200, function(event){
                    // apply/remove \'small-screen\' class to body for 2-width div#container
                    isSmallScreen = tm.widthCheck();
                });
                resizeHandler(); // run once on page load ...
                $(window).resize( resizeHandler ); // and also after resize events
            });
        }
    };

    return data;
});