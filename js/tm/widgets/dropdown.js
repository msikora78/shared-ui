(function() {
    "use strict";

    function factory($, gadgets) {
        var gadgetPrefs = new gadgets.Prefs();

        var Dropdown = function(element, opts) {

            this.opts = opts;
            this.element = element.tmDropdownMenu(this.opts);

            this.dropdownMenu = this.element.data('tmDropdownMenu');
            this.dropdownMenu.getButton().attr('data-value', 'null');
        }

        Dropdown.prototype = {

            _bind: function() {

            },

            /**
             * Add Item to the list
             * @param  {Object} item > { text: "String", value: "String", href: "String" }
             */
            addItem: function(item) {
                this.tmDropdownMenu.addItem(item);
            },

            /**
             * Remove Item from list
             * @param  {String} value
             */
            removeItem: function(value) {
                this.dropdownMenu.removeItem(value);
            },

            getData: function() {
                return this.dropdownMenu.getButton().data('value');
            },

            setData: function(value) {

                var btn = this.dropdownMenu.getBtn();

                var item = this._getMenuItemByValue(value);

                if (item !== null) {
                    btn.text(item.text());
                    btn.data('value', item.data('value'));
                } else {
                    btn.text(this.opts.buttonText);
                    btn.data('value', "null");
                }

            },

            _getMenuItemByValue: function(value) {
                var menu = this.dropdownMenu.getMenu();
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
        define(['jquery', 'global!gadgets', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmDropdown', factory($, gadgets));
    }
})();