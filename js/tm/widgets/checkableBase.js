(function() {
	"use strict";

	function factory($) {
		var labelsEventsHandledByBrowser = true;

		var CheckableBase = function(element, opts) {
			if ($.browser) {
				labelsEventsHandledByBrowser = !$.browser.msie || parseFloat($.browser.version) > 8;
			}
			this._labelsEventsHandledByBrowser = labelsEventsHandledByBrowser;
			this.element = $(element).hide();
			this.span = $('<span class="' + this.className + '" />').insertAfter(this.element);;
			this.parentLabel = this.element.closest("label");
			this.linkedLabels = $("label[for='" + this.element.attr('id') + "']");

			this._attachEventHandlers();

			this._setState(this.element.attr("checked") != undefined);
		}

		CheckableBase.prototype = {
			setEnabled: function(isEnabled) {
				if (isEnabled) {
					this.element.removeAttr("disabled");
				} else {
					this.element.attr("disabled", "disabled");
				}
				this._setState(this.element.prop("checked"));
			},

			getEnabled: function() {
				return (this.element.attr("disabled") != undefined);
			},

			setChecked: function(isChecked) {
				this._setState(isChecked);
			},

			_click: function(e) {
				if ($(e.target).prop("tagName") != "INPUT") {
					if (!this.element.attr("disabled")) {
						this._onClick && this._onClick(e);
						this.element.triggerHandler("change");
						this.element.triggerHandler("click");
						e.stopImmediatePropagation();
					}
				}
			},

			_elementClick: function(e) {
				this._onElementClick && this._onElementClick(e);
			},

			_setState: function(state, element) {
				if (!element) {
					element = this.element;
				}

				var spriteX = ((element.attr("disabled")) ? this.spriteWidth * -1 : 0) - this.spriteLeft;
				var spriteY = ((state) ? this.spriteHeight * -1 : 0) - this.spriteTop;

				if (state) {
					element.prop("checked", true);
				}
				else {
					element.prop("checked", false);
				}

				element.next().css({backgroundPosition: spriteX + "px " + spriteY + "px"});
			},

			_toggleState: function() {
				this._setState(!this.element.prop("checked"));
			},

			_eventHandler: function(callback) {
				var self = this;
				return function(event) {
					return callback.call(self, event);
				};
			},

			_attachEventHandlers: function() {
				var self = this;
				this.element.click(this._eventHandler(this._elementClick, this));
				
				if (!labelsEventsHandledByBrowser) {
					this.span.click(this._eventHandler(this._click, this));
					this.parentLabel.click(this._eventHandler(this._click, this));
					if (this.parentLabel.length == 0) {
						this.linkedLabels.click(this._eventHandler(this._click, this));
					}
				} else {
					if (this.parentLabel.length == 0) {
						this.span.click(this._eventHandler(this._click, this));
					}
				}

				this.element.closest('form').on('reset', function() {
				    var isChecked = self.element.prop("checked");
				    setTimeout(function() {
						if (isChecked != self.element.prop("checked")) {
							self._setState(self.element.prop("checked"));
						}
				    }, 0);
				});
			}
		};

		return CheckableBase;
	}

	// If requirejs exists, we want to use it to manage dependencies, otherwise, we will use the global declarations
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else {
		tm.namespace('tm.widgets');

		tm.widgets.checkableBase = factory($);
	}
})();