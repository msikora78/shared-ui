define(['./util'], function(Util) {
    describe('Text Input Filed', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                runTest(jquery[version], Util);
            }
        }
    });

    function runTest($, Util) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $input, $inlineError;

            runAllTest(false);
            runAllTest(true);

            function runAllTest(isError) {
                
                describe(isError ? 'With errors' : 'Without errors', function() {

                    beforeEach(function() {
                        $input = $('<input type="text" />');
                        $inlineError = $('<span class="help-error">Error help text</span>');

                        if (isError){
                            var errorDiv = $('<div class="control-group error"/>');
                            errorDiv.append($input);
                            errorDiv.append($inlineError);
                            $container = $('<div class="tm360"/>').append(errorDiv);
                        }
                        else {
                            $container = $('<div class="tm360"/>').append($input);
                        }
                        $('body').append($container);
                    });

                     afterEach(function() {
                        $container.remove();
                    });

                    it('should be 28px height', function() {
                        expect($input.outerHeight()).toBe(28);
                    });

                    it('should be 12px Arial Regular, #4f5158', function() {
                        expect($input.css('font-family')).toContain('Arial');
                        expect($input.css('font-size')).toBe('12px');
                        expect($input.css('color')).toBe(Util.convertHexaToRgb('4f5158'));
                    });

                    if (!isError) {
                        describe('default state', function() {
                            it('should have a #fff with 1px #c8c9ce border', function() {
                                Util.evaluateBackgroundColor($input, Util.convertHexaToRgb("ffffff"));
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("c8c9ce"));
                            });

                            it('should have 3px #000 inner shadow at 1px distance, 0° angle, 15% opacity', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('000000', '0.15') + ' -1px 0px 3px 0px');
                            });
                        });

                    }
                    else {
                        describe('default state', function() {
                            it('should have a #fff with 1px #f03848 border', function() {
                                Util.evaluateBackgroundColor($input, Util.convertHexaToRgb("ffffff"));
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("f03848"));
                            });

                            it('should have 3px #f03848 inner shadow at 1px distance, 0° angle, 35% opacity', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('f03848', '0.35') + ' -1px 0px 3px 0px');
                            });
                        });

                        describe('inline error', function() {
                            it('should have 3px padding-top', function(){
                                expect($inlineError.css('padding-top')).toBe('3px');
                            });
                        });
                    }

                    /*describe('active state', function() {
                        beforeEach(function(){
                            $input.focus();
                        });

                        it('should have a #fff with 1px #9296a3 border', function() {
                            Util.evaluateBackgroundColor($input, Util.convertHexaToRgb("ffffff"));
                            Util.evaluateBorderWidth($input, '1px');
                            Util.evaluateBorderColor($input,  Util.convertHexaToRgb("9296a3"));
                        });

                        it('should have 3px #2d93d4 inner shadow at 1px distance, 0° angle, 35% opacity ', function() {
                            var shadow = Util.parseShadowValue($input.css('box-shadow'));
                            expect(shadow.toString()).toBe(Util.convertHexaToRgba('2d93d4', '0.35') + ' -1px 0px 3px 0px');
                        });
                    });*/
                });
            }
        });
    }
});