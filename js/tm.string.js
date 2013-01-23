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
