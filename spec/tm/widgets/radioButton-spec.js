define(['injectable!tm/widgets/radiobutton', 'tm/widgets/checkableBase', 'mock/gadgetPrefMock', 'tm/core', './util'], function(radiobuttonInjectable, base, gadgetPrefMock, core, Util) {
    var gadgetPrefs = gadgetPrefMock({
    });
    var gadgets = {
        Prefs: function() {
            return gadgetPrefs;
        }
    }

    describe('RadioButton', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var radiobutton = radiobuttonInjectable(jquery[version], gadgets, core, base);
                runTest(jquery[version], Util, radiobutton);
            }
        }
    });

    function runTest($, Util, radiobutton) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $radio, widget;
            
            runAllTest('Text');
            runAllTest('Text', true);
            runAllTest('Text', true, true);
            runAllTest('Text', false, true);

            function runAllTest(text, checked, disabled) {
                var desc = '';
                desc += disabled ? 'inactive ' : '';
                desc += checked ? 'selected ' : 'unselected ';
                desc += 'with text "' + text + '"';

                describe(desc, function() {
                    beforeEach(function() {
                        var states = ['tmRadiobutton'];

                        if (checked) {
                            states.push('checked');
                        }
                        if (disabled) {
                            states.push('disabled');
                        }
                        
                        $radio = $('<input type="radio" ' + states.join(' ') + ' />');
                        $container = $('<div class="tm360"/>').append($radio);
                        $('body').append($container);
                        
                        widget = new radiobutton($radio);
                    });

                    afterEach(function() {
                        $container.remove();
                    });

                    describe('CSS common attributes', function() {
                        it('should be 18px height', function() {
                            expect($radio.next().outerHeight()).toBe(18);
                        });
                    });

                    if (checked && disabled)  {
                        describe('inactive state', function() {
                            it('should be disabled and checked', function() {
                                expect($radio.prop("disabled")).toBe(true);
                                expect($radio.prop("checked")).toBe(true);
                            });
                            it('should have background-position at -20px -75px', function() {
                                expect($radio.next().css("background-position")).toBe("-20px -75px");
                            })
                        });
                    } else if (disabled)  {
                        describe('inactive state', function() {
                            it('should be disabled', function() {
                                expect($radio.prop("disabled")).toBe(true);
                            });
                            it('should have background-position at -20px -25px', function() {
                                expect($radio.next().css("background-position")).toBe("-20px -25px");
                            })
                        });
                    } else if (checked) {
                        describe('checked state', function() {
                            it('should be checked', function() {
                                expect($radio.prop("checked")).toBe(true);
                            });                            
                            it('should have background-position at -20px -50px', function() {
                                expect($radio.next().css("background-position")).toBe("-20px -50px");
                            })
                        });
                    }
                    else {
                        describe('default state', function() {
                            it('should not be checked or disabled', function() {
                                expect($radio.attr("checked")).toBe(undefined);
                                expect($radio.attr("disabled")).toBe(undefined);
                            });                            
                            it('should have background-position at -20px -0px', function() {
                                expect($radio.next().css("background-position")).toBe("-20px 0px");
                            })
                        });
                    }
                });
            }
        });
    }
});