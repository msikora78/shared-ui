(function() {
    'use strict';

    /**
     *  Creates the modal dialog prototype
     *  @returns {Function} modal dialog prototype
     */

    function factory($, gadgets, tm) {
        var gadgetPrefs = new gadgets.Prefs();

        // Default options
        var defaults = {
            trigger: 'click',
            template: '<div class="popover tmPopup"><div class="arrow"></div><div class="popover-inner"><h1 class="popover-title"></h1><div class="popover-content"></div></div></div>'
        };

        /**
         *  Tooltip's prototype with all the tm specific behaviors
         *  @class
         *  @constructor
         *  @param {DIV} element a div element to use to render the tooltip
         *  @param {Object} opts creation options
         */
        var Popup = function(element, opts) {
            this.element = element;

            var opts = $.extend({}, defaults, opts);
            var template = null;
            if (opts.placement == null) {
                opts.placement = element.attr('data-placement') || 'bottom-right';
            }
            if (opts.showArrow == null) {
                opts.showArrow = element.attr('data-show-arrow') == 'true';
            }
            if (opts.templateId == null) {
                opts.templateId = element.attr('data-template-id');
                var template = $('#' + opts.templateId);
                if (template.length) {
                    opts.template = '<div class="popover tmPopup"><div class="arrow"></div><div class="popover-inner"><h1 class="popover-title"></h1><div class="popover-content"></div></div></div>';
                    template.hide();
                }
            }
            if (opts.title == null) {
                opts.title = element.attr('title');
            }

            opts.secondaryPlacement = opts.placement.split('-')[1]
            opts.placement = opts.placement.split('-')[0];

            if (element.attr('data-trigger') != null) {
                opts.trigger = element.attr('data-trigger');
            }

            element.popover(opts);
            $.extend(element.data('popover').options, opts);

            element.on('shown', function(e) {
                var $target = $(e.target),
                    $tooltip = $target.next('.tmPopup');

                $tooltip.find('.popover-content').append(template.show());

                if ($target.data('popover').options.title != '') {
                    $tooltip.find('.popover-content').addClass('with-title');
                }

                testPosition($target);
                
                if (opts.placement == 'bottom' || opts.placement == 'top') {
                    adjustVerticalPosition(opts, $target, $tooltip);
                }
                else {
                    adjustHorizontalPosition(opts, $target, $tooltip);
                }
                
                // Fixes a bug where the arrow doesn't paint correctly on ie8
                $tooltip.parent().addClass('ie8fix').removeClass('ie8fix');

                if (opts.trigger == 'click') {
                    $tooltip.focus();
                    $('.tmPopup').each(function(i, popup) { 
                        var $popupTarget = $(popup).prev();
                        if ($popupTarget[0] != element[0]) {
                            $popupTarget.popover('hide'); 
                        }
                    });
                }

                if (!$target.data('popover').options.showArrow) {
                    $tooltip.find('.arrow').hide();
                }
                else {
                    $tooltip.find('.arrow').show();
                }

            });

            element.on('hidden', function(e) {
                var $target = $(e.target);
                $target.data('popover').options.placement = opts.placement;
                $('body').off('click.tmPopup.' + element.id);
            });

            if (opts.trigger == 'hover') {
                element.click(function() {
                    element.popover('hide');
                });
            } 
        };

        Popup.prototype = {
            show: function() {
                this.element.popover('show');
            },

            hide: function() {
                this.element.popover('hide');
            }
        }

        return Popup;
    }

    function testPosition($target) {
        var $tooltip = $target.next('.tmPopup');
        var offset = getOffset($tooltip);
        var placement = $target.data('popover').options.placement;
        if (placement == 'bottom' || placement == 'top') {
            if (offset.top - $target.offsetParent().scrollTop() < 0) {
                $target.data('popover').options.placement = 'bottom';
                $tooltip.removeClass('top').addClass('bottom');
            } 

            if (offset.bottom > $('body').innerHeight() + $target.offsetParent().scrollTop()) {
                $target.data('popover').options.placement = 'top';
                $tooltip.removeClass('bottom').addClass('top');
            }
        }
        else {
            if (offset.left - $target.offsetParent().scrollLeft() < 0) {
                $target.data('popover').options.placement = 'right';
                $tooltip.removeClass('left').addClass('right');
            }

            if (offset.right > $('body').innerWidth() + $target.offsetParent().scrollLeft()) {
                $target.data('popover').options.placement = 'left';
                $tooltip.removeClass('right').addClass('left');
            }
        }
    }

    function adjustVerticalPosition(opts, $target) {
        var $tooltip = $target.next('.tmPopup');
        var $arrow = $tooltip.find('.arrow');
        var space = 0;
        var adjust = 0;
        var placement = opts.placement;
        var secondaryPlacement = opts.secondaryPlacement;
        var tooltipOffset = getOffset($tooltip);
        var targetOffset = getOffset($target);

        switch ($target.data('popover').options.placement) {
            case 'top':
                space = targetOffset.top - tooltipOffset.bottom;
                adjust += targetOffset.top - $tooltip.outerHeight() - 10;
                break;
            case 'bottom':
                space = tooltipOffset.top - targetOffset.bottom;
                adjust += targetOffset.bottom + 10;
                break;
        }

        // Detect tooltip overflows left screen side
        if (space < 10) {
            $tooltip.offset({top: adjust});
        }
        if (secondaryPlacement) {
            switch (secondaryPlacement) {
                case 'left':
                    adjust = $target.offset().left + $target.outerWidth() - $tooltip.outerWidth()
                    break;
                case 'right':
                    adjust = $target.offset().left;
                    break;
            }
            adjust = (adjust < 0) ? 0 : adjust;
            $tooltip.offset({left: adjust});
        }

        // Replace arrow in middle of target
        $arrow.css({ 
            left: function() { 
                return ($target.offset().left - $tooltip.offset().left) + $target.outerWidth() / 2; 
            }
        });
    }

    function adjustHorizontalPosition(opts, $target, $tooltip) {
        var $tooltip = $target.next('.tmPopup');
        var $arrow = $tooltip.find('.arrow');
        var adjust = 0;
        var placement = opts.placement;
        var tooltipOffset = getOffset($tooltip);
        var targetOffset = getOffset($target);

        switch ($target.data('popover').options.placement) {
            case 'left':
                adjust += targetOffset.left - $tooltip.outerWidth() - 10;
                break;
            case 'right':
                adjust += targetOffset.right + 10;
                break;
        }

        adjust = (adjust < 0) ? 0 : adjust;
        $tooltip.offset({left: adjust});

        if (opts.secondaryPlacement) {
            switch (opts.secondaryPlacement) {
                case 'top':
                    adjust = $target.offset().top + $target.outerHeight() - $tooltip.outerHeight()
                    break;
                case 'bottom':
                    adjust = $target.offset().top;
                    break;
            }
            adjust = (adjust < 0) ? 0 : adjust;
            $tooltip.offset({top: adjust});
            if (tooltipOffset.bottom > $('body').innerHeight() + $target.offsetParent().scrollTop()) {
                $tooltip.offset({top: $('body').innerHeight() + $target.offsetParent().scrollTop() - $tooltip.outerHeight()});
            }
        }

        if ($target.data('popover').options.showArrow && opts.secondaryPlacement) {
            var vertAdjust = ($target.data('popover').options.secondaryPlacement == 'top') ? 10 : -10;
            tooltipOffset = getOffset($tooltip);
            $tooltip.offset({top: tooltipOffset.top + vertAdjust});
        }

        // Replace arrow in middle of target
        $arrow.css({ 
            top: function() { 
                return ($target.offset().top - $tooltip.offset().top) + $target.outerHeight() / 2; 
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
    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'tm/core', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmPopup', factory($, gadgets, tm));
    }

})();