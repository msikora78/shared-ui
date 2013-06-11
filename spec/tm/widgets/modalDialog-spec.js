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

    function runTest($, Util, ModalDialog) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $modal, widget, primaryButton, secondaryButton;

            runAllTest(false);
            runAllTest(true);

            function runAllTest(isLarge) {
                describe(isLarge ? 'large size' : 'standard size', function() {
                    beforeEach(function() {
                        if (isLarge) {
                            $modal = $('<div class="large">' +
                                '<div class="modal-header">' +
                                '<h3>Title Text</h3>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>' +
                                '</div>' +
                                '</div>');

                        } else {
                            $modal = $('<div>' +
                                '<div class="modal-header">' +
                                '<h3>Title Text</h3>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>' +
                                '</div>' +
                                '</div>');
                        }
                        $container = $('<div class="tm360 no-touch" />').append($modal);
                        $('body').append($container);

                        primaryButton = {
                            attributes: {
                                'data-primary-action': true
                            },
                            callback: function(e, dialog) {
                                dialog.hide();
                            }
                        };

                        secondaryButton = {
                            attributes: {
                                'data-secondary-action': true
                            },
                            callback: function(e, dialog) {
                                dialog.hide();
                            }
                        };
                        spyOn(primaryButton, 'callback').andCallThrough();
                        spyOn(secondaryButton, 'callback').andCallThrough();

                        var options = {
                            buttons: [secondaryButton, primaryButton],
                            fade: false
                        };

                        widget = new ModalDialog($modal, options);
                        widget.show();
                    });

                    afterEach(function() {
                        widget.hide();
                        $container.remove();
                    });

                    it('should have a Lightbox Overlay of #000 at 25% opacity', function() {
                        var $modalBackground = $('.modal-backdrop');

                        expect($modalBackground.css('background-color')).toBe(Util.convertHexaToRgb('000000'));
                        var opacity = Math.round($modalBackground.css('opacity') * 100) / 100;
                        expect(opacity).toBe(0.25);
                    });

                    it('should have a #FFF background with a 10px border that’s #000 at 25% opacity', function() {
                        expect($modal.css('background-color')).toBe(Util.convertHexaToRgb('ffffff'));
                        Util.evaluateBorderWidth($modal, '10px');
                        Util.evaluateBorderColor($modal, Util.convertHexaToRgba("000000", '0.25'), null, true);
                    });

                    if (isLarge) {
                        it('should be 636px wide (inner) and 656px wide (outer)', function() {
                            expect($modal.innerWidth()).toBe(636);
                            expect($modal.outerWidth()).toBe(656);
                        });
                    } else {
                        it('should be 482px wide (inner) and 502px wide (outer)', function() {
                            expect($modal.innerWidth()).toBe(482);
                            expect($modal.outerWidth()).toBe(502);
                        });
                    }

                    describe('Title section', function() {
                        it('should be 18px Museo Sans 500 #4F5158', function() {
                            var $title = $modal.find('.modal-header h3');

                            expect($title.css('font-size')).toBe('18px');
                            expect($title.css('font-family')).toContain('MuseoSans500');
                            expect($title.css('color')).toBe(Util.convertHexaToRgb("4F5158"));
                        });
                    });

                    describe('Body section', function() {
                        it('should be 14px Arial Regular #4F5158', function() {
                            var $body = $modal.find('.modal-body p');

                            expect($body.css('font-size')).toBe('14px');
                            expect($body.css('font-family')).toContain('Arial');
                            expect($body.css('color')).toBe(Util.convertHexaToRgb("4F5158"));
                        });
                    });

                    describe('Footer section', function() {
                        it('should have an Horizontal Rule of 1px #ebebee', function() {
                            var $modalFooter = $modal.find('.modal-footer');

                            Util.evaluateBorderWidth($modalFooter, '1px', ['top']);
                            Util.evaluateBorderColor($modalFooter, Util.convertHexaToRgb('ebebee'), ['top']);
                        });

                        it('should have a background of #F5F5F7', function() {
                            var $modalFooter = $modal.find('.modal-footer');

                            expect($modalFooter.css('background-color')).toBe(Util.convertHexaToRgb('F5F5F7'));
                        });
                    });

                    describe('Behaviour', function() {
                        it('should execute the primary action when user hit ENTER', function() {
                            var e = $.Event("keyup");
                            e.keyCode = e.which = 13;
                            $modal.trigger(e);

                            expect(primaryButton.callback).toHaveBeenCalled();
                        });

                        it('should execute the secondary action when user hit ESC', function() {
                            var e = $.Event("keyup");
                            e.keyCode = e.which = 27;
                            $modal.trigger(e);

                            expect(secondaryButton.callback).toHaveBeenCalled();
                        });
                    });
                });
            }
        });
    }
});