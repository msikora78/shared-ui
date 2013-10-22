define(['jquery', 'widget!tm/widgets/backToTopButton'], function($) {
    'use strict';

    var data = {
        legend: 'Overview',
        description: 'Back-to-Top button appears at the bottom-right of a scrollable element,\n\
            centered container, or body when a user scrolls down. Scroll this page down/up to\n\
            show/hide a live example that is positioned relative to a centered container.\n\
            (Main app content should always be placed in a div#container for proper 2-width\n\
            sizing. See <a href="index.html?url=demo%2FsnapWidth-examples%2Fall">Snap Width</a>.)\n\
            The Back-to-Top button is positioned based on the element it is initialized from. In\n\
            this case, the centered div#container element.',
        htmlDisplay:'\
            <div id="container>\n\
                YOUR CONTENT HERE\n\
            </div>',
        js: function() {
            $("#container").tmBackToTopButton();
        }
    };

    return data;
});