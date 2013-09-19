(function() {
    "use strict";

    function factory($) {

        var KEY = {
            ENTER: 13,
            ESC: 27,
            ARROW_UP: 38,
            ARROW_DOWN: 40,
            TAB: 9
        };

        /**
         * Delegate to handle widget generation type.
         */
        var SelectDelegate = function(ul, select) {
            this.ul = ul;
            this.select = select;
            var self = this;
            this.select.change(function() {
                self.ul.data('selected-value', $(this).val());
            });

        };
        SelectDelegate.prototype.setValue = function(value) {
            this.select.val(value);
            this.select.change();
        };
        var ULDelegate = function(ul) {
            this.ul = ul;
        };
        ULDelegate.prototype.setValue = function(value) {
            this.ul.data('selected-value', value);
        };
        var ArrayDelegate = function(ul, list) {
            this.ul = ul;
            this.list = list;
        };
        ArrayDelegate.prototype.setValue = function(value) {
            for (var i = 0; i < this.list.length; i++) {
                if (value && this.list[i].value == value) {
                    if (this.list[i].callback) {
                        this.list[i].callback();
                    }
                    break;
                }
            }
            this.ul.data('selected-value', value);
        };

        /**
         * Widget
         * @param  {$Element} element
         * @param  {Object} opts
         */
        var DropdownMenu = function(element, opts) {

            this.opts = $.extend({
                buttonText: "",
                items: []
            }, opts);

            this.tabIndex = 0;

            //Handle if element is a SELECT or DIV
            var isElementSelect = false;
            if (element[0].nodeName === "SELECT") {
                isElementSelect = true;
                this.group = $('<div>');
                this.element = element.hide();
            } else {
                var group = element.parent();
                if (group && !group.hasClass('btn-group')) {
                    element.wrap($('<div>'));
                    this.group = element.parent();
                } else {
                    this.group = group;
                }
            }

            this.group.addClass('btn-group');

            //Render Button
            var isElementBtn = element.hasClass('btn');
            if (isElementBtn) {
                this.btn = element;
            } else {
                this.btn = $('<a href="javascript:void(0);"></a>');
            }

            this.btn.addClass('btn dropdown-toggle').attr('data-toggle', "dropdown");

            //Render Caret
            this.caret = this.btn.find('.caret');
            if (!this.caret.length) {
                this.caret = $('<span class="caret" />');
                this.btn.append(this.caret);
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

            this._initButtonText();
            this.ul.addClass('dropdown-menu').attr('data-selected-value', 'null');

            // Append to DOM
            if (isElementSelect) {
                this.group.append(this.btn, this.ul);
                this._generateListFromSelect();
                this.group.insertAfter(this.element);
                this.delegate = new SelectDelegate(this.ul, this.element);
            } else {
                if (!this.ul.find('li').length && !isMarkupWrite) {
                    this.group.append(this.btn, this.ul);
                    this._generateListFromOpts();
                    this.delegate = new ArrayDelegate(this.ul, this.opts.items);
                } else {
                    this.delegate = new ULDelegate(this.ul);
                }
            }

            this.ul.find('a').addClass('nowrap').attr('tabindex', 0);
            this._bind();

        };

        DropdownMenu.prototype = {

            _bind: function() {
                var self = this;

                this.btn.click(function(e) {
                    self._adjustMenuWidth();
                    if (self.group.hasClass('open')) {
                        self.group.removeClass('open');
                        e.stopPropagation();
                    }
                });

                this.ul.click(function(e) {
                    var a = $(e.target).closest('a', this);
                    if (a.length) {
                        var value = typeof a.data('value') === 'undefined' ? null : a.data('value');
                        self.ul.data('selected-value', value);
                        self.delegate.setValue(value);
                        self.ul.change();
                    }
                });

                this.group.on('keydown', function(e) {

                    var el = $(e.target);

                    // handle enter key
                    if (e.keyCode === KEY.ENTER && self.ul.hasClass('dropdown-list') && el.is('a')) {
                        var value = typeof el.data('value') === 'undefined' ? null : el.data('value');
                        self.ul.data('selected-value', value);
                        self.delegate.setValue(value);
                        self.ul.change();
                        self.btn.focus();
                        self.group.removeClass('open');
                        return false;
                    }

                    // handle escape key
                    if (e.keyCode === KEY.ESC) {
                        self.group.removeClass('open');
                        return false;
                    }

                    // handle up arrow | down arrow
                    if (e.keyCode === KEY.ARROW_UP || e.keyCode === KEY.ARROW_DOWN) {
                        if (el.is(self.btn.get(0)) && e.keyCode === KEY.ARROW_DOWN) {
                            self.ul.find('a:first').focus();
                            return false;
                        }
                        if (el.parents(self.ul).length) {
                            var nextTargetFocus;
                            if (e.keyCode === KEY.ARROW_UP) {
                                nextTargetFocus = el.closest('li', this).prev().find('a');
                            } else if (e.keyCode === KEY.ARROW_DOWN) {
                                nextTargetFocus = el.closest('li', this).next().find('a');
                            }
                            nextTargetFocus.focus();
                        }
                        e.stopPropagation();
                        return false;
                    }

                    if (e.keyCode === KEY.TAB) {
                        setTimeout(function() {
                            if(!checkFocus()){
                                self.group.removeClass('open');
                            }
                        }, 0);
                    }

                    function checkFocus() {
                        var found = self.ul.find('a:focus');
                        return found.length > 0;
                    }
                });
            },
            _initButtonText: function() {

                var useDefaultText = true;
                if (this.btn.text() != "") {
                    this.setButtonText(this.btn.text());
                    useDefaultText = false;
                }

                if (this.opts.buttonText != "") {
                    this.setButtonText(this.opts.buttonText);
                    useDefaultText = false;
                }
                if (useDefaultText) {
                    if (this.ul.hasClass('dropdown-list')) {
                        this.setButtonText("Select");
                    } else {
                        this.setButtonText("Select Action");
                    }
                }
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

            setButtonText: function(text) {
                var targetText = text != null ? text : this.opts.buttonText
                this.btn.text(targetText).append(this.caret);

            },

            getTextByValue: function(value) {

                var text = null;
                this.ul.find('a').each(function(val, item) {
                    if ($(item).data('value') === value) {
                        text = $(item).text();
                    }
                });

                return text;
            },

            _$createMenuItem: function(text, value, href) {

                var defaultHref = href ? href : "javaScript:void(0);";
                var link = $('<a class="nowrap" href="' + defaultHref + '" data-value="' + value + '" tabindex="' + this.tabIndex + '"></a>').text(text);

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
            },

            _adjustMenuWidth: function() {
                this.ul.css("width", this.btn.innerWidth() + "px");
            }
        };

        return DropdownMenu;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmDropdownMenu', factory($));
    }
})();