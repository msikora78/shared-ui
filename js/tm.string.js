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
