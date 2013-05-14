define(['./util'], function(Util) {
    describe('Important Button', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                runTest(jquery[version], Util);
            }
        }
    });

    function runTest($, Util) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $button;

            runAllTest('Text');
            runAllTest('Text', true);
            runAllTest('Text', false, true);
            runAllTest('Text', true, true);
            runAllTest('Button with a very very long text');
            runAllTest('Button with a very very long text', true);
            runAllTest('Button with a very very long text', false, true);
            runAllTest('Button with a very very long text', true, true);

            function runAllTest(text, disabled, hover) {
                var desc = '';
                desc += disabled ? 'inactive ' : '';
                desc += hover ? 'hover ' : '';
                desc += 'with text "' + text + '"';

                describe(desc, function() {
                    beforeEach(function() {
                        var classes = ['btn', 'btn-success'];

                        if (disabled) {
                            classes.push('disabled');
                        }
                        if (hover) {
                            classes.push('hover');
                        }

                        $button = $('<button type="button" class="' + classes.join(' ') + '">' + text + '</button>');
                        $container = $('<div class="tm360"/>').append($button);
                        $('body').append($container);
                    });

                    afterEach(function() {
                        $container.remove();
                    });

                    describe('common features', function() {
                        it('should be 3px rounded corners', function() {
                            Util.evaluateBorderRadius($button, '3px');
                        });

                        it('should always be a 10px left and right margin', function()  {
                            expect(($button.innerWidth() - $button.width()) / 2).toBe(10);
                        });

                        it('should be 34px height', function() {
                            expect($button.outerHeight()).toBe(34);
                        });

                        if (text.length < 10) {
                            it('should be 140px width', function() {
                                expect($button.outerWidth()).toBe(140);
                            });
                        } else {
                            it('should be greater than 140px width', function() {
                                expect($button.outerWidth()).toBeGreaterThan(140);
                            });
                        }

                        it('should be 1px border', function() {
                            Util.evaluateBorderWidth($button, '1px');
                        });

                        it('should be 14px Museo Sans 500', function() {
                            expect($button.css('font-family')).toContain('MuseoSans500');
                            expect($button.css('font-size')).toBe('14px');
                        });
                    });
                    if (disabled)  {
                        describe('inactive state', function() {
                            it('should have a #fff background', function() {
                                Util.evaluateBackgroundColor($button, 'ffffff');
                            });

                            it('should have border #c8c9ce', function() {
                                Util.evaluateBorderColor($button, Util.convertHexaToRgb("c8c9ce"));
                            });

                            it('should have #c8c9ce color', function() {
                                Util.evaluateColor($button, 'c8c9ce');
                            });
                        });
                    } else if (hover) {
                        describe('hover state', function() {
                            it('should have a #10a946 background', function() {
                                Util.evaluateBackgroundColor($button, '10a946');
                            });

                            it('should have border #4f5158', function() {
                                Util.evaluateBorderColor($button, Util.convertHexaToRgb("4f5158"));
                            });

                            it('should have #fff color', function() {
                                Util.evaluateColor($button, 'ffffff');
                            });

                            it('should have box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25)', function() {
                                var boxShadow = Util.parseShadowValue($button.css('box-shadow'));
                                expect(boxShadow.toString()).toBe('rgba(0, 0, 0, 0.25) 0px 2px 5px 0px');
                            });

                            it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25)', function() {
                                Util.evaluateTextShadow($button, 'rgba(0, 0, 0, 0.25) -1px -1px 1px');
                            });
                        });
                    } else {
                        describe('default state', function() {
                            it('should have a gradient #38c56a at top to #10a946 at bottom', function() {
                                var rgbTop = Util.convertHexaToRgb("38c56a");
                                var rgbBottom = Util.convertHexaToRgb("10a946");
                                var gradient = Util.gradientSupport($button);
                                expect(gradient).toBeTruthy();
                                expect($button.css(Util.styleSupport($button, 'background-image'))).toContain(rgbTop + ', ' + rgbBottom);
                            });

                            it('should be border #4f5158', function() {
                                Util.evaluateBorderColor($button, Util.convertHexaToRgb("4f5158"));
                            });

                            it('should have #fff color ', function() {
                                Util.evaluateColor($button, 'ffffff');
                            });

                            it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                                Util.evaluateTextShadow($button, 'rgba(0, 0, 0, 0.25) -1px -1px 1px');
                            });
                        });
                    }
                });
            }
        });
    }
});