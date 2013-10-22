define(['jquery', 'widget!tm/widgets/backToTopButton'], function($) {
    'use strict';

    var data = {
        legend: 'Scrollable Element',
        description: 'You can also include a Back-to-Top button in a scrollable\n\
            div element. This element should have class "scrollable" to designate\n\
            that it should scroll rather than the entire page.',
        html: '\
            <div id="backToTop-scrolling-container" class="scrollable"\n\
                style="height: 300px; width: 60%; overflow: auto; background-color: #e0eaf1; border: 1px solid #9296a3;">\n\
                <p style="margin-bottom: 300px">Scroll down...</p>\n\
                <p style="margin-bottom: 300px">...keep going...</p>\n\
                <p>bottom</p>\n\
            </div>',
        js: function() {
            $("#backToTop-scrolling-container").tmBackToTopButton();
        }
    };

    return data;
});