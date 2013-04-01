(function() {
	"use strict";

	function factory($, gadgets, core, checkableBase) {

		var className = "tmRadiobutton";
		var spriteLeft = "-20";

		var Radiobutton = function(element, opts) {
			checkableBase.call(this, element, opts, spriteLeft, className);

			this.groupName = $(this.element).attr("name");
			this.parentForm = this.element.closest('form');
			if (this.parentForm.length == 0) {
				this.parentForm = $("body");
			};
		};

		core.inheritMethods(checkableBase, Radiobutton);

		Radiobutton.prototype._manageRadiobuttonGroupState = function() {
			var self = this,
				groupName = this.element.attr("name");
			$.each($('input[name="' + groupName + '"]'), function(index, element){
				self._setState(false, $(element));
			});
			
			this._setState(true);
		}

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
		}
		
		Radiobutton.prototype._onElementClick = function(e) {
			this._manageRadiobuttonGroupState();
		}

		return Radiobutton;
	}

	// If requirejs is present, we want to use it, otherwise, we want to use the global declarations to get the dependencies
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'global!gadgets', 'tm/core', 'tm/widgets/checkableBase', 'bootstrap'], factory);
	} else {
		tm.widgets.widgetFactory.make('tmRadiobutton', factory($, gadgets, tm, tm.widgets.checkableBase));
	}

})();