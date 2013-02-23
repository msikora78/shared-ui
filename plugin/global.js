var __this = this;

define('globalBuilder', [], function() {
	return {
			load: function(name, req, load, config) {
				load({});
			}
	}
});

define([], function() {
	var globalObject = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : __this;

	return {
		load: function(name, req, load, config) {
			if (name in globalObject) {
				load(globalObject[name]);
			}
			else if (name === 'window') {
				load(globalObject);
			}
			else {
				load.error('undefined: ' + name);
			}
		},
		pluginBuilder: 'globalBuilder'
	};
});