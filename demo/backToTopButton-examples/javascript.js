define(['jquery', 'widget!tm/widgets/backToTopButton'], function($) {
    'use strict';

    var data = {
        legend: 'Options',
        description: 'Use the defaults, or specify which options you would like to customize.',
        html: '\
            <div id="backToTop-options-container" class="scrollable"\n\
                style="height: 300px; width: 60%; overflow: auto; background-color: #e0eaf1; border: 1px solid #9296a3;">\n\
                <p style="margin-bottom: 300px">Scroll down...</p>\n\
                <p style="margin-bottom: 300px">...keep going...</p>\n\
                <p>bottom</p>\n\
            </div>',
        js: function() {
            $("#backToTop-options-container").tmBackToTopButton({
                threshold: 10,          // px, scrollTop position where button is shown/hidden
                showDuration: 2000,     // ms, button fade-in time
                hideDuration: 3000,     // ms, button fade-out time
                toTopDuration: 4000,    // ms, scrollTop time; or 1px/ms if null (default)
                buttonText: 'Scroll Back Up'
            });
        }
    };

    return data;
});