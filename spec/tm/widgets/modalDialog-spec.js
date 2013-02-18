if (typeof define === 'function' && define.amd) {
	define(['injectable!tm/widgets/modalDialog', 'mock/gadgetPrefMock'], function(modalDialogInjectable, gadgetPrefMock) {

		function runTestWith($) {
			describe('with jquery v' + $.fn.jquery, function() {

				var ModalDialog;
				var testElement;
				var gadgetPref = gadgetPrefMock({ 'tm.widgets.modalDialog.ok': 'ok' });
				var gadgets = {
					Pref: function() {
						return gadgetPref;
					}
				}

				beforeEach(function() {
					ModalDialog = modalDialogInjectable($, gadgets);
					testElement = $('<div></div>');
				});

				afterEach(function() {
					testElement.remove();
				});

				it('should use the default renderer', function() {
					var widget = new ModalDialog(testElement, {
						title: 'te&st',
						content: '<b>hello world!'
					});

					expect(testElement.hasClass('modal')).toBe(true);
					expect(testElement.hasClass('hide')).toBe(true);
					expect(testElement.find('.modal-header h3').html()).toBe('te&amp;st');
					expect(testElement.find('.modal-body').html()).toBe('<p>&lt;b&gt;hello world!</p>');
				});

				it('should call bootstrap\'s modal widget', function() {
					spyOn($.fn, 'modal').andCallThrough();

					var widget = new ModalDialog(testElement, {
						title: 'te&st',
						content: '<b>hello world!'
					});

					expect($.fn.modal).toHaveBeenCalled();
				});

			});
		}

		describe('tm.widgets.modalDialog', function() {
			for (var version in jquery) {
				if (jquery.hasOwnProperty(version)) {
					runTestWith(jquery[version]);
				}
			}
		});
	});
}
else {
	describe('$.fn.tmModalDialog', function() {
		it('should be defined', function() {
			expect($.fn.tmModalDialog).toBeDefined();
		});
	});
}
