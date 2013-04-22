/**
 * @namespace tm.date  Convenience methods for handling dates and times.
 */
(function() {

    function factory() {
        var tmDate = {};
        
        /**
         * @function
         * Formats a date object into YYYY-MM-DD format
         *
         * Example:
         *  tmDate.formatYMD(new Date(2012, 1, 1)); // 2012-01-01
         *
         * @param {Date} date  The date object to format
         * @return {String}    Formatted date string
         */
        tmDate.formatYMD = function(date) {
            var m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            var d = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + m + "-" + d;
        };

        /**
         * @function
         * Formats a date object into M/D/YYYY format
         *
         * Examples:
         *  tmDate.formatMDY(new Date(2012, 1, 1)); // 1/1/2012
         *  tmDate.prettyPrint(new Date(2012, 1, 1)); // 1/1/2012
         *
         * @param {Date} date  The date object to format
         * @return {String}    Formatted date string
         */
        tmDate.formatMDY = function(date) {
            return date.getMonth() + 1  + "/" + date.getDate() + "/" + date.getFullYear();
        };

        /** Alias for tmDate.formatMDY */
        tmDate.prettyPrint = tmDate.formatMDY;

        /**
         * @function
         * Adjusts a date object by the specified number of days.
         *
         * @param {Date} date  The date object to adjust
         * @param {int} days   The number of days to add (or subtract if negative)
         * @return {Date}      The date object
         */
        tmDate.offsetDays = function(date, days) {
            date.setDate(date.getDate() + days);
            return date;
        };

        /**
         * @function
         * Converts milliseconds to mm:ss format, for countdowns etc.
         *
         * Example:
         *  tmDate.prettyPrintMS(1200000); // 20:00
         *
         * @param {int} ms   milliseconds
         * @return {String}  minutes:seconds string
         */
        tmDate.prettyPrintMS = function(ms) {
            var min = 0, sec = 0;
            if (ms > 0){
                min = Math.floor(ms/60000);
                sec = Math.floor((ms-(min*60000))/1000);
            }
            if (sec <= 9){
                sec = "0" + sec;
            }
            return min + ":" + sec;
        };

        return tmDate;
    }

    // Use requirejs to manage dependencies, if available
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        tm.namespace("tm.date");
        tm.date = factory();
    }

})();