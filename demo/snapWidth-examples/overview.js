define(['jquery'], function($) {

    var data = {
        legend: 'Overview',
        description: '<a href="https://confluence.tm.tmcs/confluence/display/UE/TM360" \
            target="_blank">UX Guidelines</a> specify that "All new apps should be designed \
            to snap between the 944px grid and the 1252px grid". This page demonstrates the \
            snap-width functionality for both adaptive and non-adaptive layouts.<br><button \
            type="button" id="toggleAdaptive" class="btn btn-primary">Enable Non-adaptive</button> \
            (resize your browser window width around the 1244px threshold)',
        runScript: function(currentElement){
            $("#toggleAdaptive").click(function(){
                var el = $("#container");
                if (el.hasClass("non-adaptive")) {
                    el.removeClass("non-adaptive");
                    $(this).html("Enable Non-adaptive");
                } else {
                    el.addClass("non-adaptive");
                    $(this).html("Enable Adaptive");
                }
            });
        }
    };

    return data;
});