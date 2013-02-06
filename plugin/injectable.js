define([], function() {
	'use strict';

    var overriden = false;
    var modulesToWrap = [];
    
 	function stub(fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            var module = args[0];
            var index = modulesToWrap.indexOf(module.id);
            
            if (index !== -1) {
                modulesToWrap.splice(index, 1);
                return function() {
                    return fn.apply(this, arguments);
                };
            }
            
            return fn.apply(this, args.slice(1));
        };
    }
    
    var d = define;

    define = function() {
        var args = Array.prototype.slice.call(arguments);
        var index = args.length;
        
        while(index--) {
            if (typeof args[index] === 'function') {
                args.splice(index, 1, stub(args[index]));
            }
            else if (args[index] instanceof Array) {
                args[index].unshift('module');
            }
        }
        
        return d.apply(this, args);
    };

    for (var name in d) {
    	if (d.hasOwnProperty(name)) {
    		define[name] = d[name];
    	}
    }

    return {
        load: function(name, req, load, config) {
            modulesToWrap.push(name);
            
            req([name], function (value) {
                load(value);
            });
        }
    };
});