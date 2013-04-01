define(['jquery', 'angular', 'widget!tm/widgets/checkbox', 'widget!tm/widgets/radiobutton'], function($, angular) {
	
	var data = {
		legend: 'Angular integration',
		description: 'Checkboxes and Radiobuttons widget applied in an angular directive.',
		html: '<div id="angularContainer" ng-controller="checkboxesController">\n\
				<div>\n\
					<label for="angCheckbox1">\n\
						<input tm-checkbox ng-model="isChecked" type="checkbox" id="angCheckbox1" />\n\
						Option1\n\
					</label>\n\
					<span>Current value: {{isChecked}}</span>\n\
				</div><br>\n\
				<div>\n\
					<label><input tm-radiobutton ng-model="optionValue" type="radio" name="groupAngular" value="1" checked>Option1</label>\n\
					<label><input tm-radiobutton ng-model="optionValue" type="radio" name="groupAngular" value="2">Option2</label>\n\
					<label><input tm-radiobutton ng-model="optionValue" type="radio" name="groupAngular" value="3">Option3</label>\n\
					<span>Current value: {{optionValue}}</span>\n\
				</div>\n\
			</div><br>',
		setupString: 'function() {\n\
			var app = angular.module("angular-checkbox", []);\n\
\n\
			app.controller("checkboxesController", function($scope) {\n\
				$scope.isChecked = true;\n\
				$scope.optionValue = "2";\n\
			});\n\
\n\
			app\n\
				.directive("tmCheckbox", function() {\n\
					return {\n\
						require: "?ngModel",\n\
						link: function(scope, iElement, iAttrs, ngModel) {\n\
							if (ngModel) {\n\
								ngModel.$render = function() {\n\
									iElement.tmCheckbox("setChecked", ngModel.$modelValue);\n\
								}\n\
							}\n\
						}\n\
					}\n\
				})\n\
				.directive("tmRadiobutton", function() {\n\
					return {\n\
						require: "?ngModel",\n\
						link: function(scope, iElement, iAttrs, ngModel) {\n\
							if (ngModel) {\n\
								ngModel.$render = function() {\n\
									iElement.tmRadiobutton("setChecked", ngModel.$modelValue == iElement.val());\n\
								}\n\
							}\n\
						}\n\
					}\n\
				});\n\
\n\
			angular.bootstrap("#angularContainer", ["angular-checkbox"]);\n\
		}'
	};

	data.setup = new Function('$', 'angular', 'return ' + data.setupString).call(this, $, angular);

	return data;
});