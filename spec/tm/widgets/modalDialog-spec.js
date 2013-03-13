var isRequire = typeof define === 'function' && define.amd;

if (isRequire) {
    define(['injectable!tm/widgets/modalDialog', 'mock/gadgetPrefMock', './util'], function(modalDialogInjectable, gadgetPrefMock, Util) {
        var gadgetPrefs = gadgetPrefMock({
            'tm.widgets.modalDialog.ok': 'ok'
        });
        var gadgets = {
            Prefs: function() {
                return gadgetPrefs;
            }
        }

        describe('tm.widgets.modalDialog', function() {
            for (var version in jquery) {
                if (jquery.hasOwnProperty(version)) {
                    var ModalDialog = modalDialogInjectable(jquery[version], gadgets);
                    runTest(jquery[version], Util, ModalDialog);
                }
            }
        });
    });
} else {
    describe('tm.widgets.modalDialog', function() {
        runTest($, tm.widgets.util);
    });
}

function runTest($, Util, ModalDialog) {
    describe('with jquery v' + $.fn.jquery, function() {
        var $container, $modal, widget;

        function createModal() {
            $modal = $('<div><div class="modal-header"><h3>My header</h3></div></div>');
            $container = $('<div class="tm360" />').append($modal);
            $('body').append($container);
        }

        if (!isRequire) {
            beforeEach(function() {
                createModal();
                $modal.tmModalDialog();
                $modal.tmModalDialog('show');
            });

            afterEach(function() {
                $modal.tmModalDialog('hide');
                $container.remove();
            });
        } else {
            beforeEach(function() {
                createModal();
                widget = new ModalDialog($modal);
                widget.show();
            });

            afterEach(function() {
                widget.hide();
                $container.remove();
            });
        }

        it('should have a Lightbox Overlay of #000 at 25% opacity', function() {
            var modalBackground = $('.modal-backdrop.fade.in');

            expect(modalBackground.css('background-color')).toBe(Util.convertHexaToRgb('000000'));
            Util.wait(function() {
                expect(modalBackground.css('opacity')).toBe('0.25');
            });
        });

        it('should have a #FFF background with a 10px border that’s #000 at 25% opacity', function() {
            expect($modal.css('background-color')).toBe(Util.convertHexaToRgb('ffffff'));
            Util.evaluateBorderWidth($modal, '10px');
            //Util.evaluateBorderColor($modal, Util.convertHexaToRgba("000000", '0.25'));
        });

        it('should have a title of 18px Museo Sans 500 #4F5158', function() {
            var $modalHeader = $modal.find('.modal-header');
            var $title = $modalHeader.find('h3');

            expect($title.css('font-size')).toBe('18px');
            expect($title.css('font-family')).toContain('MuseoSans500');
            expect($title.css('color')).toBe(Util.convertHexaToRgb("4F5158"));
        });

        it('should have a title with margin of 20px 20px 30px 20px', function() {

        });

    });
}