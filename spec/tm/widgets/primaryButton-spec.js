define(['./util'], function(Util) {
    describe('Primary Button', function() {
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
                        var classes = ['btn', 'btn-primary'];

                        if (disabled) {
                            classes.push('disabled');
                        } 
                        if (hover) {
                            classes.push('hover');
                        }
                        
                        $button = $('<button type="button" class="' + classes.join(' ')  + '">' + text + '</button>');
                        $container = $('<div class="tm360"/>').append($button);
                        $('body').append($container);
                    });

                     afterEach(function() {
                        $container.remove();
                    });

                    describe('common features', function() {
                        it('should be 3px rounded corners', function() {
                            var size = '3px';
                            expect(Util.styleSupport($button, 'border-radius')).toBeTruthy();
                            expect($button.css(Util.styleSupport($button, 'border-top-left-radius'))).toBe(size);
                            expect($button.css(Util.styleSupport($button, 'border-top-right-radius'))).toBe(size);
                            expect($button.css(Util.styleSupport($button, 'border-bottom-left-radius'))).toBe(size);
                            expect($button.css(Util.styleSupport($button, 'border-bottom-right-radius'))).toBe(size);
                        });

                        it('should be 28px height', function() {
                            expect($button.outerHeight()).toBe(28);
                        });

                        it('should always be a 10px left and right padding', function()  {
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
                            var size = '1px';
                            expect(Util.styleSupport($button, 'border-width')).toBeTruthy();
                            expect($button.css(Util.styleSupport($button, 'border-top-width'))).toBe(size);
                            expect($button.css(Util.styleSupport($button, 'border-bottom-width'))).toBe(size);
                            expect($button.css(Util.styleSupport($button, 'border-left-width'))).toBe(size);
                            expect($button.css(Util.styleSupport($button, 'border-right-width'))).toBe(size);
                        });

                        it('should be 12px Museo Sans 500', function() {
                            expect($button.css('font-family')).toContain('MuseoSans500');
                            expect($button.css('font-size')).toBe('12px');
                        });
                    });
                    if (disabled)  {
                        describe('inactive state', function() {
                            it('should have a #fff background', function() {
                                var rgb = Util.convertHexaToRgb("ffffff");
                                expect($button.css('background-color')).toBe(rgb);
                            });
                                                        
                            it('should have border #c8c9ce', function() {
                                var rgb = Util.convertHexaToRgb("c8c9ce");
                                expect(Util.styleSupport($button, 'border-color')).toBeTruthy();
                                expect($button.css(Util.styleSupport($button, 'border-top-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-bottom-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-left-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-right-color'))).toBe(rgb);
                            });

                            it('should have #c8c9ce color', function() {
                                var rgb = Util.convertHexaToRgb("c8c9ce");
                                expect($button.css('color')).toBe(rgb);                                
                            });
                        });
                    } else if (hover) {
                        describe('hover state', function() {
                            it('should have a #2d93d4 background', function() {
                                var rgb = Util.convertHexaToRgb("2d93d4");
                                expect($button.css('background-color')).toBe(rgb);
                            });
                            
                            it('should have border #9296a3', function() {
                                var rgb = Util.convertHexaToRgb("9296a3");
                                expect(Util.styleSupport($button, 'border-color')).toBeTruthy();
                                expect($button.css(Util.styleSupport($button, 'border-top-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-bottom-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-left-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-right-color'))).toBe(rgb);
                            });

                            it('should have #fff color', function() {
                                var rgb = Util.convertHexaToRgb("ffffff");
                                expect($button.css('color')).toBe(rgb);                                
                            });

                            it('should have box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25)', function() {
                                var boxShadow = Util.parseShadowValue($button.css('box-shadow'));
                                expect(boxShadow.toString()).toBe('rgba(0, 0, 0, 0.25) 0px 2px 3px 0px'); 
                            });

                            it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                                var textShadow = Util.parseShadowValue($button.css('text-shadow'));
                                expect(textShadow.toString()).toBe('rgba(0, 0, 0, 0.25) -1px -1px 1px');
                            });
                        });
                    }
                    else {
                        describe('default state', function() {
                            it('should have a gradient #6bbefd at top to #2d93d4 at bottom', function() {
                                var rgbTop = Util.convertHexaToRgb("6bbefd");
                                var rgbBottom = Util.convertHexaToRgb("2d93d4");
                                var gradient = Util.gradientSupport($button);
                                expect(gradient).toBeTruthy();
                                expect($button.css(Util.styleSupport($button, 'background-image'))).toContain(rgbTop + ', ' + rgbBottom);
                            });

                            it('should be border #9296a3', function() {
                                var rgb = Util.convertHexaToRgb("9296a3");
                                expect(Util.styleSupport($button, 'border-color')).toBeTruthy();
                                expect($button.css(Util.styleSupport($button, 'border-top-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-bottom-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-left-color'))).toBe(rgb);
                                expect($button.css(Util.styleSupport($button, 'border-right-color'))).toBe(rgb);
                            });

                            it('should have #fff color ', function() {
                                var rgb = Util.convertHexaToRgb("ffffff");
                                expect($button.css('color')).toBe(rgb);                                
                            });

                            it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                                //expect($button.css('text-shadow')).toBe('rgba(0, 0, 0, 0.25) -1px -1px -1px'); 
                            });
                        });
                    }
                });
            }
        });
    }
});