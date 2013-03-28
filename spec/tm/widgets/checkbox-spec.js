define(['injectable!tm/widgets/checkbox', 'tm/widgets/checkableBase', 'mock/gadgetPrefMock', 'tm/core', './util'], function(checkboxInjectable, base, gadgetPrefMock, core, Util) {
    var gadgetPrefs = gadgetPrefMock({
    });
    var gadgets = {
        Prefs: function() {
            return gadgetPrefs;
        }
    }

    describe('Checkbox', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var checkbox = checkboxInjectable(jquery[version], gadgets, core, base);
                runTest(jquery[version], Util, checkbox);
            }
        }
    });

    function runTest($, Util, checkbox) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $checkbox, widget;
            
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
                        var states = [];

                        if (checked) {
                            states.push('checked');
                        }
                        if (disabled) {
                            states.push('disabled');
                        }
                        
                        $checkbox = $('<input type="checkbox" ' + states.join(' ') + ' />');
                        $container = $('<div class="tm360"/>').append($checkbox);
                        $('body').append($container);
                        
                        widget = new checkbox($checkbox);
                    });

                    afterEach(function() {
                        $container.remove();
                    });

                    describe('CSS common attributes', function() {
                        it('should be 18px height', function() {
                            expect($checkbox.next().outerHeight()).toBe(18);
                        });
                    });

                    if (checked && disabled)  {
                        describe('inactive state', function() {
                            it('should be disabled and checked', function() {
                                expect($checkbox.prop("disabled")).toBe(true);
                                expect($checkbox.prop("checked")).toBe(true);
                            });
                            it('should have background-position at 0px -75px', function() {
                                expect($checkbox.next().css("background-position")).toBe("0px -75px");
                            })
                     });
                    } else if (disabled)  {
                        describe('inactive state', function() {
                            it('should be disabled', function() {
                                expect($checkbox.prop("disabled")).toBe(true);
                            });
                            it('should have background-position at 0px -25px', function() {
                                expect($checkbox.next().css("background-position")).toBe("0px -25px");
                            })
                        });
                    } else if (checked) {
                        describe('checked state', function() {
                            it('should be checked', function() {
                                expect($checkbox.prop("checked")).toBe(true);
                            });                            
                            it('should have background-position at 0px -50px', function() {
                                expect($checkbox.next().css("background-position")).toBe("0px -50px");
                            })
                        });
                    }
                    else {
                        describe('default state', function() {
                            it('should not be checked or disabled', function() {
                                expect($checkbox.attr("checked")).toBe(undefined);
                                expect($checkbox.attr("disabled")).toBe(undefined);
                            });                            
                            it('should have background-position at 0px 0px', function() {
                                expect($checkbox.next().css("background-position")).toBe("0px 0px");
                            })
                        });
                    }
                });
            }
        });
    }
});