(function() {
	"use strict";

	function factory($, gadgets, core, checkableBase) {
		
		var className = "tmCheckbox";
		var spriteLeft = "0";

		var Checkbox = function(element, opts) {
			checkableBase.call(this, element, opts, spriteLeft, className);
			this.element = element;
		};

		core.inheritMethods(checkableBase, Checkbox);

		Checkbox.prototype._onClick = function(e) { 
			if (this._labelsEventsHandledByBrowser) {
				this._toggleState();
			}
		};

		Checkbox.prototype._onElementClick = function(e) { 
			if (this._labelsEventsHandledByBrowser) {
				this._setState(this.element.prop("checked")); 
			} else {
				this._toggleState();
				$(e.target).triggerHandler("change");
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