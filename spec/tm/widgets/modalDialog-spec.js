(function() {
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

            function runAllTest(isLarge) { 

                describe(isLarge ? 'large size' : 'standard size', function() {
                    function createModal() {
                        if (isLarge) {
                            $modal = $('\
                                <div class="large">\
                                    <div class="modal-header">\
                                        <h3>Title Text</h3>\
                                    </div>\
                                    <div class="modal-body">\
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>\
                                    </div>\
                                    <div class="modal-footer">\
                                        <button type="button" class="btn">Text</button>\
                                        <button type="button" class="btn btn-primary">Text</button>\
                                    </div>\
                                </div>');

                        } else {
                            $modal = $('\
                                <div>\
                                    <div class="modal-header">\
                                        <h3>Title Text</h3>\
                                    </div>\
                                    <div class="modal-body">\
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>\
                                    </div>\
                                    <div class="modal-footer">\
                                        <button type="button" class="btn">Text</button>\
                                        <button type="button" class="btn btn-primary">Text</button>\
                                    </div>\
                                </div>');
                        }
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
                        var $modalBackground = $('.modal-backdrop.fade.in');

                        expect($modalBackground.css('background-color')).toBe(Util.convertHexaToRgb('000000'));
                        Util.wait().done(function() {
                            expect($modalBackground.css('opacity')).toBe('0.25');
                        });
                    });

                    it('should have a #FFF background with a 10px border that’s #000 at 25% opacity', function() {
                        expect($modal.css('background-color')).toBe(Util.convertHexaToRgb('ffffff'));
                        Util.evaluateBorderWidth($modal, '10px');
                        //Util.evaluateBorderColor($modal, Util.parseShadowValue(Util.convertHexaToRgba("000000", '0.25')));
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

                        it('should have margin of 20px 20px 30px 20px', function() {
                            var $modalHeader = $modal.find('.modal-header');

                            //expect(Util.calculateDistance($modalHeader, 'top')).toBe('20px');
                            expect(Util.calculateDistance($modalHeader, 'right')).toBe('20px');
                            //expect(Util.calculateDistance($modalHeader, 'bottom')).toBe('30px');
                            expect(Util.calculateDistance($modalHeader, 'left')).toBe('20px');
                        });
                    });

                    describe('Body section', function() {
                        it('should be 14px Arial Regular #4F5158', function() {
                            var $body = $modal.find('.modal-body p');

                            expect($body.css('font-size')).toBe('14px');
                            expect($body.css('font-family')).toContain('Arial');
                            expect($body.css('color')).toBe(Util.convertHexaToRgb("4F5158"));
                        });

                        it('should have margin of 0px 20px 20px 20px', function() {
                            var $modalBody = $modal.find('.modal-body');

                            //expect(Util.calculateDistance($modalBody, 'top')).toBe('20px'); 
                            expect(Util.calculateDistance($modalBody, 'right')).toBe('20px');
                            //expect(Util.calculateDistance($modalBody, 'bottom')).toBe('20px'); 
                            expect(Util.calculateDistance($modalBody, 'left')).toBe('20px');
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
                });
            }

            runAllTest(false);
            runAllTest(true);
        });
    }
})();