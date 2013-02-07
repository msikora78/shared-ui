define(['injectable!tm/widgets/widgetFactory', 'mock/jqueryMock'], function(widgetFactoryInjectable, jQueryMock) {

	function WidgetProto(element) {
		this.element = element;
	}

	WidgetProto.prototype = {
		setName: function() {},
		getName: function() {}
	}

	describe('tm.widgets.widgetFactory', function() {

		var jqueryMock;
		var widgetFactory;

		beforeEach(function() {
			jqueryMock = jQueryMock();
			widgetFactory = widgetFactoryInjectable(jqueryMock);
			widgetFactory.make('tmMyWidget', WidgetProto);
		});

		it('should add new function to jQuery', function() {
			expect(jqueryMock.fn.tmMyWidget).toBeDefined();
		});

		it('should add data for element', function() {
			var elementMock = {};
			var data = {};

			spyOn(jqueryMock, 'data').andCallFake(function(element, name, value) {
				expect(element).toBe(elementMock);
				expect(name).toBe('tmMyWidget');
				
				if (value) {
					data[name] = value;
				}

				return data[name];
			});

			jqueryMock([elementMock]).tmMyWidget();

			expect(jqueryMock.data).toHaveBeenCalled();
			expect(data.tmMyWidget).toBeDefined();
		});

		it('should get name with option', function() {
			var elementMock = {};
			var data = {};

			spyOn(jqueryMock, 'data').andCallFake(function(element, name, value) {
				if (value) {
					data[name] = value;
				}

				return data[name];
			});

			jqueryMock([elementMock]).tmMyWidget();

			spyOn(data.tmMyWidget, 'getName');

			jqueryMock([elementMock]).tmMyWidget('option', 'name');

			expect(data.tmMyWidget.getName).toHaveBeenCalled();
		});

		it('should set name with option', function() {
			var elementMock = {};
			var data = {};

			spyOn(jqueryMock, 'data').andCallFake(function(element, name, value) {
				if (value) {
					data[name] = value;
				}

				return data[name];
			});

			jqueryMock([elementMock]).tmMyWidget();

			spyOn(data.tmMyWidget, 'setName').andCallFake(function(value) {
				expect(value).toBe('test');
			});

			jqueryMock([elementMock]).tmMyWidget('option', 'name', 'test');

			expect(data.tmMyWidget.setName).toHaveBeenCalled();
		});

	});

});