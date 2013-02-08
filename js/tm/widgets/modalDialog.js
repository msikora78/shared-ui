(function() {
	'use strict';

	/**
	 *	Creates a modal dialog to 
	 */
	function factory($, gadgetPref) {

		// Standard button types for a modal dialog
		var buttonTypes = {
			primary: 'btn-primary',
			action: 'btn-success'
		};

		function defaultRenderer(content) {
			return $('<p/>').text('' + content);
		}

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

		var okButton = {
			text: gadgetPref.getMsg('tm.widgets.modalDialog.ok'),
			type: 'primary',
			callback: function(e, element) {
				element.modal('hide');
			}
		};

		var defaults = {
			renderer: defaultRenderer,
			content: null,
			title: null,
			buttons: [ okButton ]
		};

		var ModalDialog = function(element, opts) {
			opts = $.extend({}, defaults, opts);

			this.element = element.addClass('modal hide');
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

			this.element.modal({ keyboard: false, backdrop: 'static', show: false });
		};

		ModalDialog.prototype = {
			show: function() {
				this.element.modal('show');
			},
			hide: function() {
				this.element.modal('hide');
			},
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