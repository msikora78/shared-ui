define(['jquery', 'angular', 'widget!tm/widgets/checkbox'], function($, angular) {
	
	var data = {
		legend: 'Checkbox angular integration',
		description: 'Checkbox widget applied in an angular directive.',
		html: '<div id="angularContainer" ng-controller="checkboxesController">\n\
				<label for="angCheckbox1">\n\
					<input tm-checkbox ng-model="isChecked" ng-change="changed()" type="checkbox" id="angCheckbox1" />\n\
					Angularized checkbox\n\
				</label>\n\
				<span>Current value: {{isChecked}}</span>\n\
			</div><br>',
		setupString: 'function() {\n\
			var app = angular.module("angular-checkbox", []);\n\
\n\
			app.controller("checkboxesController", function($scope) {\n\
				$scope.isChecked = true;\n\
				$scope.changed = function() {\n\
					console.log("Checked changed");\n\
				};\n\
			});\n\
\n\
			app.directive("tmCheckbox", function() {\n\
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
			});\n\
\n\
			angular.bootstrap("#angularContainer", ["angular-checkbox"]);\n \
		}'
	};

	data.setup = new Function('$', 'angular', 'return ' + data.setupString).call(this, $, angular);

	return data;
});