define(['./util', 'injectable!tm/widgets/dropdownMenu'], function(Util, injectableDropdownMenu) {

    var USING_SELECT = "USING_SELECT";
    var USING_BUTTON = "USING_BUTTON";
    var USING_ELEMENT_AND_ARRAY = "USING_ELEMENT_AND_ARRAY";
    var renderType = [USING_SELECT, USING_BUTTON, USING_ELEMENT_AND_ARRAY];

    describe('Dropdown button with menu', function() {
        for (var version in jquery) {
            for (var i = 0; i < renderType.length; i++) {
                if (jquery.hasOwnProperty(version)) {
                    var DropdownMenu = injectableDropdownMenu(jquery[version]);
                    runTest(jquery[version], Util, DropdownMenu, i);
                }
            }
        }
    });

    function runTest($, Util, DropdownMenu, renderTypeIndex) {

        describe('with jquery v' + $.fn.jquery, function() {

            var $container, $toggleButtonGroup, $toggleButton, $toggleMenu, $menuitem, widget;

            runAllTest(false, false, false, false); //default
            runAllTest(true, false, false, false); //hovered
            runAllTest(false, true, false, false); //opened
            runAllTest(false, true, true, false); //opened item hovered
            runAllTest(false, false, false, true); //disabled

            var createDropdown = function() {

                $container = $('<div class="tm360"/>');

                if (renderType[renderTypeIndex] == USING_SELECT) {
                    var $select = $('<select><option value="Action1" data-href="#Action1">Action 1</option></select>');
                    $container.append($select);
                    widget = new DropdownMenu($select, {});
                    $toggleButton = widget.btn;
                    $toggleMenu = widget.ul;
                    $menuitem = $toggleMenu.find('a');
                    $buttonGroup = widget.group;
                }

                if (renderType[renderTypeIndex] == USING_BUTTON) {
                    $toggleButton = $('<button type="button" class="btn dropdown-toggle">Select</button>');
                    $toggleMenu = $('<ul class="dropdown-menu"><li><a tabindex="-1" href="#1">Action 1</a></li></ul>');
                    $menuitem = $toggleMenu.find("a");
                    $buttonGroup = $('<div class="btn-group" style="position: absolute;" />').append($toggleButton, $toggleMenu);
                    $container.append($buttonGroup);

                    widget = new DropdownMenu($toggleButton, {});
                }

                if (renderType[renderTypeIndex] == USING_ELEMENT_AND_ARRAY) {
                    var $el = $('<button type="button" class="btn dropdown-toggle">Select</button>');

                    widget = new DropdownMenu($el, {
                        items: [{
                                text: "Action 1",
                                value: "Value1"
                            }
                        ]
                    });

                    $toggleButton = widget.btn;

                    // Hack because of dropdownMenu use .wrap method to add group around button and menu but wrap do not work in jasmine.
                    $container.append(widget.group.append($toggleButton));

                    $toggleMenu = widget.ul;
                    $menuitem = $toggleMenu.find('a');
                    $buttonGroup = widget.group;

                }

                $('body').append($container);
            };

            function runAllTest(hover, open, itemHovered, disabled) {
                var desc = '';
                desc += hover ? 'hovered ' : '';
                desc += open ? 'opened ' : '';
                desc += disabled ? 'inactive ' : '';
                desc = desc || "default state";

                describe(desc, function() {
                    beforeEach(function() {


                        createDropdown();

                        if (disabled) {
                            $toggleButton.attr("disabled", "disabled");
                        }
                        if (hover) {
                            $toggleButton.addClass('hover');
                            // $toggleButton.addClass("hover");
                        }
                        if (open) {
                            $buttonGroup.addClass('open');
                            $toggleButton.addClass('active');
                        }
                        if (itemHovered) {
                            $menuitem.addClass("hover");
                        }
                    });

                    afterEach(function() {
                        $container.remove();
                    });

                    describe('button common features', function() {
                        it('should be 3px rounded corners', function() {
                            Util.evaluateBorderRadius($toggleButton, '3px');
                        });

                        it('should be 28px height', function() {
                            expect($toggleButton.outerHeight()).toBe(28);
                        });

                        it('should be 1px border', function() {
                            Util.evaluateBorderWidth($toggleButton, '1px');
                        });

                        it('should be 12px Museo Sans 500', function() {
                            expect($toggleButton.css('font-family')).toContain('MuseoSans500');
                            expect($toggleButton.css('font-size')).toBe('12px');
                        });
                    });

                    if (disabled)  {
                        /*
                        f) Dropdown Button (Inactive)  
                        • Shape: #fff, 1px #c8c9ce border 
                        • Text: #c8c9ce 
                        • Icon: TBD?
                        */
                        it('should have a #fff background', function() {
                            var rgb = Util.convertHexaToRgb("ffffff");
                            expect($toggleButton.css('background-color')).toBe(rgb);
                        });

                        it('should have border #c8c9ce', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("c8c9ce"));
                        });

                        it('should have #c8c9ce color', function() {
                            var rgb = Util.convertHexaToRgb("c8c9ce");
                            expect($toggleButton.css('color')).toBe(rgb);
                        });
                    } else if (open) {
                        /*
                        c) Dropdown Button (Clicked)  
                        • Shape: #4f5158, 1px #1f2127 border 
                        • Text: #fff with 1px #000 drop shadow, 135° angle at 25% opacity 
                        • Icon: White down arrow in: grfx_01.png
                        */
                        it('should have a #4f5158 background', function() {
                            var rgb = Util.convertHexaToRgb("4f5158");
                            expect($toggleButton.css('background-color')).toBe(rgb);
                        });

                        it('should have border #1f2127', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("1f2127"));
                        });

                        it('should have #FFFFFF color', function() {
                            var rgb = Util.convertHexaToRgb("FFFFFF");
                            expect($toggleButton.css('color')).toBe(rgb);
                        });

                        it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                            var textShadow = Util.parseTextShadowValue($toggleButton.css('text-shadow'));
                            expect(textShadow.toString() || 'none').toBe('none');
                        });

                        describe('Dropdown menu', function() {
                            /*
                            Dropdown Menu
                            Pops up 2px lower than button and is the same exact width as the button.  
                            #fff bg, 1px #9296a3 border, 6px #000 drop shadow at 2px distance, 90° angle at 25% opacity 
                            20px margin on all 4 sides, inside the container  
                            */
                            it('should pop up 2px lower than button', function() {
                                var menuTop = parseInt($toggleMenu.css("top")) + parseInt($toggleMenu.css("margin-top"));
                                var groupBottom = parseInt($toggleMenu.css("top")) + parseInt(Util.calculateDistance($buttonGroup, "bottom"));
                                expect(menuTop).toBe(groupBottom + 2);
                            });

                            it('should be same exact width as the button', function() {
                                var menuWidth = parseInt($toggleMenu.outerWidth());
                                var buttonWidth = parseInt($toggleMenu.outerWidth());
                                expect(menuWidth).toBe(buttonWidth);
                            });

                            /*
                            e) Menu Text 
                            • 12px Museo Sans 500, #4f5158 
                            */
                            it('should have #4F5158 color', function() {
                                var rgb = Util.convertHexaToRgb("4F5158");
                                expect($menuitem.css('color')).toBe(rgb);
                            });

                            it('should have 12px font size', function() {
                                expect($menuitem.css('font-size')).toBe("12px");
                            });

                            /*
                            d) Hover Selection 
                            • 28px high, 3px corner radius, #ebebee (no text change) 
                            */
                            if (itemHovered) {
                                describe('hovered item', function() {
                                    it('should have a background-color of #ebebee', function() {
                                        var rgb = Util.convertHexaToRgb("ebebee");
                                        expect($menuitem.css('background-color')).toBe(rgb);
                                    });

                                    it('should be 3px rounded corners', function() {
                                        Util.evaluateBorderRadius($menuitem, '3px');
                                    });

                                    it('should have 10px margins', function() {
                                        expect(($toggleMenu.innerWidth() - $menuitem.innerWidth()) / 2).toBe(10);
                                        expect(($toggleMenu.innerHeight() - $menuitem.innerHeight()) / 2).toBe(10);
                                    });
                                });
                            } else {
                                describe('default state item', function() {
                                    it('should have a background-color opacity of 0', function() {
                                        expect(Util.parseRGBA($menuitem.css('background-color')).rgba.a).toBe(0);
                                    });

                                    it('should have 10px margins', function() {
                                        expect(($toggleMenu.innerWidth() - $menuitem.innerWidth()) / 2).toBe(10);
                                        expect(($toggleMenu.innerHeight() - $menuitem.innerHeight()) / 2).toBe(10);
                                    });
                                });
                            }

                            /*
                            dd) Selected item 
                            • Same as (d) but fill is #4f5158, text is #fff 
                            */

                        });
                    } else if (hover) {
                        /*
                        b) Dropdown Button (Hover) 
                        • Shape: #fff, 1px #9296a3 border, drop shadow 3px at 1px distance, 90° angle, #000 at 25% opacity 
                        • Text: Same as (a) 
                        */
                        it('should have a #ffffff background', function() {
                            var rgb = Util.convertHexaToRgb("ffffff");
                            expect($toggleButton.css('background-color')).toBe(rgb);
                        });

                        it('should have border #9296a3', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("9296a3"));
                        });

                        it('should have #4F5158 color', function() {
                            var rgb = Util.convertHexaToRgb("4F5158");
                            expect($toggleButton.css('color')).toBe(rgb);
                        });

                        it('should have box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25)', function() {
                            var boxShadow = Util.parseShadowValue($toggleButton.css('box-shadow'));
                            expect(boxShadow.toString()).toBe('rgba(0, 0, 0, 0.25) 0px 2px 5px 0px');
                        });

                        it('should have no text-shadow', function() {
                            expect($toggleButton.css('text-shadow') || 'none').toBe('none');
                        });

                        it('blue primary button', function() {

                            $toggleButton.addClass('btn-primary');

                            var textShadow = Util.parseTextShadowValue($toggleButton.css('text-shadow'));
                            expect(textShadow.toString()).toBe('rgba(0, 0, 0, 0.25) -1px -1px 1px');

                            var rgb = Util.convertHexaToRgb("ffffff");
                            expect($toggleButton.css('color')).toBe(rgb);

                            var rgb = Util.convertHexaToRgb("2d93d4");
                            expect($toggleButton.css('background-color')).toBe(rgb);
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("9296a3"));
                        });

                    } else {
                        /*
                        a) Dropdown Button (Default) 
                        • Shape: Gradient #fff at top to #d4d6d9 at bottom; 1px #9296a3 border  
                        • Text: 12px Museo Sans 500, #4f5158, 1px drop shadow, #fff, -45° angle (no change on hover) 
                        • Icon: Dark grey down arrow in: grfx_01.png
                        */
                        it('should have a gradient #fff at top to #d4d6d9 at bottom', function() {
                            var rgbTop = Util.convertHexaToRgb("ffffff");
                            var rgbBottom = Util.convertHexaToRgb("d4d6d9");
                            var gradient = Util.gradientSupport($toggleButton);
                            expect(gradient).toBeTruthy();
                            expect($toggleButton.css(Util.styleSupport($toggleButton, 'background-image'))).toContain(rgbTop + ', ' + rgbBottom);
                        });

                        it('should be border #9296a3', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("9296a3"));
                        });

                        it('should have #4F5158 color ', function() {
                            var rgb = Util.convertHexaToRgb("4F5158");
                            expect($toggleButton.css('color')).toBe(rgb);
                        });

                        it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                            var textShadow = Util.parseTextShadowValue($toggleButton.css('text-shadow'));
                            expect(textShadow.toString()).toBe('rgba(255, 255, 255, 0.25) 0px 0px 1px');
                        });

                        it('blue primary button', function() {

                            $toggleButton.addClass('btn-primary');

                            var textShadow = Util.parseTextShadowValue($toggleButton.css('text-shadow'));
                            expect(textShadow.toString()).toBe('rgba(0, 0, 0, 0.25) -1px -1px 1px');

                            var rgb = Util.convertHexaToRgb("ffffff");
                            expect($toggleButton.css('color')).toBe(rgb);

                            var rgb = Util.convertHexaToRgb("2d93d4");
                            expect($toggleButton.css('background-color')).toBe(rgb);
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("9296a3"));
                        });

                        it('should create one item in menu list', function() {
                            expect($toggleMenu.find('a').length).toBe(1);
                        });
                    }
                });
            }
        });

    }
});