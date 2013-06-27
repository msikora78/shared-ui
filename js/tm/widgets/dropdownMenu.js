(function() {
    "use strict";

    function factory($, gadgets) {
        var gadgetPrefs = new gadgets.Prefs();

        var DropdownMenu = function(element, opts) {

            this.opts = $.extend({
                buttonText: "Select",
                items: []
            }, opts);

            //Handle if element is a SELECT or DIV
            var isElementSelect = false;
            if (element[0].nodeName === "SELECT") {
                isElementSelect = true;
                this.group = $('<div>');
                this.element = element.hide();
            } else {
                var group = element.parent();
                if (group && !group.hasClass('btn-group')) {
                    this.group = $('<div>');
                    this.group.appendTo(element);
                } else {
                    this.group = group;
                }
            }

            this.group.addClass('btn-group');

            //Render Button
            var isElementBtn = $(element).hasClass('btn');
            if (isElementBtn) {
                this.btn = $(element);
            } else {
                this.btn = $(element).find(".btn").length  || $('<button>' + this.opts.buttonText + '</button>');
            }
            this.btn.addClass('btn dropdown-toggle').attr('data-toggle', "dropdown");

            //Render Caret
            var caret = this.btn.find('.caret');
            if (!caret.length) {
                this.btn.append('<span class="caret" />');
            }

            //Render Menu
            var ul = this.group.find('ul');
            var isMarkupWrite = false;
            if (!ul.length) {
                this.ul = $('<ul>');
            } else {
                isMarkupWrite = true;
                this.ul = ul;
            }

            this.ul.addClass('dropdown-menu');

            // Append to DOM
            // this.group.append(this.btn, this.ul);
            if (isElementSelect) {
                this.group.append(this.btn, this.ul);
                this._generateListFromSelect();
                this.group.insertAfter(this.element);
            } else {
                if (!this.ul.find('li').length && !isMarkupWrite) {
                    this.group.append(this.btn, this.ul);
                    this._generateListFromOpts();
                }
            }

            this._bind();

        }

        DropdownMenu.prototype = {

            _bind: function() {
                var self = this;

                this.btn.click(function(e) {
                    self.ul.css("min-width", $(this).innerWidth() + "px");
                });

            },

            /**
             * Add Item to the list
             * @param  {Object} item > { text: "String", value: "String", href: "String" }
             */
            addItem: function(item) {
                this.opts.items.push(item);
                this.ul.append(this._$createMenuItem(item.text, item.value, item.href));
            },

            /**
             * Remove Item from list
             * @param  {String} value
             */
            removeItem: function(value) {
                for (var i = 0; i < this.opts.items.length; i++) {
                    if (this.opts.items[i].value == value) {
                        this.opts.items.splice(i, 1);
                    }
                }
                var self = this;
                this.ul.find('li').each(function(val, el) {
                    if ($(this).find("a").data('value') == value) {
                        $(this).remove();
                    }
                });
            },

            /**
             * Get Button Jquery Element
             * @return ${Element}
             */
            $getButton: function(){
                return this.btn;
            },

            $getMenu: function(){
                return this.ul;
            },

            _$createMenuItem: function(text, value, href) {
                var self = this;

                var defaultHref = href ? href : "javaScript:void(0);";

                var link = $('<a href="' + defaultHref + '" data-value="' + value + '" tabindex="-1">' + text + '</a>');
                link.click(function(e) {
                    var value = $(this).data('value');
                    for (var i = 0; i < self.opts.items.length; i++) {
                        if (value && self.opts.items[i].value == value) {
                            if (self.opts.items[i].callback) {
                                self.opts.items[i].callback();
                            }
                            break;
                        }
                    }
                });

                return $('<li>').append(link);
            },

            /**
             * Generate widget using Select element
             */
            _generateListFromSelect: function() {
                var self = this;
                this.element.children('option').each(function(val, item) {

                    var dataHref = $(item).data('href');
                    var li = self._$createMenuItem(item.text, item.value, dataHref);

                    self.ul.append(li);
                });
            },

            /**
             * Generate List if a list of item is pass trought opts object.
             */
            _generateListFromOpts: function() {

                for (var i = 0; i < this.opts.items.length; i++) {
                    var item = this.opts.items[i];
                    var li = this._$createMenuItem(item.text, item.value, item.href);
                    this.ul.append(li);
                }
            }
        };

        return DropdownMenu;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmDropdownMenu', factory($, gadgets));
    }
})();