(function() {

    function factory($) {
        function styleSupport($element, style) {
            var supportedProp;

            if (typeof $element.css(style) === "string") {
                supportedProp = style;
            } else if (typeof $element.css('-webkit-' + style) === "string") {
                supportedProp = '-webkit-' + style;
            } else if (typeof $element.css('-moz-' + style) === "string") {
                supportedProp = '-moz-' + style;
            }
            return supportedProp;
        }

        function gradientSupport($element) {
            var supportedProp;
            var backgroundImage = $element.css('background-image');

            if (typeof backgroundImage === "string") {
                if (backgroundImage.split('-webkit-linear-gradient').length > 1) {
                    supportedProp = '-webkit-linear-gradient';
                } else if (backgroundImage.split('-moz-linear-gradient').length > 1) {
                    supportedProp = '-moz-linear-gradient';
                } else if (backgroundImage.split('linear-gradient').length > 1) {
                    supportedProp = 'linear-gradient';
                }
            }
            return supportedProp;
        }

        function convertNumberToHexa(number) {
            return Number(number).toString(16);
        }

        function convertHexaToNumber(hexa) {
            return parseInt(hexa, 16).toString();
        }

        function convertHexaToRgb(hexa) {
            if (hexa.substring(0,3) == 'rgb') {
                return hexa;
            }
            hexa = hexa.replace('#', '');

            // manage shrinked values
            if (hexa.length == 3) {
                return "rgb(" + convertHexaToNumber(hexa.substr(0, 1) + hexa.substr(0, 1)) + ", " + convertHexaToNumber(hexa.substr(1, 1) + hexa.substr(1, 1)) + ", " + convertHexaToNumber(hexa.substr(2, 1) + hexa.substr(2, 1)) + ")";
            }
            else {
                return "rgb(" + convertHexaToNumber(hexa.substr(0, 2)) + ", " + convertHexaToNumber(hexa.substr(2, 2)) + ", " + convertHexaToNumber(hexa.substr(4, 2)) + ")";
            }
        }

        function convertHexaToRgba(hexa, opacity) {
            return "rgba(" + convertHexaToNumber(hexa.substr(0, 2)) + ", " + convertHexaToNumber(hexa.substr(2, 2)) + ", " + convertHexaToNumber(hexa.substr(4, 2)) + ", " + opacity + ")";
        }

        function parseRGBA(value) {
            var r = /^rgba\((\d),\s*(\d),\s*(\d),\s*(.*?)\)$/;
            
            if (value == "transparent") {
                return { rgba: { r: 0, g: 0, b: 0, a: 0 }};
            }

            var m = r.exec(value);
            var parsedValue = {
                rgba: {
                    r: parseInt(m[1]),
                    g: parseInt(m[2]),
                    b: parseInt(m[3]),
                    a: Math.round(parseFloat(m[4]) * 100) / 100
                }
            }

            parsedValue.toString = function() {
                return "rgba(" + this.rgba.r + ', ' + this.rgba.g + ', ' + this.rgba.b + ', ' + this.rgba.a + ')';
            }

            return parsedValue;
        }

        function parseShadowValue(value, parseSpread) {
            var r = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(.*?)\)\s*(.*?)$/;
            var inset = false;

            if (parseSpread == undefined) {
                parseSpread = true;
            }

            if (value && value != 'none') {
                if (value.indexOf("inset") > -1) {
                    inset = true;
                    value = value.replace('inset', '');
                }

                if (r.test(value)) {
                    var m = r.exec(value);

                    var mArgs = m[5].split(" ");
                    var parsedValue = {
                        rgba: {
                            r: parseInt(m[1]),
                            g: parseInt(m[2]),
                            b: parseInt(m[3]),
                            a: Math.round(parseFloat(m[4]) * 100) / 100
                        },
                        hShadow: mArgs[0] || '0px',
                        vShadow: mArgs[1] || '0px',
                        blur: mArgs[2] || '0px',
                        spread: mArgs[3] || '0px',
                        inset: inset
                    }
                }
                else {                   
                    r = /^(.*?)\s*rgba\((\d+),\s*(\d+),\s*(\d+),\s*(.*?)\)$/;
                    m = r.exec(value);

                    var mArgs = m[1].split(" ");
                    if (mArgs[0] == '') {
                        mArgs.shift();
                    }
                    var parsedValue = {
                        rgba: {
                            r: parseInt(m[2]),
                            g: parseInt(m[3]),
                            b: parseInt(m[4]),
                            a: Math.round(parseFloat(m[5]) * 100) / 100
                        },
                        hShadow: mArgs[0] || '0px',
                        vShadow: mArgs[1] || '0px',
                        blur: mArgs[2] || '0px',
                        spread: mArgs[3] || '0px',
                        inset: inset
                    }
                }

                if (parseSpread) {
                    parsedValue.toString = function() {
                        return "rgba(" + this.rgba.r + ', ' + this.rgba.g + ', ' + this.rgba.b + ', ' + this.rgba.a + ') ' + ((this.inset) ? 'inset ' : '') + this.hShadow + ' ' + this.vShadow + ' ' + this.blur + ((this.spread) ? ' ' + this.spread : ' 0px');
                    }
                }
                else {
                    parsedValue.toString = function() {
                        return "rgba(" + this.rgba.r + ', ' + this.rgba.g + ', ' + this.rgba.b + ', ' + this.rgba.a + ') ' + this.hShadow + ' ' + this.vShadow + ' ' + this.blur;
                    }   
                }

                return parsedValue;
            }
            else {
                return value;
            }
        }

        function parseTextShadowValue(value) {
            return parseShadowValue(value, false);
        }

        function wait(duration) {
            var deferred = $.Deferred();

            setTimeout(function() {
                deferred.resolve();
            }, duration || 100);

            return deferred.promise();
        }

        function evaluateBorderWidth($component, size, directions) {
            directions = directions ? directions : ['top', 'bottom', 'left', 'right'];

            expect(styleSupport($component, 'border-width')).toBeTruthy();
            for (var i = 0; i < directions.length; i++) {
                var direction = directions[i];
                expect($component.css(styleSupport($component, 'border-' + direction + '-width'))).toBe(size);
            };
        }

        function evaluateBorderColor($component, color, directions, isRgba) {
            directions = directions ? directions : ['top', 'bottom', 'left', 'right'];
            expect(styleSupport($component, 'border-color')).toBeTruthy();
            for (var i = 0; i < directions.length; i++) {
                var direction = directions[i];
                var cssColor = convertHexaToRgb($component.css(styleSupport($component, 'border-' + direction + '-color')));
                if (isRgba) {
                    cssColor = parseRGBA(cssColor).toString();
                }
                expect(cssColor).toBe(color);
            };
        }

        function evaluateBorderRadius($component, size, directions) {
            directions = directions ? directions : ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            expect(styleSupport($component, 'border-radius')).toBeTruthy();
            for (var i = 0; i < directions.length; i++) {
                var direction = directions[i];
                expect($component.css(styleSupport($component, 'border-' + direction + '-radius'))).toBe(size);
            };
        }

        function evaluateColor($component, color) {
            var expectedrgb = convertHexaToRgb(color);
            var actualrgb = convertHexaToRgb($component.css('color'));
            expect(actualrgb).toBe(expectedrgb);
        }

        function evaluateBackgroundColor($component, color) {
            var expectedrgb = convertHexaToRgb(color);
            var actualrgb = convertHexaToRgb($component.css('background-color'));
            expect(actualrgb).toBe(expectedrgb);
        }

        function evaluateTextShadow($component, value) {
            var actualValue = $component.css('text-shadow');

            // ie doesn't return 'none'
            if (value == 'none' && convertHexaToRgb(actualValue) == $component.css('color')) {
                actualValue = 'none';
            }

            expect(parseTextShadowValue(actualValue).toString() || 'none').toBe(value);
        }

        function evaluateBoxShadow($component, value) {
            var actualValue = $component.css('box-shadow');

            // ie doesn't return 'none'
            if (value == 'none' && convertHexaToRgb(actualValue) == $component.css('color')) {
                actualValue = 'none';
            }

            expect(parseShadowValue(actualValue).toString() || 'none').toBe(value);
        }

        function calculateDistance($component, direction) {
            function findSize(style) {
                var size = $component.css(style);
                return size ? parseInt(size.replace("px", "")) : 0;
            }

            var padding = findSize('padding-' + direction);
            var margin = findSize('margin-' + direction + '-width');
            var border = findSize('border-' + direction + '-width');

            return (padding + margin + border) + "px";
        }

        return {
            styleSupport: styleSupport,
            gradientSupport: gradientSupport,
            convertNumberToHexa: convertNumberToHexa,
            convertHexaToNumber: convertHexaToNumber,
            convertHexaToRgb: convertHexaToRgb,
            convertHexaToRgba: convertHexaToRgba,
            wait: wait,
            calculateDistance: calculateDistance,
            evaluateBorderWidth: evaluateBorderWidth,
            evaluateBorderColor: evaluateBorderColor,
            evaluateBackgroundColor: evaluateBackgroundColor,
            evaluateColor: evaluateColor,
            evaluateBorderRadius: evaluateBorderRadius,
            evaluateTextShadow: evaluateTextShadow,
            evaluateBoxShadow: evaluateBoxShadow,
            parseShadowValue: parseShadowValue,
            parseTextShadowValue: parseTextShadowValue,
            parseRGBA: parseRGBA
        }
    }

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        tm.namespace("tm.widgets.util");
        tm.widgets.util = factory($);
    }
})();