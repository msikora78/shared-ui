(function() {
    'use strict';

    /**
     *  Creates the modal dialog prototype
     *  @returns {Function} modal dialog prototype
     */

    function factory($, gadgets, tm, tmPopup) {
        var gadgetPrefs = new gadgets.Prefs();

        // Default options
        var defaults = {
            showArrow: true,
            trigger: 'hover',
            template: '<div class="popover tmPopup tmTooltip"><div class="arrow"></div><div class="popover-inner"><div class="popover-title"><p></p></div></div></div>'
        };

        /**
         *  Tooltip's prototype with all the tm specific behaviors
         *  @class
         *  @constructor
         *  @param {DIV} element a div element to use to render the tooltip
         *  @param {Object} opts creation options
         */
        var Tooltip = function(element, opts) {
            var opts = $.extend({}, defaults, opts);

            if (opts.placement == null) {
                opts.placement = element.attr('data-placement') || 'bottom';
            }

            element.tmPopup(opts);
        };

        return Tooltip;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'tm/core', 'tm/widgets/popup' ], factory);
    } else {
        tm.widgets.widgetFactory.make('tmTooltip', factory($, gadgets, tm));
    }

})();