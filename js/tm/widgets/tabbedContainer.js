(function() {
    'use strict';

    /**
     *  Creates the tabbed container prototype
     *  @returns {Function} tabbed container prototype
     */

    function factory($) {

        var TabbedContainer = function(element, opts) {

            this.element = element.addClass('tabbed-container');
            this.opts = $.extend({
                nav: []
            }, opts || {});

            var hasNav = !! element.find('.nav a').length;
            if (!hasNav) {
                this._createNav();
            }

            this._init();

            this.nav = this.element.find('.nav');
            this.tabContent = this.element.find(".tab-content");

        };

        TabbedContainer.prototype._init = function() {

            var nav = this.element.find('a');
            nav.tab().click(function(e) {
                e.preventDefault();
                $(this).tab('show');
            });

            var activeElement = null;
            $.each(nav, function(val, item) {
                var li = $(item).parent();
                if (li.hasClass('active')) {
                    $(item).tab('show');
                    li.removeClass('active'); // if we don't remove the class, the content was not right selected.
                    activeElement = $(item);
                    return false;
                }
            });

            if (activeElement && activeElement.length) {
                activeElement.tab('show');
            } else {
                nav.first().tab('show');
            }


        };

        TabbedContainer.prototype._createNav = function() {
            var nav = $('<ul class="nav nav-pills">');
            var container = $('<div class="tab-content">');
            for (var i = 0; i < this.opts.nav.length; i++) {
                nav.append($('<li>').append($('<a href="#' + this.opts.nav[i].id + '"></a>').text(this.opts.nav[i].text)));
                this._createContentElement(container, this.opts.nav[i]);
            }

            this.element.append(nav, container);
        };

        TabbedContainer.prototype._createContentElement = function(container, nav) {
            var content = $('<div id="' + nav.id + '" class="tab-pane">');
            content.html(nav.content);
            container.append(content);
        };
        
        TabbedContainer.prototype.selectTabByIndex = function(index) {
            this.nav.find('a:eq('+index+')').tab('show');
        };

        return TabbedContainer;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmTabbedContainer', factory($));
    }

})();