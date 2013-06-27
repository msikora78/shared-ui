define([], function() {

	return {
		load: function(name, req, load, config) {
			req([name], function(value) {
				load(value);
			});
		},
		write: function(pluginName, moduleName, write) {
			var widgetName = moduleName.replace(/^.*?(\w)(\w*)$/, function(a, b, c) {
				return 'tm' + b.toUpperCase() + c;
			});

			write("define('" + pluginName + "!" + moduleName + "', ['tm/widgets/widgetFactory', '" + moduleName + "'], function(widgetFactory, proto) { " +
				"return widgetFactory.make('" + widgetName + "', proto); " +
				"});\n");
		}
	};

});