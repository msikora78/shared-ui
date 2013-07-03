(function() {
    "use strict";

    function factory($, gadgets) {
        var gadgetPrefs = new gadgets.Prefs();

        var Dropdown = function(element, opts) {

            this.opts = opts;
            this.element = element.tmDropdownMenu(this.opts);

            this.widget = this.element.data('tmDropdownMenu');

            // Preserve width when selecting a smaller/bigger element
            this.widget.btn.width(this.widget.btn.width());
            this.widget.ul.addClass('dropdown-list');

            this._bind();
        }

        Dropdown.prototype = {

            _bind: function() {
                var self = this;

                this.widget.ul.bind('change', function(e) {
                    var text = self.widget.getTextByValue($(e.target).data('selected-value'));
                    if (text) {
                        self.widget.setButtonText(text);
                    }
                });
            },

            /**
             * Add Item to the list
             * @param  {Object} item > { text: "String", value: "String", href: "String", callback: "Function" }
             */
            addItem: function(item) {
                this.widget.addItem(item);
            },

            /**
             * Remove Item from list
             * @param  {String} value
             */
            removeItem: function(value) {
                var isValueAlreadySelected = this.getData() == value;
                if (isValueAlreadySelected) {
                    this.setData(null);
                }
                this.widget.removeItem(value);
            },

            getData: function() {
                return this.widget.ul.data('selected-value') || null;
            },

            setData: function(value) {
                this.widget.delegate.setValue(value);
                this.widget.setButtonText(this.widget.getTextByValue(value));
            },

            _getMenuItemByValue: function(value) {
                var menu = this.widget.getMenu();
                menu.find('li a').each(function(val, item) {
                    var el = $(item);
                    if (el.data('value') === value) {
                        return $(item);
                    }
                });

                return null;
            }

        };

        return Dropdown;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'bootstrap', 'widget!tm/widgets/dropdownMenu'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmDropdown', factory($, gadgets));
    }
})();