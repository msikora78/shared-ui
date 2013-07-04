define(['./util', 'injectable!tm/widgets/dropdown', 'injectable!tm/widgets/dropdownMenu', 'injectable!tm/widgets/widgetFactory'],

function(Util, injectableDropdown, injectableDropdownMenu, injectableWidgetFactory) {

    var USING_SELECT = "USING_SELECT";
    var USING_BUTTON = "USING_BUTTON";
    var USING_ELEMENT_AND_ARRAY = "USING_ELEMENT_AND_ARRAY";
    var renderType = [USING_SELECT, USING_BUTTON, USING_ELEMENT_AND_ARRAY];

    describe('Dropdown button with menu', function() {
        for (var version in jquery) {
            for (var i = 0; i < renderType.length; i++) {
                if (jquery.hasOwnProperty(version)) {
                    var DropdownMenu = injectableDropdownMenu(jquery[version]);
                    var WidgetFactory = injectableWidgetFactory(jquery[version]);
                    WidgetFactory.make('tmDropdownMenu', DropdownMenu);

                    var Dropdown = injectableDropdown(jquery[version]);
                    runTest(jquery[version], Util, Dropdown, i);
                }
            }
        }
    });

    function runTest($, Util, Dropdown, renderTypeIndex) {

        describe('with jquery v' + $.fn.jquery, function() {

            var $container, $toggleButtonGroup, $toggleButton, $toggleMenu, $menuitem, dropdown;

            runAllTest();

            var createDropdown = function(opts) {

                opts = $.extend({
                    items: [{
                            text: "Action 1",
                            value: "Value1"
                        }, {
                            text: "Action 2",
                            value: "Value2"
                        }
                    ]
                }, opts || {});

                $container = $('<div class="tm360"/>')

                if (renderType[renderTypeIndex] == USING_SELECT) {
                    var $select = $('<select><option value="Value1" data-href="#Action1">Action 1</option></select>');
                    $container.append($select);
                    dropdown = new Dropdown($select, {});
                    $toggleButton = dropdown.widget.btn;
                    $toggleMenu = dropdown.widget.ul;
                    $menuitem = $toggleMenu.find('a');
                    $buttonGroup = dropdown.widget.group;
                }

                if (renderType[renderTypeIndex] == USING_BUTTON) {
                    $toggleButton = $('<button type="button" class="btn dropdown-toggle">Select</button>');
                    $toggleMenu = $('<ul class="dropdown-menu"><li><a data-value="Value1" href="#1">Action 1</a></li></ul>');
                    $menuitem = $toggleMenu.find("a");
                    $buttonGroup = $('<div class="btn-group" style="position: absolute;" />').append($toggleButton, $toggleMenu);
                    $container.append($buttonGroup);

                    dropdown = new Dropdown($toggleButton, {});
                }

                if (renderType[renderTypeIndex] == USING_ELEMENT_AND_ARRAY) {
                    var $el = $('<button type="button" class="btn dropdown-toggle">Select</button>');

                    dropdown = new Dropdown($el, opts);

                    $toggleButton = dropdown.widget.btn;

                    // Hack because of dropdownMenu use .wrap method to add group around button and menu but wrap do not work in jasmine.
                    $container.append(dropdown.widget.group.append($toggleButton));

                    $toggleMenu = dropdown.widget.ul;
                    $menuitem = dropdown.widget.ul.find('a');
                    $buttonGroup = dropdown.widget.group;
                }

                $('body').append($container);
            };

            function runAllTest() {

                describe("Dropdown", function() {

                    beforeEach(function() {
                        createDropdown();
                    });

                    afterEach(function() {
                        $container.remove();
                    });

                    if (renderType[renderTypeIndex] == USING_SELECT) {
                        it('should return null', function() {
                            expect(dropdown.getData()).toBe(null);
                        });
                        it('should return selected value', function() {
                            dropdown.setData('Value1');
                            expect(dropdown.getData()).toBe("Value1");
                            expect(dropdown.widget.btn.text()).toBe('Action 1');
                        });
                    }

                    if (renderType[renderTypeIndex] == USING_BUTTON) {
                        it('should return default value', function() {
                            expect(dropdown.getData()).toBe(null);
                        });
                        it('should return selected value', function() {
                            dropdown.setData('Value1');
                            expect(dropdown.getData()).toBe('Value1');
                        });
                    }

                    if (renderType[renderTypeIndex] == USING_ELEMENT_AND_ARRAY) {
                        it('should return default value', function() {
                            expect(dropdown.getData()).toBe(null);
                        });
                        it('should return selected value', function() {
                            dropdown.setData('Value2');
                            expect(dropdown.getData()).toBe('Value2');
                            expect(dropdown.widget.btn.text()).toBe("Action 2");
                        });
                        it('should remove first item and and selected value change to null', function() {
                            dropdown.setData('Value1');
                            expect(dropdown.widget.ul.find('a').length).toBe(2);
                            dropdown.removeItem('Value1');
                            expect(dropdown.getData()).toBe(null);
                            expect(dropdown.widget.ul.find('a').length).toBe(1);
                        });
                        it('should remove first item and and selected value still the same', function() {
                            dropdown.setData('Value2');
                            expect(dropdown.widget.ul.find('a').length).toBe(2);
                            dropdown.removeItem('Value1');
                            expect(dropdown.getData()).toBe('Value2');
                            expect(dropdown.widget.ul.find('a').length).toBe(1);
                        });
                    }
                });
            }
        });
    }
});