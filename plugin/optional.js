/**
 *    This plugin allows for a module to be optional if not defined in config paths
 */
define([], function() {
    'use strict';

    function parse(name) {
        var arr = name.split(':');

        return {
            optionalModuleName: arr[0],
            fallbackModuleName: arr[1]
        };
    }

    return {
        load: function(name, req, load, config) {
            var parsed = parse(name);
            if (config.paths[parsed.optionalModuleName] === undefined) {
                if (parsed.fallbackModuleName === undefined) {
                    load(undefined);
                }
                else {
                    req([parsed.fallbackModuleName], function(val) {
                        load(val);
                    })
                }
            }
            else {
                req([parsed.optionalModuleName], function(val) {
                    load(val);
                })
            }
        }
    };
});