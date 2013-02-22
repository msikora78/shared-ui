var __this = this;

define([], function() {
	var global = typeof window !== 'undefined' ? window : __this;

	return {
		load: function(name, req, load, config) {
			if (name in global) {
				load(global[name]);
			}
			else if (name === 'window') {
				load(global);
			}
			else {
				load.error('undefined: ' + name);
			}
		}
	};
});