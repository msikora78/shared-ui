/**
 * @namespace tm.string  Convenience methods for tmString manipulation.
 */
(function() {

    function factory(_) {
        var tmString = {};

        /**
         * @function
         * Makes the first character in a tmString uppercase.
         *
         * Examples:
         *  tmString.capitalize("fooBar"); // FooBar
         *  tmString.capitalize("FOOBAR"); // FOOBAR
         *  tmString.capitalize("foobar"); // Foobar
         *
         * @param {String} s  starting tmString
         * @return {String}   capitalized tmString
         */
        tmString.capitalize = function(s) {
            return s.charAt(0).toLocaleUpperCase() + s.slice(1);
        };

        /**
         * @function
         * Makes the first character in a tmString lowercase.
         *
         * Examples:
         *  tmString.uncapitalize("FooBar"); // fooBar
         *
         * @param {String} s  starting tmString
         * @return {String}   lowercased tmString
         */
        tmString.uncapitalize = function(s) {
            return s.charAt(0).toLocaleLowerCase() + s.slice(1);
        };

        /**
         * @function
         * Converts a tmString to camel-case on dash or underscore 
         * characters while removing them.
         *
         * Examples:
         *  tmString.camelize("foo_bar_baz"); // FooBarBaz
         *  tmString.camelize("foo-bar-baz"); // FooBarBaz
         *  tmString.camelize("FooBar-baz"); // FooBarBaz
         *  tmString.camelize("Foo-BAR-Baz"); // FooBARBaz
         *
         * @param {String} s  starting tmString
         * @return {String}   camelized tmString
         */
        tmString.camelize = function(s) {
            var parts = s.split(/[_-]/);
            return _(parts).map(function(ss) {
                return tmString.capitalize(ss);
            }).join('');
        };

        /**
         * @function
         * Same as camelize, but first character will be lower-case.
         *
         * @param {String} s  starting tmString
         * @return {String}   lowerCamelized tmString
         */
        tmString.lowerCamelize = function(s) {
            return tmString.uncapitalize(tmString.camelize(s));
        };

        /**
         * @function
         * Truncates a tmString and adds ellipses (...).
         *
         * Examples:
         *  tmString.truncate("Foo bar baz", 4); // F...
         *  tmString.truncate("Foo bar baz", 10); // Foo bar...
         *  tmString.truncate("Foo bar baz", 11); // Foo bar baz
         *  tmString.truncate("Foo bar baz", 100); // Foo bar baz
         *
         * @param {String} s  starting tmString
         * @param {Int} n  max length of the tmString (3+)
         * @return {String}   truncated or original tmString
         */
        tmString.truncate = function(s, n) {
            if (n >= s.length){
                return s;
            }
            return s.substring(0, n-3) + "...";
        };

        /**
         * @function
         * Validates an email tmString.
         *
         * Examples:
         *  tmString.validateEmail("foo@bar.com"); // true
         *  tmString.validateEmail("foo@bar"); // false
         *  tmString.validateEmail(""); // false
         *
         * @param {String} email  email tmString
         * @return {Boolean}   true if email is valid
         */
        tmString.validateEmail = function(email) {
            if (!email){
                return false;
            }
            // Regexp "borrowed" from http://docs.jquery.com/Plugins/Validation/Methods/email
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
        };

        return tmString;
    }

    // Use requirejs to manage dependencies, if available
    if (typeof define === 'function' && define.amd) {
        define(['underscore'], factory);
    }
    else {
        tm.namespace("tm.string");
        tm.string = factory(_);        
    }

})();
