(function() {
	'use strict';

	/**
	 *	Creates a modal dialog to 
	 */
	function factory($, widgetFactory, gadgetPref) {

		// Standard button types for a modal dialog
		var buttonTypes = {
			primary: 'btn-primary',
			action: 'btn-success'
		};

		function defaultRenderer(content) {
			return $('<p/>').text('' + content);
		}

		function createButton(buttonDef, modal) {
			var button = $('<button type="button" class="btn"></button>').text(buttonDef.text);

			buttonTypes[buttonDef.type] && button.addClass(buttonTypes[buttonDef.type]);

			if (buttonDef.callback) {
				button.click(function(e) {
					buttonDef.callback.call(this, e, modal);
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
			callback: function(e, modal) {
				modal.modal('hide');
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
					buttons.add(createButton(opts.buttons[i]));
				}

				this.footer = $('<div class="modal-footer"></div>').append(buttons).appendTo(element);
			}

			if (opts.content !== 'null') {
				this.body.append(opts.renderer(opts.content));
			}

			this.element.modal({ keyboard: false });
		};

		ModalDialog.prototype = {
			show: function() {
				this.modal.modal('show');
			},
			hide: function() {
				this.modal.modal('hide');
			},
			setContent: function(value) {
				this.body.empty().append(this.renderer(value));
			}
		}

		widgetFactory.make('tmModalDialog', ModalDialog);

		return ModalDialog;

	}

	// If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'tm/widgets/widgetFactory', 'gadgets.Pref', 'bootstrap'], factory);
	}
	else {
		factory($, tm.widgets.WidgetFactory, gadgets.Pref());
	}

})();