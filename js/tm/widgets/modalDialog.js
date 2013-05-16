(function() {
    'use strict';

    /**
     *	Creates the modal dialog prototype
     *  @returns {Function} modal dialog prototype
     */

    function factory($, gadgets) {
        var gadgetPrefs = new gadgets.Prefs();

        var ENTER = 13;
        var ESC = 27;

        // Standard button types for a modal dialog
        var buttonTypes = {
            primary: 'btn-primary',
            action: 'btn-success'
        };

        var actionTypes = {
            primary: 'data-primary-action',
            secondary: 'data-secondary-action'
        }

        /**
         *	Default renderer to use with a string content
         *	@param {String} content to render
         */

        function defaultRenderer(content) {
            return $('<p/>').text('' + content);
        }

        /**
         *	Creates a button from a button definition and binds a callback if required.
         *  @param {Object} buttonDef definition of the button
         *	@param {DIV} element modal dialog element
         */

        function createButton(buttonDef, element) {
            var button = $('<button type="button" class="btn"></button>').text(buttonDef.text);

            buttonTypes[buttonDef.type] && button.addClass(buttonTypes[buttonDef.type]);

            if (buttonDef.callback) {
                button.click(function(e) {
                    buttonDef.callback.call(this, e, element);
                });
            }

            if (buttonDef.attributes) {
                for (var name in buttonDef.attributes) {
                    if (buttonDef.attributes.hasOwnProperty(name)) {
                        button.attr(name, buttonDef.attributes[name]);
                    }
                }
            }

            return button;
        }

        // OK button to use by default if no other button is specified
        var okButton = {
            text: gadgetPrefs.getMsg('tm.widgets.modalDialog.ok'),
            type: 'primary',
            callback: function(e, element) {
                element.modal('hide');
            }
        };

        // Default options
        var defaults = {
            renderer: defaultRenderer,
            content: null,
            title: null,
            buttons: [okButton],
            size: null
        };

        /**
         *	Modal dialog's prototype with all the tm specific behaviors
         *	@class
         *	@constructor
         *	@param {DIV} element a div element to use to render the dialog
         *	@param {Object} opts creation options
         */
        var ModalDialog = function(element, opts) {
            var self = this;
            opts = $.extend({}, defaults, opts);

            this.element = element.addClass('modal hide fade').attr("tabindex", "-1");
            this.header = element.children('.modal-header');
            this.body = element.children('.modal-body');
            this.footer = element.children('.modal-footer');
            this.renderer = opts.renderer;

            if (!this.header.length && !this.body.length && !this.footer.length) {
                var content = element.children().detach();

                this.body = $('<div class="modal-body"></div>').append(content).appendTo(element);
            }

            if (!this.header.length) {
                var title = $('<h3/>').text(opts.title);

                this.header = $('<div class="modal-header"></div>').append(title).prependTo(element);
            }

            if (!this.footer.length) {
                var buttons = $();

                for (var i = 0; i < opts.buttons.length; i++) {
                    buttons = buttons.add(createButton(opts.buttons[i], element));
                }

                this.footer = $('<div class="modal-footer"></div>').append(buttons).appendTo(element);
            }

            if (opts.content !== null) {
                this.body.empty().append(opts.renderer(opts.content));
            }

            if (opts.size === 'large') {
                this.element.addClass('large');
            }

            this.element.modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });

            this.element.css(
            {
                'margin-top': function () {
                    return (window.pageYOffset || 20) - (self.element.height() / 2) - 20;
                },
                'margin-left': function () {
                    return (window.pageXOffset || 20) - (self.element.width() / 2) - 20;
                }
            });
            
        };

        ModalDialog.prototype = {
            /**
             * Returns the primary action button
             */
            getBtnPrimary: function() {
                return this.element.find('.btn-primary');
            },

            /**
             * Returns the secondary action button
             */
            getBtnSecondary: function() {
                return this.element.find('.btn:not(.btn-primary)');
            },

            /**
             * Bind an action
             * @param  {String} action action name
             * @param  {Integer} which  key code
             */
            bindKeyUp: function(actionType, which) {
                var $actionElement = this.element.find('.btn[' + actionType + ']');
                var $btnPrimary = this.getBtnPrimary();
                var $btnSecondary = this.getBtnSecondary();
                var triggerEvent = null;

                // If no data-action attr is set, try to set the default actions to buttons
                if ($actionElement.length == 0) {

                    // Set default primary action if only one primary button is found
                    if (actionType == actionTypes.primary && $btnPrimary.length == 1) {
                        $actionElement = $btnPrimary;
                    }

                    // Set default secondary action if only one secondary button is found
                    if (actionType == actionTypes.secondary && $btnSecondary.length == 1) {
                        $actionElement = $btnSecondary;
                    }

                    // Hide modal on esc even when no secondary button is defined
                    if (actionType == actionTypes.secondary && $btnSecondary.length == 0) {
                        $actionElement = this.element;
                    }
                }

                if (actionType == actionTypes.primary) {
                    triggerEvent = this.triggerPrimaryAction;
                }

                // Set default secondary action if only one secondary button is found
                if (actionType == actionTypes.secondary) {
                    if ($btnSecondary.length == 0) {
                        triggerEvent = this.triggerDefaultSecondaryAction;
                    }
                    else {
                        triggerEvent = this.triggerSecondaryAction;
                    }
                }

                $(document).on('keyup.tmModalDialog', function(e) {
                    e.which == which && triggerEvent && triggerEvent($actionElement);
                });
            },

            bindBackdropClick: function() {
                var $btnSecondary = this.getBtnSecondary();
                var self = this;
                $('.modal-backdrop').on('click', function() {
                    if ($btnSecondary.length == 0) {
                        self.triggerDefaultSecondaryAction(self.element);
                    }
                    else {
                        self.triggerSecondaryAction($btnSecondary);   
                    }
                });
            },

            /**
             * triggers primary action on specified button
             * @param  {input} btn Button on which to trigger click event
             */
            triggerPrimaryAction: function(btn) {
                btn.click();
            },

            /**
             * triggers secondary action on specified button
             * @param  {input} btn Button on which to trigger click event
             */
            triggerSecondaryAction: function(btn) {
                btn.click();
            },

            /**
             * triggers default secondary action
             * @param  {object} el Element on which to trigger modal.hide
             */
            triggerDefaultSecondaryAction: function(el) {
                el.modal('hide');
            },

            /**
             * Unbind an action
             * @param  {String} action action name
             */
            unbindKeyUp: function(action) {
                $(document).off('keyup.tmModalDialog');
            },

            unbindBackdropClick: function() {
                $('.modal-backdrop').off('click');
            },

            /**
             *	Shows the dialog
             */
            show: function() {
                var self = this;
                this.element.modal('show');
                this.bindKeyUp(actionTypes.primary, ENTER);
                this.bindKeyUp(actionTypes.secondary, ESC);
                this.bindBackdropClick();
            },
            /**
             *	Hides the dialog
             */
            hide: function() {
                this.element.modal('hide');
                this.unbindKeyUp(actionTypes.primary, ENTER);
                this.unbindKeyUp(actionTypes.secondary, ESC);
                this.unbindBackdropClick();
            },
            /**
             *	Sets the content and render it
             * 	@param {Object} value to render
             */
            setContent: function(value) {
                this.body.empty().append(this.renderer(value));
            }
        }

        return ModalDialog;

    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmModalDialog', factory($, gadgets));
    }

})();