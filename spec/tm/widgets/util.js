(function() {

    function factory() {
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
            return "rgb(" + convertHexaToNumber(hexa.substr(0, 2)) + ", " + convertHexaToNumber(hexa.substr(2, 2)) + ", " + convertHexaToNumber(hexa.substr(4, 2)) + ")";
        }

        function convertHexaToRgba(hexa, opacity) {
            return "rgba(" + convertHexaToNumber(hexa.substr(0, 2)) + ", " + convertHexaToNumber(hexa.substr(2, 2)) + ", " + convertHexaToNumber(hexa.substr(4, 2)) + ", " + opacity + ")";
        }

        function wait(expect, duration) {
            setTimeout(function() {
                expect();
            }, duration || 1);
        }

        function evaluateBorderWidth($component, size, directions) {
            directions = directions ? directions : ['top', 'bottom', 'left', 'right'];

            expect(styleSupport($component, 'border-width')).toBeTruthy();
            for (var i = 0; i < directions.length; i++) {
                var direction = directions[i];
                expect($component.css(styleSupport($component, 'border-' + direction + '-width'))).toBe(size);
            };
        }

        function evaluateBorderColor($component, color, directions) {
            directions = directions ? directions : ['top', 'bottom', 'left', 'right'];

            expect(styleSupport($component, 'border-color')).toBeTruthy();
            for (var i = 0; i < directions.length; i++) {
                var direction = directions[i];
                expect($component.css(styleSupport($component, 'border-' + direction + '-color'))).toBe(color);

            };
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
            evaluateBorderColor: evaluateBorderColor
        }
    }

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        tm.namespace("tm.widgets.util");
        tm.widgets.util = factory();
    }
})();