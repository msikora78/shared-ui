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
}
else {
    describe('tm.widgets.modalDialog', function() {
        runTest($, tm.widgets.util);
    });
}

function runTest($, Util, ModalDialog) {
    describe('with jquery v' + $.fn.jquery, function() {
        var $container, $modal, widget;

        if (!isRequire) {
            beforeEach(function() {
                $modal = $('<div></div>');
                $container = $('<div class="tm360" />').append($modal);
                $('body').append($container);

                $modal.tmModalDialog();
                $modal.tmModalDialog('show');
            });

            afterEach(function() {
                $modal.tmModalDialog('hide');
                $container.remove();
            });
        }
        else {
            beforeEach(function() {
                $modal = $('<div></div>');
                $container = $('<div class="tm360" />').append($modal);
                $('body').append($container);

                widget = new ModalDialog($modal);
                widget.show();
            });

            afterEach(function() {
                widget.hide();
                $container.remove();
            });
        }

        it('should have a Lightbox Overlay of #000 at 25% opacity', function() {
            var rgb = Util.convertHexaToRgb("000000");
            expect($('.modal-backdrop.fade.in').css('background-color')).toBe(rgb);
        });
    });
}