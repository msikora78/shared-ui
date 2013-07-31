(function() {
    'use strict';

    /**
     *	Creates the search-and-filter prototype
     *  @returns {Function} search-and-filter prototype
     */

    function factory($) {
        /**
         *	Search-and-Filter's prototype with all the tm specific behaviors
         *	@class
         *	@constructor
         *	@param {INPUT} element an input element
         */
        var SearchAndFilter = function(element) {

            element.focus(function(){
                var input = $(this);
                if (input.val() === input.attr("placeholder")) {
                    input.val("");
                    input.removeClass("placeholder");
                }
            })
            .blur(function(){
                var input = $(this);
                if (input.val() === "" || input.val() === input.attr("placeholder")) {
                    input.addClass("placeholder");
                    input.val(input.attr("placeholder"));
                }
            });

            // initialize
            element.blur();

            // prevent submitting placeholder as value
            element.parents("form").submit(function() {
                $(this).find("[placeholder]").each(function() {
                    var input = $(this);
                    if (input.val() === input.attr("placeholder")) {
                        input.val("");
                    }
                });
            });

            // init clear icon click handler
            element.siblings(".search-clear-icon").click(function(){
                var input = $(this).siblings(".search-query");
                input.addClass("placeholder");
                input.val(input.attr("placeholder"));
                showHideIcon.apply(input);
                input.focus();
            });

            // check to show/hide clear icon now and on keyup
            element.each(function(){
                showHideIcon.apply($(this));
            }).keyup(function(){
                showHideIcon.apply($(this));
            });

        };

        return SearchAndFilter;
    }

    // helper for toggling the "X" icon
    var showHideIcon = function(){
        if (this.data("iconActive")) {
            if (this.val() === "" || this.val() === this.attr("placeholder")){
                // hide icon
                this.siblings(".search-clear-icon").css({
                    display: "none"
                });
                this.data("iconActive", false);
            }
        } else {
            if (this.val() !== "" && this.val() !== this.attr("placeholder")){
                // position and show icon
                this.siblings(".search-clear-icon").css({
                    display: "block",
                    left: this.outerWidth() - 25
                });
                this.data("iconActive", true);
            }
        }
    };

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmSearchAndFilter', factory($));
    }

})();