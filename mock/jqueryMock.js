define([], function() {
	function extend(extendee) {
		for (var i = 1; i < arguments.length; i++) {
			var extender = arguments[i];
			for (var name in extender) {
				if (extender.hasOwnProperty(name)) {
					extendee[name] = extender[name];
				}
			}
		}
		return extendee;
	}

	return function() {
		var $ = function(arr) {
			var o = {};

			o.length = arr.length;
			for (var i = 0; i < arr.length; i++) {
				o[i] = arr[i];
			}

			extend(o, $.fn);

			return o;
		};

		$.fn = {
			each: function(fn) {
				for (var i = 0; i < this.length; i++) {
					fn.call(this[i], i, this[i]);
				}
			}
		};

		$.data = function(element, name, value) {};
		$.extend = extend;

		return $;
	}

});