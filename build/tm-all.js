/** Prevent console.log from blowing up if it's not available. */
if (!window.console || !window.console.log) {
    var n = [
        "log", "debug", "info", "warn", "error", "assert",
        "dir", "dirxml", "group", "groupEnd", "time", "timeEnd",
        "count", "trace", "profile", "profileEnd"
    ];

    window.console = {};
    var noOp = function(){};
    for (var i = 0; i < n.length; ++i) {
        window.console[n[i]] = noOp;
    }
}

/** Check for jQuery */
if (!window.jQuery){
    console.log("missing jQuery");
}

/** 
 * @namespace  Global Ticketmaster/Livenation namespace.
 */
window.tm = window.tm || {};


/**
 * @function
 * Creates an empty object hierarchy representing the specified path 
 * to allow new properties to be attached.
 *
 * For example, normally if you wanted to define a.b.c.d.e = "foo" 
 * you would have to do it like this:
 *  a = {
 *      b: {
 *          c: {
 *              d: {
 *                  e: "foo"
 *              }
 *          }
 *      }
 *  };
 *
 * With the tm.namespace function, you can do this instead:
 *  tm.namespace("a.b.c.d");
 *  a.b.c.d.e = "foo";
 *
 * @param {String} namespace  String representation of the hierarchy
 * @return {Object}           Object having the specified hierarchy
 */
tm.namespace = function(namespace) {
    var parts = namespace.split('.');
    var current = window;
    for (var i=0, len=parts.length; i < len; i++) {
        var next = current[parts[i]];
        if (typeof(next) !== 'object' || jQuery.isArray(next)) {
            current = current[parts[i]] = {};
        }
        else {
            current = next;
        }
    }
};

/**
 * @function
 * This is the opposite of tm.namespace.  Provided a dot-notation expression,
 * it will look up the object in the hierarchy, starting at the global
 * window object.
 *
 * Example:
 *  var logFunction = tm.resolveObject('console.log');
 *  logFunction("Whee!"); // 'Whee!' will show up in the console.
 *
 * @param {String} path  String representation of the object
 * @return {Object}      Object having the specified hierarchy, or undefined
 */
tm.resolveObject = function(path) {
    var parts = path.split('.');
    var current = window;
    for (var i=0, len=parts.length; i < len; i++) {
        var next = current[parts[i]];
        if (typeof(next) === 'undefined') {
            return undefined;
        }
        else {
            current = next;
        }
    }
    return current;
};

/**
 * @function
 * Copies all properties from one or more objects into a new object. 
 * Similar to jQuery.extend, but skips properties with null 
 * values and doesn't affect the original objects.
 *
 * Example:
 *  var itemA = { key1: 'val1'};
 *  var itemB = { key1: null, key2: 'val2'};
 *  var itemAB = tm.combine(itemA, itemB); // { key1: 'val1', key2: 'val2'}
 *
 * @params {Object, ...} arguments List of objects with properties to combine
 * @return {Object}                Object containing the combined properties
 */
tm.combine = function (/* obj1, obj2, ... */){
    var combined = {};
    for (var i=0, len=arguments.length; i<len; i++) {
        var arg = arguments[i];
        for (var p in arg) {
            if (arg[p] !== null) {
                combined[p] = arg[p];
            }
        }
    }
    return combined;
};


/**
 * @function
 * Applies "small-screen" class to body if browser window 
 * width is below threshold, for snap width functionality.
 *
 * @see https://confluence.tm.tmcs/confluence/display/UE/TM360
 *
 * Call once on init. If not using screen width, call again
 * on resize event, but throttle for performance.
 *
 * Example:
 *  tm.widthCheck(false);
 *  $(window)resize(
 *      // limit tm.widthCheck calls to once every 200ms
 *      $.throttle(200, function(event){
 *          tm.widthCheck(false);
 *      });
 *  );
 *
 * @param {Boolean|null} useScreenWidth  Flag to use screen width instead of browser window width
 * @return {Boolean}                     Result of the width check; true if below threshold and screen considered 'small'     
 */
tm.widthCheck = function(useScreenWidth){
    var threshold = 1252;
    var el = $("body");
    var prop = "small-screen";

    var w = useScreenWidth ? screen.width : $(window).width();
    var isSmall = (w <= threshold);
    if (isSmall !== el.hasClass(prop)){
        // add/remove body class
        el[isSmall ? "addClass" : "removeClass"](prop);
    }

    return isSmall;
};

/**
 * @boolean
 * Convenience flag set to true if iOS device detected.
 */
tm.iOS = /iPhone|iPod|iPad/.test(navigator.userAgent);

/**
 * @boolean
 * Convenience flag set to true if high resolution display detected (ie. Retina display).
 */
tm.hiResDisplay = !!(window.devicePixelRatio && window.devicePixelRatio >= 2);
(function() {

    function factory(document) {

        var cookie = {};

        /**
         * @function
         * Creates or updates a cookie.
         *
         * @param {String} name   Cookie id
         * @param {String} value  Cookie value
         * @param {int}    days   Optional number of days the cookie should live
         */
        cookie.create = function (name,value,days) {
            var expires = "";
            if (days) { // else session cookie
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                expires = "; expires="+date.toUTCString();
            }
            document.cookie = name+"="+encodeURIComponent(value) + expires + "; path=/";
        };


        /**
         * @function
         * Reads a cookie's value.
         *
         * @param {String} name  Cookie id
         * @return {String|null} Cookie value
         */
        cookie.read = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return decodeURIComponent( c.substring(nameEQ.length,c.length) );
                }
            }
            return null;
        };

        /**
         * @function
         * Removes/expires a cookie.
         *
         * @param {String} name  Cookie id
         */
        cookie.erase = function (name) {
            cookie.create(name,"",-1);
        };

        return cookie;
    }

    if (typeof define === 'function' && define.amd) {
        define(['document'], factory);
    }
    else {

        /** 
         * @namespace Convenience methods for handling cookies.
         */
        tm.namespace("tm.cookie");

        tm.cookie = factory(document);

    }

})();

