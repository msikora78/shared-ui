(function() {
	'use strict';

	/**
	 *	Creates the modal dialog prototype
	 *  @returns {Function} modal dialog prototype
	 */
	function factory($, gadgetPref) {

		// Standard button types for a modal dialog
		var buttonTypes = {
			primary: 'btn-primary',
			action: 'btn-success'
		};

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
			text: gadgetPref.getMsg('tm.widgets.modalDialog.ok'),
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
			buttons: [ okButton ],
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
			opts = $.extend({}, defaults, opts);

			this.element = element.addClass('modal hide fade');
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

			this.element.modal({ keyboard: false, backdrop: 'static', show: false });
		};

		ModalDialog.prototype = {
			/**
			 *	Shows the dialog
			 */
			show: function() {
				this.element.modal('show');
			},
			/**
			 *	Hides the dialog
			 */
			hide: function() {
				this.element.modal('hide');
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
		define(['jquery', 'gadgets.Pref', 'bootstrap'], factory);
	}
	else {
		tm.widgets.widgetFactory.make('tmModalDialog', factory($, gadgets.Pref()));
	}

})();