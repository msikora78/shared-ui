(function() {
    'use strict';

    /**
     *  Creates the error dialog prototype
     *  @returns {Function} error dialog prototype
     */

    function factory($, tm) {

        var dialog;

        function errorRenderer(content){
            return $('<p/>').addClass('error-message').text('' + content);
        }

        $(function(){
            // create reused modal for errors
            var container = $('<div>').addClass('error-dialog hide');
            container.appendTo('body');

            dialog = container.tmModalDialog({
                renderer: errorRenderer
            });
        });

        /**
         *  Error dialog's prototype
         *  @class
         *  @constructor
         *  @param {DIV} element a div element to use to render the tooltip
         *  @param {Object} opts creation options
         */
        var tmErrorDialog = function(content, title) {
            //dialog.tmModalDialog('setContent', content);
            dialog.children('.modal-body').empty().append(errorRenderer(content));
            dialog.children('.modal-header').find("h3").text(title);
            dialog.tmModalDialog('show');
        };

        // add to tm namespace
        tm.errorDialog = tmErrorDialog;

        return tmErrorDialog;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'tm/core', 'widget!tm/widgets/modalDialog'], factory);
    } else {
        factory($, tm);
    }

})();