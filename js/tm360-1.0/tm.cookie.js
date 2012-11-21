/** 
 * @namespace Convenience methods for handling cookies.
 */
tm.namespace("tm.cookie");

/**
 * @function
 * Creates or updates a cookie.
 *
 * @param {String} name   Cookie id
 * @param {String} value  Cookie value
 * @param {int}    days   Optional number of days the cookie should live
 */
tm.cookie.create = function (name,value,days) {
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
tm.cookie.read = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
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
tm.cookie.erase = function (name) {
    tm.cookie.create(name,"",-1);
};
