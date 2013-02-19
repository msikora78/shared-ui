define(['tm/widgets/widgetFactory'], function(widgetFactory) {

	return {
		load: function(name, req, load, config) {
			var widgetName = name.replace(/^.*?(\w)(\w*)$/, function(match, first, remainder) {
				return 'tm' + first.toUpperCase() + remainder;
			});

			req([name], function(value) {
				load(widgetFactory.make(widgetName, value));
			});
		},
		pluginBuilder: 'widgetBuilder'
	};

});