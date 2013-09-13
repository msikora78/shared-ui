(function() {
    "use strict";

    function factory($, gadgets, tm, checkableBase) {

        var Checkbox = function(element, opts) {

            if (tm.hiResDisplay) {
                this.spriteTop = "8";
            } else {
                this.spriteTop = "6";
            }
            this.spriteLeft = "232";
            this.spriteHeight = "24";
            this.spriteWidth = "24";
            this.className = "tmCheckbox";

            checkableBase.call(this, element, opts);
        };

        tm.inheritMethods(checkableBase, Checkbox);

        Checkbox.prototype._onClick = function(e) {
            this._toggleState();
        };

        Checkbox.prototype._onElementClick = function(e) {
            if (this._labelsEventsHandledByBrowser) {
                this._setState(this.element.prop("checked"));
            }
        };

        return Checkbox;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'tm/core', 'tm/widgets/checkableBase', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmCheckbox', factory($, gadgets, tm, tm.widgets.checkableBase));
    }

})();