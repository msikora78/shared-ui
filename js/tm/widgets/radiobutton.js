(function() {
    "use strict";

    function factory($, gadgets, tm, checkableBase) {

        var Radiobutton = function(element, opts) {

            if (tm.hiResDisplay) {
                this.spriteTop = "8";
            } else {
                this.spriteTop = "6";
            }
            this.spriteLeft = "184";
            this.spriteHeight = "24";
            this.spriteWidth = "24";
            this.className = "tmRadiobutton";

            checkableBase.call(this, element, opts);

            this.groupName = $(this.element).attr("name");
            this.parentForm = this.element.closest('form');
            if (this.parentForm.length == 0) {
                this.parentForm = $("body");
            }
        };

        tm.inheritMethods(checkableBase, Radiobutton);

        Radiobutton.prototype._manageRadiobuttonGroupState = function() {
            var self = this,
                groupName = this.element.attr("name");
            $.each($('input[name="' + groupName + '"]'), function(index, element) {
                self._setState(false, $(element));
            });

            this._setState(true);
        };

        Radiobutton.prototype.getGroupSelection = function() {
            this.group = this.parentForm.find('input[type="radio"][name="' + this.groupName + '"]');

            for (var i = 0; i < this.group.length; i++) {
                if ($(this.group[i]).prop("checked")) {
                    return $(this.group[i]);
                }
            }

            return undefined;
        };

        Radiobutton.prototype._onClick = function(e) {
            this._manageRadiobuttonGroupState();
        };

        Radiobutton.prototype._onElementClick = function(e) {
            this._manageRadiobuttonGroupState();
        };

        return Radiobutton;
    }

    // If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global!gadgets', 'tm/core', 'tm/widgets/checkableBase', 'bootstrap'], factory);
    } else {
        tm.widgets.widgetFactory.make('tmRadiobutton', factory($, gadgets, tm, tm.widgets.checkableBase));
    }

})();