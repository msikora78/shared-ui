(function() {
	"use strict";

	function factory($, gadgets, core, checkableBase) {

		var Checkbox = function(element, opts) {
			this.spriteLeft = "178";
			this.spriteHeight = "24";
			this.spriteWidth = "20";
			this.spriteTop = "6";
			this.className = "tmCheckbox";

			checkableBase.call(this, element, opts);
		};

		core.inheritMethods(checkableBase, Checkbox);

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