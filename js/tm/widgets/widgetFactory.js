(function() {
	'use strict';

	function factory($) {
		return {
			/**
			 *	Makes a widget from a prototype
			 */
			make: function(name, WidgetPrototype) {
				var self = this;

				$.fn[name] = function() {
					var args = Array.prototype.slice.call(arguments);
					var returnedValue;

					this.each(function(i, element) {

						var widget = $.data(element, name);

						if (!widget) {
							widget = $.extend({}, self.mixin, WidgetPrototype.prototype);

							WidgetPrototype.call(widget, $(element), args[0]);

							$.data(element, name, widget);
						}

						if (typeof args[0] === 'string') {
							var functionName = args[0];
							var fn = widget[functionName] || function() { throw new Error('Not a function: ' + functionName); };

							returnedValue = fn.apply(widget, args.slice(1));
						}

					});

					return typeof returnedValue !== 'undefined' ? returnedValue : this;
				}
			},
			/**
			 *	Base functionalities for any widgets
			 */
			mixin: {
				destroy: function() {
					$.removeData(this.element);
				},
				option: function(name, value) {
					var prefix = typeof value !== 'undefined' ? 'set' : 'get';
					var fn = prefix + name.replace(/^\w/, function(a) { return a.toUpperCase(); });

					return this[fn] && this[fn](value);
				}
			}
		}
	}

	// If requirejs exists, we want to use it to manage dependencies, otherwise, we will use the global declarations
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else {
		tm.namespace('tm.widgets');

		tm.widgets.widgetFactory = factory($);
	}

})();