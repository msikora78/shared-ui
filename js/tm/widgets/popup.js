(function() {
    'use strict';

    var bodyInitialized = false;

    /**
     *  Creates the modal dialog prototype
     *  @returns {Function} modal dialog prototype
     */
    function factory($, gadgets, tm) {
        var gadgetPrefs = new gadgets.Prefs();
        var defaultTemplate = '<div class="popover tmPopup"><div class="arrow"></div><div class="popover-inner"><h1 class="popover-title"></h1><div class="popover-content"></div></div></div>';
        // Default options
        var defaults = {
            trigger: 'click',
            template: defaultTemplate,
            customTemplate: null,
            autoClose: true,
            width: '270px',
            height: '210px'
        };

        var arrowOffset = 17; //Places the arrow at 20px from edge.

        /**
         *  Popup's prototype with all the tm specific behaviors
         *  @class
         *  @constructor
         *  @param {DIV} element a div element to use to render the popup
         *  @param {Object} opts creation options
         */
        var Popup = function(element, opts) {
            var opts = $.extend({}, defaults, opts);
            var customTemplate = null;
            if (opts.placement == null) {
                opts.placement = element.attr('data-placement') || 'bottom-right';
            }
            if (opts.showArrow == null) {
                opts.showArrow = element.attr('data-show-arrow') == 'true';
            }
            if (opts.customTemplateId == null) {
                opts.customTemplateId = element.attr('data-custom-template-id');
                customTemplate = $('#' + opts.customTemplateId);
                customTemplate.hide();
            }
            if (opts.customTemplate != null) {
                customTemplate = opts.customTemplate;
                if (typeof customTemplate == 'string') {
                    customTemplate = $(customTemplate);
                }
                customTemplate.hide().appendTo('body');
            }
            if (opts.title == null) {
                opts.title = element.attr('title');
            }
            if (opts.content == null) {
                opts.content = element.attr('data-content') || '\n';
            }
            opts.secondaryPlacement = opts.placement.split('-')[1]
            opts.placement = opts.placement.split('-')[0];

            if (element.attr('data-trigger') != null) {
                opts.trigger = element.attr('data-trigger');
            }

            element.popover(opts);
            $.extend(element.data('popover').options, opts);

            element.on('shown.tmPopup', function(e) {
                $(this).addClass('active');
                var $target = $(e.target),
                    $popup = $target.next('.popover');

                // specify these values by css instead.
                $popup.css({
                    height: opts.height,
                    width: opts.width,
                    maxHeight: opts.height,
                    maxWidth: opts.width
                });

                if (opts.trigger != 'hover') {
                    $popup.focus();
                    $('.popover').each(function(i, popup) { 
                        var $popupTarget = $(popup).prev();
                        if ($popupTarget[0] != element[0]) {
                            $popupTarget.popover('hide'); 
                        }
                    });
                }

                $popup.find('.popover-content').append(customTemplate.show());

                if ($target.data('popover').options.title != '') {
                    $popup.find('.popover-content').addClass('with-title');
                }
                else {
                    $popup.find('.popover-title').remove();
                }

                testPosition($target);
                
                if (opts.placement == 'bottom' || opts.placement == 'top') {
                    adjustVerticalPosition(opts, $target, $popup);
                }
                else {
                    adjustHorizontalPosition(opts, $target, $popup);
                }
                
                // Fixes a bug where the arrow doesn't paint correctly on ie8
                $popup.parent().addClass('ie8fix').removeClass('ie8fix');

                if (!$target.data('popover').options.showArrow) {
                    $popup.find('.arrow').hide();
                }
                else {
                    $popup.find('.arrow').show();
                }

            });

            element.on('hidden.tmPopup', function(e) {
                $(this).removeClass('active');
                var $target = $(e.target),
                    $popup = $target.next('.popover');

                $target.data('popover').options.placement = opts.placement;

                $('body').append(customTemplate.hide());
            });

            element.addClass('tmPopupTarget');

            if (opts.autoClose) {
                element.addClass('tmPopupAutoClose');
                if (!bodyInitialized) {
                    $('body').on('click', '.tmPopupTarget, .popover', false).on('click.tmPopup', function(e) {
                        var $popIn = $('.popover.in');
                        if ($popIn.length > 0) {
                            // this checkup was made if user click on body and quickly click on another popup button.
                            var $autoClosePopopBtns = $('.tmPopupAutoClose');
                            for(var i = 0; i < $autoClosePopopBtns.length; i++){
                                var $targetBtn = $($autoClosePopopBtns[i]);
                                if ($targetBtn.data('tmPopup').getPopup().length)
                                $targetBtn.tmPopup('hide');
                            }
                        }
                    });
                    bodyInitialized = true;
                }
            }

            this.options = opts;
            this.element = element;
        };

        Popup.prototype = {
            show: function() {
                this.element.popover('show');
            },

            hide: function() {
                this.element.popover('hide');
            },

            setShowArrow: function(value) {
                this.options.showArrow = value;
                this.element.data('popover').options.showArrow = value;
            },

            getPopup: function() {
                return this.element.next('.popover');
            }
        }

        function testPosition($target) {
            var $popup = $target.next('.popover');
            var offset = getOffset($popup);
            var placement = $target.data('popover').options.placement;
            if (placement == 'bottom' || placement == 'top') {
                if (offset.top - $target.offsetParent().scrollTop() < 0) {
                    $target.data('popover').options.placement = 'bottom';
                    $popup.removeClass('top').addClass('bottom');
                } 

                if (offset.bottom > $('body').innerHeight() + $target.offsetParent().scrollTop()) {
                    $target.data('popover').options.placement = 'top';
                    $popup.removeClass('bottom').addClass('top');
                }
            }
            else {
                if (offset.left - $target.offsetParent().scrollLeft() < 0) {
                    $target.data('popover').options.placement = 'right';
                    $popup.removeClass('left').addClass('right');
                }

                if (offset.right > $('body').innerWidth() + $target.offsetParent().scrollLeft()) {
                    $target.data('popover').options.placement = 'left';
                    $popup.removeClass('right').addClass('left');
                }
            }
        }

        function adjustVerticalPosition(opts, $target) {
            var $popup = $target.next('.popover');
            var $arrow = $popup.find('.arrow');
            var adjust = 0;
            var placement = opts.placement;
            var secondaryPlacement = opts.secondaryPlacement;
            var popupOffset = getOffset($popup);
            var targetOffset = getOffset($target);
            var placementOffset = 1 + (opts.showArrow ? $arrow.outerHeight() : 1);

            switch ($target.data('popover').options.placement) {
                case 'top':
                    adjust += targetOffset.top - $popup.outerHeight() - placementOffset;
                    break;
                case 'bottom':
                    adjust += targetOffset.bottom + placementOffset;
                    break;
            }

            // Patch bootstrap's placement
            $popup.offset({top: adjust});

            if (secondaryPlacement) {
                switch (secondaryPlacement) {
                    case 'left':
                        adjust = $target.offset().left + $target.outerWidth() - $popup.outerWidth()
                        break;
                    case 'right':
                        adjust = $target.offset().left;
                        break;
                }
                adjust = (adjust < 0) ? 0 : adjust;
                $popup.offset({left: adjust});
            }

            var showArrow = $target.data('popover').options.showArrow;
            var arrowIsMissPlaced = $target.outerWidth() < $arrow.outerWidth() + arrowOffset * 2;
            if (showArrow && opts.secondaryPlacement && arrowIsMissPlaced) {
                var horzAdjust = ($target.data('popover').options.secondaryPlacement == 'left') ? arrowOffset : arrowOffset * -1;
                popupOffset = getOffset($popup);
                $popup.offset({left: popupOffset.left + horzAdjust});
            }

            // Reposition arrow in middle of target
            $arrow.css({ 
                left: function() { 
                    return ($target.offset().left - $popup.offset().left) + $target.outerWidth() / 2; 
                }
            });
        }

        function adjustHorizontalPosition(opts, $target) {
            var $popup = $target.next('.popover');
            var $arrow = $popup.find('.arrow');
            var adjust = 0;
            var placement = opts.placement;
            var popupOffset = getOffset($popup);
            var targetOffset = getOffset($target);
            var placementOffset = 1 + (opts.showArrow ? $arrow.outerWidth() : 1);

            switch ($target.data('popover').options.placement) {
                case 'left':
                    adjust += targetOffset.left - $popup.outerWidth() - placementOffset;
                    break;
                case 'right':
                    adjust += targetOffset.right + placementOffset;
                    break;
            }

            $popup.offset({left: (adjust < 0) ? 0 : adjust});

            if (opts.secondaryPlacement) {
                switch (opts.secondaryPlacement) {
                    case 'top':
                        adjust = $target.offset().top + $target.outerHeight() - $popup.outerHeight()
                        break;
                    case 'bottom':
                        adjust = $target.offset().top;
                        break;
                }
                adjust = (adjust < 0) ? 0 : adjust;
                $popup.offset({top: adjust});
                if (popupOffset.bottom > $('body').innerHeight() + $target.offsetParent().scrollTop()) {
                    $popup.offset({top: $('body').innerHeight() + $target.offsetParent().scrollTop() - $popup.outerHeight()});
                }
            }

            var showArrow = $target.data('popover').options.showArrow;
            var arrowIsMissPlaced = $target.outerHeight() < $arrow.outerHeight() + arrowOffset * 2;
            if (showArrow && opts.secondaryPlacement && arrowIsMissPlaced) {
                var vertAdjust = ($target.data('popover').options.secondaryPlacement == 'top') ? arrowOffset : arrowOffset * -1;
                popupOffset = getOffset($popup);
                $popup.offset({top: popupOffset.top + vertAdjust});
            }

            // Replace arrow in middle of target
            $arrow.css({ 
                top: function() { 
                    return ($target.offset().top - $popup.offset().top) + $target.outerHeight() / 2; 
                }
            });
        }

        function getOffset($element) {
            var offset = $element.offset();
            var top = offset.top;
            var left = offset.left;
            return {
                left: left,
                right: left + $element.outerWidth(),
                top: top,
                bottom: top + $element.outerHeight()
            }
        }

        return Popup;
    }


    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'tm/core', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmPopup', factory($, gadgets, tm));
    }

})();