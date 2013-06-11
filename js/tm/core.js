(function() {

    function factory(window, navigator) {
        var tm = window.tm || {};

        /**
         * @function
         * Allows to load touch device specific css classes
         */    
        tm.allowTouchDeviceSupport = function() {
            if ((/(iPad|iPhone|iPod|Android)/).test(navigator.userAgent)) {
                $('body').addClass('touch');
                document.addEventListener("touchstart", function(){}, true);
            }
        };

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
         * Allows to "inherit" the methods from a baseclass.
         *
         * Example:
         *  tm.inheritMethods(checkableBase, Checkbox);
         *
         * @param {Object} baseClass Object to inherit from.
         * @param {Object} currentClass Object that will receive the methods of baseClass
         */
        tm.inheritMethods = function(baseClass, currentClass) {
            var inheritedMethods = function() {
            };
            inheritedMethods.prototype = baseClass.prototype;
            currentClass.prototype = new inheritedMethods();
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

        return tm;
    }

    if (typeof define === 'function' && define.amd) {
        define(['global!window', 'global!navigator'], factory);
    }
    else {
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
        window.tm = factory(window, navigator);
    }

})();



