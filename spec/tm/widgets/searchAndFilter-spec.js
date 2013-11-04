define(['injectable!tm/widgets/searchAndFilter', 'tm/core', './util'], function(searchAndFilterInjectable, core, Util) {

    describe('tm.widgets.searchAndFilter', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var SearchAndFilter = searchAndFilterInjectable(jquery[version], core);
                runTest(jquery[version], Util, SearchAndFilter);
            }
        }
    });

    function runTest($, Util, SearchAndFilter) {

        describe('with jquery v' + $.fn.jquery, function() {

            runAllTest('white background');
            runAllTest('dark background', true);
            runAllTest('active, white background', false, true);
            runAllTest('active, dark background', true, true);

            function runAllTest(state, isDark, isActive) {
                describe(state, function() {

                    var $container, $form, $div, $input, $icon, widget;

                    beforeEach(function() {
                        $input = $('<input type="text"/>').attr('placeholder', 'Search Test').addClass('search-query');
                        $icon = $('<i>').addClass('search-clear-icon');
                        $div = $('<div>').css('position', 'relative').append($input).append($icon);
                        $form = $('<form>').addClass('form-search').append($div);
                        $container = $('<div>').addClass("tm360").append($form);
                        $('body').prepend($container);

                        widget = new SearchAndFilter($input);

                        if (isDark) {
                             $container.addClass('search-filter-bg');
                             $form.addClass('darker');
                        }
                        if (isActive){
                            $input.get(0).focus();
                            $input.val("test");
                            $input.keyup(); // triggered to show x icon
                        }
                    });

                    afterEach(function() {
                        $container.remove();
                    });


                    it('should be 28px height', function() {
                        expect($input.outerHeight()).toBe(28);
                    });

                    it('should be 12px Arial Regular text', function() {
                        expect($input.css('font-family')).toContain('Arial');
                        expect($input.css('font-size')).toBe('12px');
                        Util.evaluateFontWeight($input, false);
                    });

                    it('should have a #fff background', function() {
                        Util.evaluateBackgroundColor($input, Util.convertHexaToRgb("ffffff"));
                    });

                    /* why does Firefox say its 14px?!
                    it('should have 15px border radius', function(){
                        Util.evaluateBorderRadius($input, "15px");
                    });
                    */

                    if (isActive){
                        if (isDark){
                            it('should have a 1px #4f5158 border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("4f5158"));
                            });

                            it('should have box shadow: 1px 1px 3px rgba(45, 147, 212, 0.35) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('2d93d4', '0.35') + ' inset 1px 1px 3px 0px');
                            });

                        } else {
                            it('should have a 1px #9296a3 border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("9296a3"));
                            });

                            it('should have box shadow: 1px 1px 3px rgba(45, 147, 212, 0.35) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('2d93d4', '0.35') + ' inset 1px 1px 3px 0px');
                            });

                        }

                        it('should have #4f5158 input text', function() {
                            Util.evaluateColor($input, '4f5158');
                        });


                        it('should display clear icon when value is not empty', function(){
                            waits(0);
                            runs(function() {
                            	expect($icon.css('display')).toBe('block');
                            });
                        }); 

                    } else {
                        if (isDark){
                            it('should have a 1px #9296a3 border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("9296a3"));
                            });

                            it('should have box shadow: 1px 1px 1px rgba(0, 0, 0, 0.15) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('000000', '0.15') + ' inset 1px 1px 1px 0px');
                            });

                        } else {
                            it('should have a 1px #b6b7bd border', function() {
                                Util.evaluateBorderWidth($input, '1px');
                                Util.evaluateBorderColor($input,  Util.convertHexaToRgb("b6b7bd"));
                            });

                            //it('should have 3px #000 inner shadow at 1px distance, 0° angle, 15% opacity', function() {
                            it('should have box shadow: 1px 1px 1px rgba(0, 0, 0, 0.15) inset', function() {
                                var shadow = Util.parseShadowValue($input.css('box-shadow'));
                                expect(shadow.toString()).toBe(Util.convertHexaToRgba('000000', '0.15') + ' inset 1px 1px 1px 0px');
                            });

                        }

                        it('should have #aaa hint text', function() {
                            Util.evaluateColor($input, 'aaa');
                        });

                        it('should not display clear icon when value is not empty', function(){
                            expect($icon.css('display')).toBe('none');
                        });
                    }

                });
            }
        });
    }
});