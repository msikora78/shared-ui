define(['./util'], function(Util) {
    describe('Text Input Field', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                runTest(jquery[version], Util);
            }
        }
    });

    function runTest($, Util) {
        describe('with jquery v' + $.fn.jquery, function() {

            runAllTest('default state', {});

            runAllTest('error state', {
                isError: true
            });

            runAllTest('disabled state', {
                isDisabled: true
            });

            runAllTest('active state', {
                isFocused: true
            });

            runAllTest('active+error state', {
                isError: true,
                isFocused: true
            });

            function runAllTest(state, opts) {

                describe(state, function(){

                    var $container, $controlGroup, $label, $controls, $input, $errorIcon, $errorText;

                    beforeEach(function(){
                        $input = $('<input type="text" id="testInput" />');
                        $errorText = $('<span class="help-error">').html('Error help text');
                        $errorIcon = $('<i class="help-error-icon">');
                        $controls = $('<div class="controls">').append($input).append(" ").append($errorIcon).append($errorText);
                        $label = $('<label class="control-label" for="testInput">').html('Test Label');
                        $controlGroup = $('<div class="control-group">').append($label).append($controls);
                        $container = $('<div class="tm360"/>').append($controlGroup);
                        $('body').prepend($container);

                        if (opts.isDisabled){
                            $input.prop("disabled", true);
                        } else {
                            if (opts.isError){
                                $controlGroup.addClass("error");
                            }
                            if (opts.isFocused){
                                $input.get(0).focus();
                            }
                        }
                    });

                    afterEach(function(){
                        $container.remove();
                    });

                    it('should be 28px height', function() {
                        expect($input.outerHeight()).toBe(28);
                    });

                    it('should be 12px Arial Regular, #4f5158', function() {
                        expect($input.css('font-family')).toContain('Arial');
                        expect($input.css('font-size')).toBe('12px');
                        Util.evaluateFontWeight($input, false);
                        Util.evaluateColor($input, '4f5158');
                    });

                    it('should have label with 12px Arial Bold, #4f5158', function() {
                        expect($label.css('font-family')).toContain('Arial');
                        expect($label.css('font-size')).toBe('12px');
                        Util.evaluateFontWeight($label, true);
                        Util.evaluateColor($label, '4f5158');
                    });

                    if (opts.isDisabled){
                        // disabled
                        it('should have a #f5f5f7 background', function() {
                            Util.evaluateBackgroundColor($input, Util.convertHexaToRgb("f5f5f7"));
                        });

                        //it('should have a 1px #ebebee border', function() {
                        it('should have a 1px #c8c9ce border', function() {
                            Util.evaluateBorderWidth($input, '1px');
                            Util.evaluateBorderColor($input,  Util.convertHexaToRgb("c8c9ce"));
                        });

                        it('should have no shadow', function() {
                            var shadow = Util.parseShadowValue($input.css('box-shadow'));
                            expect(shadow.toString()).toBe('none');
                        });

                        it('should not display errorIcon or errorText', function(){
                            expect($errorIcon.css('display')).toBe('none');
                            expect($errorText.css('display')).toBe('none');
                        });

                    } else {
                        // not disabled
                        it('should have a #fff background', function() {
                            Util.evaluateBackgroundColor($input, Util.convertHexaToRgb("ffffff"));
                        });

                        if (opts.isError){
                            // error
                            it('should have a 1px #f03848 border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("f03848"));
                            });

                            //it('should have 3px #f03848 inner shadow at 1px distance, 0° angle, 35% opacity', function() {
                            it('should have box shadow: 1px 1px 1px rgba(240, 56, 72, 0.25) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('f03848', '0.25') + ' inset 1px 1px 1px 0px');
                            });

                            it('should have a 16x16 graphic icon using sprite grfx-tm360SDK.png with -44px -82px offset', function(){
                                expect($errorIcon.css('display')).toBe('inline-block');
                                expect($errorIcon.css('background-image')).toContain('grfx-tm360SDK.png');
                                expect($errorIcon.css('background-position')).toBe("-44px -82px");
                                expect($errorIcon.css('width')).toBe('16px');
                                expect($errorIcon.css('height')).toBe('16px');
                            });

                            it('should have error text with 11px Arial Regular #f03848', function(){
                                expect($errorText.css('display')).toBe('block');
                                expect($errorText.css('font-family')).toContain('Arial');
                                expect($errorText.css('font-size')).toBe('11px');
                                Util.evaluateFontWeight($errorText, false);
                                Util.evaluateColor($errorText, 'f03848');
                            });

                            /*
                            if (opts.isFocused){
                                // error + active
                            } else {
                                // error (not active)
                            }
                            */

                        } else if (opts.isFocused){
                            // active (no error)
                            //it('should have a 1px #9296a3 border', function() {
                            it('should have a 1px #257eb7 border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("257eb7"));
                            });

                            //it('should have 3px #2d93d4 inner shadow at 1px distance, 0° angle, 35% opacity ', function() {
                            it('should have box shadow: 1px 1px 3px rgba(45, 147, 212, 0.35) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('2d93d4', '0.35') + ' inset 1px 1px 3px 0px');
                            });

                            it('should not display errorIcon or errorText', function(){
                                expect($errorIcon.css('display')).toBe('none');
                                expect($errorText.css('display')).toBe('none');
                            });

                        } else {
                            // default
                            //it('should have a 1px #c8c9ce border', function() {
                            it('should have a 1px #b6b7bd border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("b6b7bd"));
                            });

                            //it('should have 3px #000 inner shadow at 1px distance, 0° angle, 15% opacity', function() {
                            it('should have box shadow: 1px 1px 1px rgba(0, 0, 0, 0.15) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('000000', '0.15') + ' inset 1px 1px 1px 0px');
                            });

                            it('should not display errorIcon or errorText', function(){
                                expect($errorIcon.css('display')).toBe('none');
                                expect($errorText.css('display')).toBe('none');
                            });

                        }
                    }
                });
            }
        });
    }
});