/** 
 * @namespace tm.cookie  Convenience methods for handling cookies.
 */
(function() {

    function factory(document) {

        var tmCookie = {};

        /**
         * @function
         * Creates or updates a cookie.
         *
         * @param {String} name   Cookie id
         * @param {String} value  Cookie value
         * @param {int}    days   Optional number of days the cookie should live
         */
        tmCookie.create = function (name,value,days) {
            var expires = "";
            if (days) { // else session cookie
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                expires = "; expires="+date.toUTCString();
            }
            document.cookie = name+"="+encodeURIComponent(value) + expires + "; path=/";
        };


        /**
         * @function
         * Reads a cookie's value.
         *
         * @param {String} name  Cookie id
         * @return {String|null} Cookie value
         */
        tmCookie.read = function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent( c.substring(nameEQ.length,c.length) );
                }
            }
            return null;
        };

        /**
         * @function
         * Removes/expires a cookie.
         *
         * @param {String} name  Cookie id
         */
        tmCookie.erase = function (name) {
            tmCookie.create(name,"",-1);
        };

        return tmCookie;
    }

    // Use requirejs to manage dependencies, if available
    if (typeof define === 'function' && define.amd) {
        define(['global!document'], factory);
    }
    else {
        tm.namespace("tm.cookie");
        tm.cookie = factory(document);
    }

})();

