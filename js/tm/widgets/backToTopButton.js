(function() {
    'use strict';

    //var bodyInitialized = false;

    /**
     *  Creates the Back-to-Top button prototype
     *  @returns {Function} Back-to-Top button prototype
     */

    function factory($, gadgets, tm) {
        var gadgetPrefs = new gadgets.Prefs();

        // Default options
        var defaults = {
            threshold: 100, // scrollTop position where button is shown/hidden
            showDuration: 800, // button fade-in ms
            hideDuration: 400, // button fade-out ms
            toTopDuration: null, // ms, or 1px/ms if null
            buttonText: gadgetPrefs.getMsg('tm.widgets.backToTopButton.text') || 'Back to Top'
        };

        /**
         *  BackToTopButton's prototype with all the tm specific behaviors
         *  @class
         *  @constructor
         *  @param {DIV} container a div container that will contain the button
         *  @param {Object} opts creation options
         */
        var BackToTopButton = function(container, opts) {
            var options = $.extend({}, defaults, opts);

            // determine scrolling element (window, unless container or parent has 'scrollable' class)
            var scroller = container.hasClass("scrollable") ? container : container.parents(".scrollable");
            if (!scroller.length){
                scroller = $(window); // using $("body") here doesn't work for webkit (Chrome, Safari)
                // can't animate scrollTop for window
                // http://forum.jquery.com/topic/jquery-animate-scrolltop-12-1-2010
                scroller.isWindow = true;
            }

            var box = createButtonBox(container, scroller, options);

            if (scroller.isWindow){
                $("body").append(box);
                box.css("position", "fixed");
            } else {
                scroller.offsetParent().append(box);
            }
        };

        function scrollToTop(scroller, options){
            scroller.data("isScrolling", true);

            var animScroller = scroller.isWindow ? $('html:not(:animated),body:not(:animated)') : scroller;

            animScroller.animate({
                scrollTop: 0
            }, {
                duration: options.toTopDuration || scroller.scrollTop(),
                complete: function(){
                    scroller.data("isScrolling", false);
                }
            });
        }

        function createButtonBox(container, scroller, options){
            // button
            var btn = $("<a>").attr("href", "#").html(options.buttonText + '<i class="up-icon"></i>');

            // button wrapper (needed for fixed positioning)
            var box = $("<div>").addClass("toTopWrap");

            box.append(btn);

            // store references to this btn's scroller and container
            box.data("scroller", scroller);
            box.data("container", container); // use box.parent() instead?

            btn.on("click", function(e){
                hideBox(box, options);
                scrollToTop(scroller, options);
                return false;
            });

            // show/hide when scrolling 
            scroller.on("scroll", function(e){
                if(scroller.data("isScrolling")){
                    return;
                }

                var scrollTop = scroller.scrollTop();
                if (scrollTop >= options.threshold){
                    showBox(box, options);
                } else if (scrollTop < options.threshold){
                    hideBox(box, options);
                }
            });

            // already scrolled on load?
            if (scroller.scrollTop() >= options.threshold){
                showBox(box, options);
            }

            return box;
        }

        function positionBox(box){
            //var btn = box.find("a"); // box width/height is 0 because btn is fixed
            var boxDims = {
                height: box.height() + 20,
                width: box.width() + 20
            };
            var container = box.data("container");
            var scroller = box.data("scroller");

            var offset = getOffset(container);
            if (scroller.isWindow){
                offset.bottom = scroller.height();
            } else {
                offset = getOffset(container);
            }

            box.css({
                top: offset.bottom - boxDims.height,
                left: offset.right - boxDims.width
            });

            if (tm.iOS){
                forceRedraw();
            }
        }

        function positionBoxes(){
            $(".toTopWrap").each(function(){
                var box = $(this);
                if (box.data("showing")){
                    positionBox(box);
                }
            });
        }

        function showBox(box, options){
            if (!box.data("showing")){
                box.data("showing", 1);
                box.css({
                    display: "block",
                    opacity: 0.05
                });

                positionBox(box);
                box.stop();
                box.animate({
                    opacity: 1
                }, {
                    duration: options.showDuration
                });

                // fix safari fixed element position on first show
                if (!box.redrawn){
                    box.redrawn = 1;
                    forceRedraw();
                }
            }
        }

        function hideBox(box, options){
            if (box.data("showing")){
                box.data("showing", 0);
                box.stop();
                box.animate({
                    opacity: 0
                }, {
                    duration: options.hideDuration,
                    complete: function(){
                        box.css({
                            display: "none"
                        });
                    }
                });
            }
        }

        function getOffset(elem) {
            var o = elem.offset();
            return {
                top: o.top,
                right: o.left + elem.outerWidth(),
                bottom: o.top + elem.outerHeight(),
                left: o.left
            };
        }

        function forceRedraw(){
            var ss = document.styleSheets[0];
            try { ss.addRule('.xxxxxx', 'position: relative'); }
            catch(e) {}
        }

        // reposition all buttons on window resize
        if (tm.iOS){
            window.addEventListener("orientationchange", positionBoxes, false);
        } else {
            $(window).on('resize', positionBoxes);
        }

        return BackToTopButton;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'tm/core'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmBackToTopButton', factory($, gadgets, tm));
    }

})();