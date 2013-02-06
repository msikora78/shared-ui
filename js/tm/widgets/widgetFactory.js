(function() {
	'use strict';

	function factory($) {
		return {
			make: function(name, WidgetPrototype) {
				$.fn[name] = function() {
					var args = Array.prototype.slice.call(arguments);
					var returnedValue;

					this.each(function(i, element) {

						var widget = $.data(element, name);

						if (!widget) {
							widget = $.extend({}, this.mixin, WidgetPrototype.prototype);

							WidgetPrototype.call(widget, element, args[0]);

							$.data(element, name, widget);
						}

						if (typeof args[0] === 'string') {
							var name = args[0];
							var fn = widget[name] || basePrototype[name] || function() { throw new Error('Not a function: ' + name); };

							returnedValue = fn.apply(widget, args.slice(1));
						}

					});

					return typeof returnedValue !== 'undefined' ? returnedValue : this;
				}
			},
			fn: {
				destroy: function() {
					$.removeData(this.element);
				},
				option: function(name, value) {
					var fn = 'set' + name.replace(/^\w/, function(a) { return a.toUpperCase(); });

					this[fn] && this[fn](value);
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

		tm.widgets.WidgetFactory = factory($);
	}

})();