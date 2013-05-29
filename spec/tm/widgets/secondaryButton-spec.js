define(['./util'], function(Util) {
    describe('Secondary Button', function() {
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
                        var classes = ['btn'];

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

                        it('should be 28px height', function() {
                            expect($button.outerHeight()).toBe(28);
                        });

                        it('should always be a 10px left and right margin', function()  {
                            expect(($button.innerWidth() - $button.width()) / 2).toBe(10);
                        });

                        if (text.length < 10) {
                            it('should be 82px width', function() {
                                expect($button.outerWidth()).toBe(82);
                            });
                        } else {
                            it('should be greater than 82px width', function() {
                                expect($button.outerWidth()).toBeGreaterThan(82);
                            });
                        }

                        it('should be 1px border', function() {
                            Util.evaluateBorderWidth($button, '1px');
                        });

                        it('should be 12px Museo Sans 500', function() {
                            expect($button.css('font-family')).toContain('MuseoSans500');
                            expect($button.css('font-size')).toBe('12px');
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
                            it('should have a #ffffff background', function() {
                                Util.evaluateBackgroundColor($button, 'ffffff');
                            });

                            it('should have border #9296a3', function() {
                                Util.evaluateBorderColor($button, Util.convertHexaToRgb("9296a3"));
                            });

                            it('should have #4F5158 color', function() {
                                Util.evaluateColor($button, '4F5158');
                            });

                            it('should have box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25)', function() {
                                Util.evaluateBoxShadow($button, 'rgba(0, 0, 0, 0.25) 0px 2px 5px 0px');
                            });

                            it('should have no text-shadow', function() {
                                Util.evaluateTextShadow($button, 'none');
                            });
                        });
                    } else {
                        describe('default state', function() {
                            it('should have a gradient #fff at top to #d4d6d9 at bottom', function() {
                                Util.evaluateGradient($button, "#ffffff", "#d4d6d9");
                            });

                            it('should be border #9296a3', function() {
                                Util.evaluateBorderColor($button, Util.convertHexaToRgb("9296a3"));
                            });

                            it('should have #4F5158 color ', function() {
                                Util.evaluateColor($button, '4F5158');
                            });

                            it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                                Util.evaluateTextShadow($button, 'rgba(255, 255, 255, 0.25) 0px 0px 1px');
                            });
                        });
                    }
                });
            }
        });
    }
});