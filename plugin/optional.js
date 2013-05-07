/**
 *    This plugin allows for a module to be optional if not defined in config paths
 */
define([], function() {
    'use strict';

    define('optionalFallback', [], function() {
        return {};
    });

    function parse(name) {
        var arr = name.split(':');

        return {
            optionalModuleName: arr[0],
            fallbackModuleName: arr[1]
        };
    }

    return {
        normalize: function(name, normalize) {
            var parsed = parse(name);
            return parsed.optionalModuleName + ':' + (parsed.fallbackModuleName || 'optionalFallback');
        },

        load: function(name, req, load, config) {
            var parsed = parse(name);
            if (config.paths[parsed.optionalModuleName] === undefined) {
                req([parsed.fallbackModuleName], function(val) {
                    load(val);
                })
            }
            else {
                req([parsed.optionalModuleName], function(val) {
                    load(val);
                })
            }
        }
    };
});