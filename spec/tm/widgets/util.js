define([], function() {

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

    return {
        styleSupport: styleSupport,
        gradientSupport: gradientSupport,
        convertNumberToHexa: convertNumberToHexa,
        convertHexaToNumber: convertHexaToNumber,
        convertHexaToRgb: convertHexaToRgb
    }
});