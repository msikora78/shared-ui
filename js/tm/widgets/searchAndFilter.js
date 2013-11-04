(function() {
    'use strict';

    /**
     *	Creates the search-and-filter prototype
     *  @returns {Function} search-and-filter prototype
     */

    function factory($, tm) {

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
            var clearIcon = element.siblings(".search-clear-icon");
            clearIcon.click(function(){
                var input = $(this).siblings(".search-query");
                input.addClass("placeholder");
                input.val(input.attr("placeholder"));
                showHideIcon.apply(input);
                input.focus();
                // trigger change event so user can bind to it
                input.trigger('change');
            });

            // check to show/hide clear icon now and on keyup
            element.each(function(){
                var el = $(this);

                if (tm.touchDevice){
                    // add clear div for larger click area on touch devices
                    var clearClickArea = $("<div>").addClass("search-clear-click-area");
                    element.parent().append(clearClickArea);
                    clearClickArea.click(function(){
                        $(this).siblings(".search-clear-icon").click();
                        return false;
                    });
                }

                showHideIcon.apply(el);

                el.bind('keydown keyup paste cut change focus blur', function(){
                	// deferring the showHideIcon logic
                	// to be executed after the stack clears,
                	// since e.g. 'paste' event wouldn't populate
                	// the input box with text right away
                    setTimeout( $.proxy( showHideIcon,$(this) ) , 0 );
                });
            });
			
			this.element = element;
        };
        
        SearchAndFilter.prototype = {
            getValue: function() {
                var val = this.element.val();
                return element.attr('placeholder') === val ? "" : val;
            }       
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
                this.siblings(".search-clear-click-area").css({
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
                this.siblings(".search-clear-click-area").css({
                    display: "block",
                    left: this.outerWidth() - 25
                });
                this.data("iconActive", true);
            }
        }
    };

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'tm/core'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmSearchAndFilter', factory($, tm));
    }

})();