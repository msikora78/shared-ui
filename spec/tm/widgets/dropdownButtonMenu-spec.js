define(['./util'], function(Util) {
	describe('Dropdown button with menu', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                runTest(jquery[version], Util);
            }
        }
    });

    function runTest($, Util) {
    	
    	describe('with jquery v' + $.fn.jquery, function() {
            var $container, $toggleButtonGroup, $toggleButton, $toggleMenu, $menuitem;

            runAllTest(false, false, false, false); //default
            runAllTest(true, false, false, false);  //hovered
            runAllTest(false, true, false, false);  //opened
            runAllTest(false, true, true, false);  //opened item hovered
            runAllTest(false, false, false, true);  //disabled

            function runAllTest(hover, open, itemHovered, disabled) {
            	var desc = '';
                desc += hover ? 'hovered ' : '';
                desc += open ? 'opened ' : '';
                desc += disabled ? 'inactive ' : '';
                desc = desc || "default state";

                describe(desc, function() {
                    beforeEach(function() {
                        $toggleButton = $('<button type="button" class="btn dropdown-toggle">Select</button>');
                        $toggleMenu = $('<ul class="dropdown-menu"><li><a tabindex="-1" href="#1">Action 1</a></li></ul>');
						$menuitem = $toggleMenu.find("a");
						$buttonGroup = $('<div class="btn-group" style="position: absolute;" />').append($toggleButton, $toggleMenu);
                        $container = $('<div class="tm360 no-touch"/>').append($buttonGroup);
                        $('body').append($container);

                        if (disabled) {
                            $toggleButton.attr("disabled", "disabled");
                        }
                        if (hover) {
                        	$toggleButton.addClass("hover");
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
                            Util.evaluateBackgroundColor($toggleButton, 'ffffff');
                        });

                        it('should have border #c8c9ce', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("c8c9ce"));
                        });

                        it('should have #c8c9ce color', function() {
                            Util.evaluateColor($toggleButton, 'c8c9ce');
                        });
					} else if (open) {
						/*
						c) Dropdown Button (Clicked)  
						• Shape: #4f5158, 1px #1f2127 border 
						• Text: #fff with 1px #000 drop shadow, 135° angle at 25% opacity 
						• Icon: White down arrow in: grfx_01.png
						*/
                        it('should have a #4f5158 background', function() {
                            Util.evaluateBackgroundColor($toggleButton, '4f5158');
                        });

                        it('should have border #1f2127', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("1f2127"));
                        });

                        it('should have #FFFFFF color', function() {
                            Util.evaluateColor($toggleButton, 'FFFFFF');
                        });

                        it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                            Util.evaluateTextShadow($toggleButton, 'none');
                        });
						
                        describe('Dropdown menu', function() {
	                        /*
							Dropdown Menu
							Pops up 2px lower than button and is the same exact width as the button.  
							#fff bg, 1px #9296a3 border, 6px #000 drop shadow at 2px distance, 90° angle at 25% opacity 
							20px margin on all 4 sides, inside the container  
							*/
							it('should pop up 2px lower than button', function() {
	                            var menuTop = parseInt($toggleMenu.css("top"))
	                            	+ parseInt($toggleMenu.css("margin-top"));
	                            var groupBottom = parseInt($toggleMenu.css("top"))
	                            	+ parseInt(Util.calculateDistance($buttonGroup, "bottom"));
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
                                Util.evaluateColor($menuitem, '4F5158');
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
									it ('should have a background-color of #ebebee', function() {
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
									it ('should have a background-color opacity of 0', function() {
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
                            Util.evaluateBackgroundColor($toggleButton, 'ffffff');
                        });

                        it('should have border #9296a3', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("9296a3"));
                        });

                        it('should have #4F5158 color', function() {
                            Util.evaluateColor($toggleButton, '4F5158');
                        });

                        it('should have box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25)', function() {
                            Util.evaluateBoxShadow($toggleButton, 'rgba(0, 0, 0, 0.25) 0px 2px 5px 0px');
                        });

                        it('should have no text-shadow', function() {
                            Util.evaluateTextShadow($toggleButton, 'none');
                        });
                    } else {
						/*
						a) Dropdown Button (Default) 
						• Shape: Gradient #fff at top to #d4d6d9 at bottom; 1px #9296a3 border  
						• Text: 12px Museo Sans 500, #4f5158, 1px drop shadow, #fff, -45° angle (no change on hover) 
						• Icon: Dark grey down arrow in: grfx_01.png
						*/
                        it('should have a gradient #fff at top to #d4d6d9 at bottom', function() {
                            Util.evaluateGradient($toggleButton, "#ffffff", "#d4d6d9")
                        });

                        it('should be border #9296a3', function() {
                            Util.evaluateBorderColor($toggleButton, Util.convertHexaToRgb("9296a3"));
                        });

                        it('should have #4F5158 color ', function() {
                            Util.evaluateColor($toggleButton, '4F5158');
                        });

                        it('should have text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.25) ', function() {
                            Util.evaluateTextShadow($toggleButton, 'rgba(255, 255, 255, 0.25) 0px 0px 1px')
                        });
                    }
                });
            }
        });

    }
});