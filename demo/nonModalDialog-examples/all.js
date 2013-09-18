define([
        './overview',
        './popup-with-arrow'
        // './all-javascript',
        // './tooltips',
        // './basic-popups',
        // './advanced-popups',
        // './angular-integration'
    ],

    function() {
        return {
            title: 'Non-modal dialog',
            examples: Array.prototype.slice.call(arguments)
        };
    }
);