/**
 * @namespace Convenience methods for string manipulation.
 */
tm.namespace("tm.string");

/**
 * @function
 * Makes the first character in a string uppercase.
 *
 * Examples:
 *  tm.string.capitalize("fooBar"); // FooBar
 *  tm.string.capitalize("FOOBAR"); // FOOBAR
 *  tm.string.capitalize("foobar"); // Foobar
 *
 * @param {String} s  starting string
 * @return {String}   capitalized string
 */
tm.string.capitalize = function(s) {
    return s.charAt(0).toLocaleUpperCase() + s.slice(1);
};

/**
 * @function
 * Makes the first character in a string lowercase.
 *
 * Examples:
 *  tm.string.uncapitalize("FooBar"); // fooBar
 *
 * @param {String} s  starting string
 * @return {String}   lowercased string
 */
tm.string.uncapitalize = function(s) {
    return s.charAt(0).toLocaleLowerCase() + s.slice(1);
};

/**
 * @function
 * Converts a string to camel-case on dash or underscore 
 * characters while removing them.
 *
 * Examples:
 *  tm.string.camelize("foo_bar_baz"); // FooBarBaz
 *  tm.string.camelize("foo-bar-baz"); // FooBarBaz
 *  tm.string.camelize("FooBar-baz"); // FooBarBaz
 *  tm.string.camelize("Foo-BAR-Baz"); // FooBARBaz
 *
 * @param {String} s  starting string
 * @return {String}   camelized string
 */
tm.string.camelize = function(s) {
    var parts = s.split(/[_-]/);
    return _(parts).map(function(ss) {
        return tm.string.capitalize(ss);
    }).join('');
};

/**
 * @function
 * Same as camelize, but first character will be lower-case.
 *
 * @param {String} s  starting string
 * @return {String}   lowerCamelized string
 */
tm.string.lowerCamelize = function(s) {
    return tm.string.uncapitalize(tm.string.camelize(s));
};

/**
 * @function
 * Truncates a string and adds ellipses (...).
 *
 * Examples:
 *  tm.string.truncate("Foo bar baz", 4); // F...
 *  tm.string.truncate("Foo bar baz", 10); // Foo bar...
 *  tm.string.truncate("Foo bar baz", 11); // Foo bar baz
 *  tm.string.truncate("Foo bar baz", 100); // Foo bar baz
 *
 * @param {String} s  starting string
 * @param {Int} n  max length of the string (3+)
 * @return {String}   truncated or original string
 */
tm.string.truncate = function(s, n) {
    if (n >= s.length){
        return s;
    }
    return s.substring(0, n-3) + "...";
};

/**
 * @function
 * Validates an email string.
 *
 * Examples:
 *  tm.string.validateEmail("foo@bar.com"); // true
 *  tm.string.validateEmail("foo@bar"); // false
 *  tm.string.validateEmail(""); // false
 *
 * @param {String} email  email string
 * @return {Boolean}   true if email is valid
 */
tm.string.validateEmail = function(email) {
    if (!email){
        return false;
    }
    // Regexp "borrowed" from http://docs.jquery.com/Plugins/Validation/Methods/email
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
};
/**
 * @namespace Convenience methods for handling dates and times.
 */
tm.namespace("tm.date");

/**
 * @function
 * Formats a date object into YYYY-MM-DD format
 *
 * Example:
 *  tm.date.formatYMD(new Date(2012, 1, 1)); // 2012-01-01
 *
 * @param {Date} date  The date object to format
 * @return {String}    Formatted date string
 */
tm.date.formatYMD = function(date) {
    var m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var d = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + m + "-" + d;
};

/**
 * @function
 * Formats a date object into M/D/YYYY format
 *
 * Examples:
 *  tm.date.formatMDY(new Date(2012, 1, 1)); // 1/1/2012
 *  tm.date.prettyPrint(new Date(2012, 1, 1)); // 1/1/2012
 *
 * @param {Date} date  The date object to format
 * @return {String}    Formatted date string
 */
tm.date.formatMDY = function(date) {
    return date.getMonth() + 1  + "/" + date.getDate() + "/" + date.getFullYear();
};

/** Alias for tm.date.formatMDY */
tm.date.prettyPrint = tm.date.formatMDY;

/**
 * @function
 * Adjusts a date object by the specified number of days.
 *
 * @param {Date} date  The date object to adjust
 * @param {int} days   The number of days to add (or subtract if negative)
 * @return {Date}      The date object
 */
tm.date.offsetDays = function(date, days) {
    date.setDate(date.getDate() + days);
    return date;
};

/**
 * @function
 * Converts milliseconds to mm:ss format, for countdowns etc.
 *
 * Example:
 *  tm.date.prettyPrintMS(1200000); // 20:00
 *
 * @param {int} ms   milliseconds
 * @return {String}  minutes:seconds string
 */
tm.date.prettyPrintMS = function(ms) {
    var min = 0, sec = 0;
    if (ms > 0){
        min = Math.floor(ms/60000);
        sec = Math.floor((ms-(min*60000))/1000);
    }
    if (sec <= 9){
        sec = "0" + sec;
    }
    return min + ":" + sec;
};
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

							WidgetPrototype.call(widget, element, args[0]);

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

})();(function() {
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