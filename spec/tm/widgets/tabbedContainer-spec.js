define(['./util', 'injectable!tm/widgets/tabbedContainer'], function(Util, injectableTabbedContainer) {

    describe('Tabbed Container', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var TabbedContainer = injectableTabbedContainer(jquery[version]);
                runTest(jquery[version], Util, TabbedContainer);
            }
        }
    });

    function runTest($, Util, TabbedContainer) {

        describe('with jquery v' + $.fn.jquery, function() {

            var $container, widget, $tabbedContainer, $nav, $tabContent;
            var CONTENT_TEXT = "Content for Tab ";
            var TAB_LABEL = "Tab ";


            var createTabbedContainerWithOpts = function(numberOfElements) {
                $container = $('<div class="tm360"/>')
                $tabbedContainer = $('<div class="tabbed-container"></div>').appendTo($container);
                $('body').append($container);
            };

            var createTabbedContainerWithDOM = function(numberOfElements) {
                $container = $('<div class="tm360"/>')

                $tabbedContainer = $('<div class="tabbed-container"></div>');
                $nav = $('<ul class="nav nav-pills"></ul>');
                $tabContent = $('<div class="tab-content"></div>');
                for (var i = 0; i < numberOfElements; i++) {
                    $nav.append($('<li><a href="#tab' + i + '">' + TAB_LABEL + i + '</a></li>'));
                    $tabContent.append($('<div id="tab' + i + '" class="tab-pane">' + CONTENT_TEXT + i + '</div>'));
                }
                $tabbedContainer.append($nav, $tabContent);
                $container.append($tabbedContainer);
                $('body').append($container);

            };

            var initTabbedContainer = function(opts) {
                var data = typeof(opts) === 'undefined' ? {} : opts;
                widget = new TabbedContainer($tabbedContainer, opts);
                $nav = $tabbedContainer.find('.nav');
                $tabContent = $tabbedContainer.find('.tab-content');
            };

            var opts = {
                nav: [{
                    id: "Tab0",
                    text: "Tab 0",
                    content: "Content for Tab 0"
                }, {
                    id: "Tab1",
                    text: "Tab 1",
                    content: "Content for Tab 1"
                }, {
                    id: "Tab2",
                    text: "Tab 2",
                    content: "Content for Tab 2"
                }, {
                    id: "Tab3",
                    text: "Tab 3",
                    content: "Content for Tab 3"
                }]
            };
            runAllTest(createTabbedContainerWithOpts, opts);
            runAllTest(createTabbedContainerWithDOM);

            function runAllTest(generateWidget, opts) {

                describe("Dropdown", function() {

                    afterEach(function() {
                        $container.remove();
                    });

                    it('create 4 elements in the list display first tab content', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);
                        expect($tabContent.find('.tab-pane').length).toBe(numberOfElements);
                        expect($tabContent.find('.tab-pane:first').is(':visible')).toBe(true);
                    });

                    it('create 4 elements in the list and select first tab', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);
                        expect($nav.find('li').length).toBe(numberOfElements);
                        expect($nav.find('li:first').hasClass('active')).toBe(true);
                    });

                    it('should select third element and display visual correctly', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);
                        widget.selectTabByIndex(2);

                        var selectedNav = $nav.find('li:eq(2)');
                        expect(selectedNav.hasClass('active')).toBe(true);
                        expect(selectedNav.text()).toBe(TAB_LABEL + 2);

                        var selectedContent = $tabContent.find('div:eq(2)');
                        expect(selectedContent.is(':visible')).toBe(true);
                        expect(selectedContent.text()).toBe(CONTENT_TEXT + 2);
                    });

                    it('should respect class for DOM structure of TabbecContainer', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);

                        expect($tabbedContainer.hasClass('tabbed-container')).toBe(true);
                        expect($nav.hasClass('nav')).toBe(true);
                        expect($nav.hasClass('nav-pills')).toBe(true);
                        expect($tabContent.hasClass('tab-content')).toBe(true);

                        var hasTabPaneClass = 0;
                        $.each($tabContent.find('div'), function(val, item) {
                            hasTabPaneClass++;
                        });

                        expect($tabContent.find('div').length).toBe(hasTabPaneClass);
                    });

                    /**
                     * NAV BAR
                     */
                    it('should have right style for nav ul', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);

                        expect($nav.css('border-radius')).toBe("5px 0px 0px");
                        expect($nav.css('background-color')).toBe(Util.convertHexaToRgb("8d919d"));
                        expect($nav.css('height')).toBe("34px");
                        expect($nav.css('margin-bottom')).toBe("0px");
                        expect($nav.css('margin-left')).toBe("0px");
                    });

                    /**
                     * NAV ITEMS
                     */
                    it('should have right style for nav items', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);

                        var targetElement = $nav.find('li:eq(0)');
                        expect(targetElement.css('margin')).toBe("5px 0px 5px 10px");
                        expect(targetElement.css('padding')).toBe("0px");
                        expect(targetElement.find('a').css('padding')).toBe("7px 10px 3px");
                        expect(targetElement.css('height')).toBe('24px');
                        expect(targetElement.css('max-height')).toBe('24px');
                        Util.evaluateBackgroundColor(targetElement.find('a'), "4f5158");

                        expect(targetElement.find('a').css('color')).toBe(Util.convertHexaToRgb("ffffff"));
                        expect(targetElement.find('a').css('font-family')).toBe("MuseoSans500");
                        expect(targetElement.find('a').css('height')).toBe("14px");
                        expect(targetElement.find('a').css('max-height')).toBe("14px");
                        expect(targetElement.find('a').css('line-height')).toBe("14px");
                        Util.evaluateTextShadow(targetElement.find('a'), "rgba(0, 0, 0, 0.3) -1px -1px 1px");
                        expect(targetElement.find('a').css('border-radius')).toBe("3px");

                        expect(targetElement.next().css('background-color')).toBe("rgba(0, 0, 0, 0)");
                        expect(targetElement.next().css('margin')).toBe("5px 0px 5px 5px");
                    });

                    /**
                     * CONTAINER
                     */
                    it('should have right style for container', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);

                        expect($tabContent.css('border-top')).toBe("0px none rgb(51, 51, 51)");
                        expect($tabContent.css('border-right')).toBe("1px solid rgb(200, 201, 206)");
                        expect($tabContent.css('border-bottom')).toBe("1px solid rgb(200, 201, 206)");
                        expect($tabContent.css('border-left')).toBe("1px solid rgb(200, 201, 206)");
                        expect($tabContent.css('border-radius')).toBe("0px 5px 5px");
                        expect($tabContent.css('padding')).toBe("20px");
                        expect($tabContent.css('background-color')).toBe(Util.convertHexaToRgb("ffffff"));

                        // support tabbed container on darker background.
                        $container.addClass('bg-soft-grey');
                        expect($tabContent.css('border-top')).toBe("0px none rgb(51, 51, 51)");
                        expect($tabContent.css('border-right')).toBe("0px none rgb(51, 51, 51)");
                        expect($tabContent.css('border-bottom')).toBe("0px none rgb(51, 51, 51)");
                        expect($tabContent.css('border-left')).toBe("0px none rgb(51, 51, 51)");

                    });

                    // CONTAINER CONTENT
                    it('should have right style for container', function() {
                        var numberOfElements = 4;
                        generateWidget(numberOfElements);
                        initTabbedContainer(opts);

                        expect($tabContent.find('div:first').hasClass('active')).toBe(true);
                        expect($tabContent.find('div:first').text()).toBe(CONTENT_TEXT + "0");
                        expect($tabContent.find('.tab-pane').length).toBe(4);
                    });

                });
            }
        });
    }
});