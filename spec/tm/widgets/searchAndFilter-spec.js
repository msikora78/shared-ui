define(['injectable!tm/widgets/searchAndFilter', './util'], function(searchAndFilterInjectable, Util) {

    describe('tm.widgets.searchAndFilter', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var SearchAndFilter = searchAndFilterInjectable(jquery[version]);
                runTest(jquery[version], Util, SearchAndFilter);
            }
        }
    });

    function runTest($, Util, SearchAndFilter) {

        describe('with jquery v' + $.fn.jquery, function() {
            var $container, $input, widget;

            runAllTest(false);
            runAllTest(true);

            function runAllTest(isDark) {
                describe(isDark ? 'darker background' : 'white background', function() {
                    beforeEach(function() {
                        $container = $('<div>');
                        if (isDark) {
                             $container.addClass("search-filter-bg");
                        }
                        $input = $('<form class="form-search"><div style="position: relative;"><input type="text" class="input-medium search-query" placeholder="Search Test" /><i class="search-clear-icon"></i></div></form>');

                        $container.append($input);
                        $('body').append($container);

                        widget = new SearchAndFilter($input);
                    });

                    afterEach(function() {
                        $container.remove();
                    });

                    it('should be 12px Arial Regular #4F5158 for entered value', function() {
                        $input.val("test").blur();
                        Util.wait(500).done(function() {
                            expect($input.css('font-size')).toBe('14px');
                            expect($input.css('font-family')).toContain('Arial');
                            expect($input.css('color')).toBe(Util.convertHexaToRgb("4F5158"));
                        });
                    });
/*
                    if (isDark) {
                        it('should have a 1px border that’s #9296A3', function() {
                            Util.evaluateBorderWidth($input, '1px');
                            Util.evaluateBorderColor($input, Util.convertHexaToRgba("9296A3"));
                        });
                    } else {
                        it('should have a 1px border that’s #B6B7BD', function() {
                            Util.evaluateBorderWidth($input, '1px');
                            Util.evaluateBorderColor($input, Util.convertHexaToRgba("B6B7BD"));
                        });
                    }
*/
                });
            }
        });
    }
});