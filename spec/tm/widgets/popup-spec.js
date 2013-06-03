define(['injectable!tm/widgets/popup', 'mock/gadgetPrefMock', 'tm/core', './util'], function(popupInjectable, gadgetPrefMock, tm, Util) {
    var gadgetPrefs = gadgetPrefMock({
    });
    var gadgets = {
        Prefs: function() {
            return gadgetPrefs;
        }
    }

    var onClick = function() {};

    describe('Popup', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var popup = popupInjectable(jquery[version], gadgets, tm);
                runTest(jquery[version], Util, tm, popup);
            }
        }
    });

    describe('Templated popup', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var $ = jquery[version];
                var $container, $target, $popup, widget;
                
                beforeEach(function() {
                    var Popup = popupInjectable(jquery[version], gadgets, tm);
                    $target = $('<button id="target" type="button" title="Popup\s title" class="btn" style="position: fixed; top: 50%; left: 50%; min-width: 30px;" data-trigger="manual" data-template-id="advanced-popup-template">?</button>');
                    $template = $('<div id="advanced-popup-template" style="height: 100px; width: 200px;">\n\
                                        <button id="advanced-popup-template-close" type="button" class="btn btn-primary" style="float: right; clear: both;">Close</button>\n\
                                </div>');
                    $container = $('<div class="tm360"></div>').append($target).append($template);
                    $('#advanced-popup-template-close').click(onClick);
                    $('body').append($container);
                    
                    widget = new Popup($target);
                    widget.show();
                    $popup = $target.next('.tmPopup');
                });

                afterEach(function() {
                    widget.hide();
                    $('.tm360').remove();
                });

                it('should keep event bindings', function() {
                    expect($popup.find('#advanced-popup-template-close').data('events').click[0].handler).toBe(onClick);
                });
            }
        } 
    })

    function runTest($, Util, tm, popup) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $target, $popup, $title, $arrow, widget;
            var posDef = {
                left: ['top', 'bottom'], 
                right: ['top', 'bottom'], 
                top: ['left', 'right'], 
                bottom: ['left', 'right']};

            for (var pos in posDef) {
                for (var i = 0; i < 2; i++) {
                    runAllTest(false, '', pos, posDef[pos][i]);
                    runAllTest(true, '', pos, posDef[pos][i]);
                    runAllTest(true, 'Popup title', pos, posDef[pos][i]);
                    runAllTest(false, 'Popup title', pos, posDef[pos][i]);
                }
            }

            function runAllTest(showArrow, title, primaryPosition, secondaryPosition) {
                var position = primaryPosition + '-' + secondaryPosition,
                    desc = '';
                desc += position.toUpperCase();
                desc += showArrow ? '+ARROW' : '';
                desc += title ? '+TITLE' : '';

                describe(desc, function() {
                    var attributes = [];
                    if (title != '') {
                        attributes.push('title="' + title + '"');
                    }
                    attributes.push('data-show-arrow="' + showArrow + '"');
                    attributes.push('data-content="It\'s so simple to create a popup!"');
                    attributes.push('data-placement="' + position + '"');
                    beforeEach(function() {
                        $target = $('<button id="target" type="button" class="btn" style="position: fixed; top: 50%; left: 50%; min-width: 30px;" data-trigger="manual" ' + attributes.join(' ') + '>?</button>');
                        $container = $('<div class="tm360"></div>').append($target);
                        $('body').append($container);
                        
                        widget = new popup($target);
                        widget.show();
                        $popup = $target.next('.tmPopup');
                        $title = $popup.find('.popover-title');
                        $arrow = $popup.find('.arrow');
                    });

                    afterEach(function() {
                        widget.hide();

                        $container.remove();
                    });

                    it('should be rendered', function() {
                        expect($popup.length).toBeGreaterThan(0);
                    });

                    if (showArrow)  {
                        it('should display arrow', function() {
                            expect($popup.find('.arrow').length).toBeGreaterThan(0);
                            expect($popup.find('.arrow').css('display')).toBe('block');
                        });
                    } 
                    else {
                        it('should hide arrow', function() {
                            expect($popup.find('.arrow').length).toBeGreaterThan(0);
                            expect($popup.find('.arrow').css('display')).toBe('none');
                        });
                    }

                    if (title != '') {
                        describe('Popup\'s title', function() {
                            it('should display title', function() {
                                expect($popup.find('.popover-title').length).toBeGreaterThan(0);
                                expect($popup.find('.popover-title').css('display')).toBe('block');
                            });
                            it('should be 18px Museo Sans 500', function() {
                                expect($title.css('font-family')).toContain('MuseoSans500');
                                expect($title.css('font-size')).toBe('18px');
                            });
                            it('should have #4f5158 color', function() {
                                Util.evaluateColor($title, "4f5158");
                            });
                        });
                    }
                    else {
                        it('should hide title', function() {
                            expect($popup.find('.popover-title').length).toBe(0);
                        });
                    }

                    // stateless tests
                    describe('Popup\'s container', function() {
                        var arrowOffset = 17;
                        it('should have #fff background-color', function() {
                            Util.evaluateBackgroundColor($popup, '#ffffff');
                        });
                        it('should have 1px border', function() {
                            Util.evaluateBorderWidth($popup, '1px');
                        });
                        it('should have #9296a3 colored border', function() {
                            Util.evaluateBorderColor($popup, Util.convertHexaToRgb('#9296a3'));
                        });
                        it('should have solid border', function() {
                            Util.evaluateBorderStyle($popup, 'solid');
                        });
                        it('should have no border-radius', function() {
                            Util.evaluateBorderRadius($popup, '0px');
                        });
                        it('should have drop shadow 6px at 2px distance, 90° angle, #000 at 25% opacity', function() {
                            Util.evaluateBoxShadow($popup, 'rgba(0, 0, 0, 0.25) 0px 2px 6px 0px');
                        });

                        // Testing primary placement
                        if (primaryPosition == 'top') {
                            it('should pop up 2px over text link or icon graphic', function() {
                                expect($popup.offset().top + $popup.outerHeight()).toBe($target.offset().top - (1 + (showArrow ? $arrow.outerHeight() : 1)));
                            });
                        }
                        if (primaryPosition == 'bottom') {
                            it('should pop up 2px lower than text link or icon graphic', function() {
                                expect($popup.find('.popover-inner').offset().top).toBe($target.offset().top + $target.outerHeight() + (3 + (showArrow ? $arrow.outerHeight() : 1)));
                            });
                        }

                        if (primaryPosition == 'left') {
                            it('should pop up 2px left from text link or icon graphic', function() {
                                expect($popup.offset().left + $popup.outerWidth()).toBe($target.offset().left - (1 + (showArrow ? $arrow.outerWidth() : 1)));
                            });
                        }
                        if (primaryPosition == 'right') {
                            it('should pop up 2px right from text link or icon graphic', function() {
                                expect($popup.find('.popover-inner').offset().left).toBe($target.offset().left + $target.outerWidth() + (3 + (showArrow ? $arrow.outerWidth() : 1)));
                            });
                        }

                        // Testing secondary placement
                        if (secondaryPosition == 'top') {
                            it('should have same bottom position as target', function() {
                                expect($popup.offset().top + $popup.outerHeight()).toBe($target.offset().top + $target.outerHeight() + (showArrow ? arrowOffset : 0));
                            });
                        }
                        if (secondaryPosition == 'bottom') {
                            it('should have same top position as target', function() {
                                expect($popup.offset().top).toBe($target.offset().top - (showArrow ? arrowOffset : 0));
                            });
                        }
                        
                        if (secondaryPosition == 'left') {
                            it('should have same right position as target', function() {
                                expect($popup.offset().left + $popup.outerWidth()).toBe($target.offset().left + $target.outerWidth() + (showArrow ? arrowOffset : 0));
                            });
                        }
                        if (secondaryPosition == 'right') {
                            it('should have same left position as target', function() {
                                expect($popup.offset().left).toBe($target.offset().left - (showArrow ? arrowOffset : 0));
                            });
                        }
                    });
                });
            }
        });
    }
});