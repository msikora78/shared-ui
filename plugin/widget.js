define(['tm/widgets/widgetFactory'], function(widgetFactory) {

	return {
		load: function(name, req, load, config) {
			var widgetName = name.replace(/^.*?(\w)(\w*)$/, function(a, b, c) {
				return 'tm' + b.toUpperCase() + c;
			});

			req([name], function(value) {
				load(widgetFactory.make(widgetName, value));
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
	}

});