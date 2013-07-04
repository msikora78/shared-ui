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
            
            runAllTest();
            runAllTest(true);
            runAllTest(true, true);
            runAllTest(false, true);

            function runAllTest(checked, disabled) {
                var desc = '';
                desc += checked ? 'Selected ' : 'Unselected ';
                desc += disabled ? 'inactive ' : 'active';

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

                    if (checked && disabled)  {
                        it('should be disabled and checked', function() {
                            expect($checkbox.prop("disabled")).toBe(true);
                            expect($checkbox.prop("checked")).toBe(true);
                        });
                        it('should have background-position at -256px -30px', function() {
                            expect($checkbox.next().css("background-position")).toBe("-256px -30px");
                        });
                    } else if (disabled)  {
                        it('should be disabled', function() {
                            expect($checkbox.prop("disabled")).toBe(true);
                        });
                        it('should have background-position at -256px -6px', function() {
                            expect($checkbox.next().css("background-position")).toBe("-256px -6px");
                        });
                    } else if (checked) {
                        it('should be checked', function() {
                            expect($checkbox.prop("checked")).toBe(true);
                        });                            
                        it('should have background-position at -232px -30px', function() {
                            expect($checkbox.next().css("background-position")).toBe("-232px -30px");
                        });
                    }
                    else {
                        it('should not be checked or disabled', function() {
                            expect($checkbox.attr("checked")).toBe(undefined);
                            expect($checkbox.attr("disabled")).toBe(undefined);
                        });                            
                        it('should have background-position at -232px -6px', function() {
                            expect($checkbox.next().css("background-position")).toBe("-232px -6px");
                        });
                    }

                    describe('CSS common attributes', function() {
                        it('should be 18px height', function() {
                            expect($checkbox.next().outerHeight()).toBe(18);
                        });
                    });
                });
            }
        });
    }
});