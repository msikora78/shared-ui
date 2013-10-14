define(['injectable!tm/widgets/backToTopButton', 'mock/gadgetPrefMock', 'tm/core', './util'], function(injectableBackToTopButton, gadgetPrefMock, core, Util) {

    var gadgetPrefs = gadgetPrefMock({
        'tm.widgets.backToTopButton.text': 'Back to Top'
    });
    var gadgets = {
        Prefs: function() {
            return gadgetPrefs;
        }
    };

    describe('Back to Top button', function() {
        for (var version in jquery) {
            if (jquery.hasOwnProperty(version)) {
                var BackToTopButton = injectableBackToTopButton(jquery[version], gadgets, core);
                runTest(jquery[version], Util, BackToTopButton);
            }
        }
    });

    function runTest($, Util, BackToTopButton) {

        describe('with jquery v' + $.fn.jquery, function() {

            var $container, $backToTopButtonTarget;
            $container = $('body');

            var createBackToTopButtonWithDOM = function() {
                $backToTopButtonTarget = $('<div class="backToTopButton-container scrollable"></div>');
                $backToTopButtonTarget.css({
                    height: "300px",
                    width: "60%",
                    overflow: "auto"
                });
                $backToTopButtonTarget.html('<p style="padding-bottom: 500px">abc</p>');
                $container.append($backToTopButtonTarget);
            };

            runAllTest(createBackToTopButtonWithDOM);

            function runAllTest(generateWidget) {

                describe("Back To Top button", function() {

                    afterEach(function() {
                        $('.toTopWrap').remove();
                        $backToTopButtonTarget.remove();
                        $container.removeClass('tm360').addClass('tm360');
                    });

                    it('create button', function() {
                        generateWidget();
                        new BackToTopButton($backToTopButtonTarget);
                        var buttonWrap = $container.find('.toTopWrap');
                        expect(buttonWrap.length).toBe(1);
                    });

                    it('button box should have proper styling', function() {
                        generateWidget();
                        new BackToTopButton($backToTopButtonTarget);
                        var buttonWrap = $container.find('.toTopWrap');
                        expect(buttonWrap.text()).toBe('Back to Top');
                        expect(buttonWrap.css('border-radius')).toBe('5px');
                    });

                    it('button should have proper text and styling', function() {
                        generateWidget();
                        new BackToTopButton($backToTopButtonTarget);
                        var button = $('.toTopWrap a');
                        expect(button.css('height')).toBe('40px');
                        expect(button.css('color')).toBe(Util.convertHexaToRgb('ffffff'));
                        expect(button.css('font-family')).toBe('MuseoSans500, Arial, sans-serif');
                        expect(button.css('font-size')).toBe('14px');
                        expect(button.css('border')).toBe("1px solid " + Util.convertHexaToRgb('9296a3'));
                        
                        //expect(button.css('background-color')).toBe('rgba(79, 81, 88, 0.85)'); /* 85% fill of #4f5158 */
                        //expect(button.css('text-shadow')).toBe('-1px -1px 1px rgba(0, 0, 0, 0.5)');
                        //expect(button.css('box-shadow')).toBe('0px 4px 8px 0px rgba(0, 0, 0, 0.3)');
                    });

                });
            }
        });
    }
});