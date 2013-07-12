define(['jquery', 'angular', 'widget!tm/widgets/checkbox', 'widget!tm/widgets/radiobutton'], function($, angular) {
	'use strict';
	
	var data = {
		legend: 'Angular integration',
		description: 'Checkboxes and Radiobuttons widget applied in an angular directive.',
		html: '\
			<div id="angularContainer" ng-controller="checkboxesController">\n\
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
		js: function() {
			var app = angular.module("angular-checkbox", []);

			app.controller("checkboxesController", function($scope) {
				$scope.isChecked = true;
				$scope.optionValue = "2";
			});

			app
				.directive("tmCheckbox", function() {
					return {
						require: "?ngModel",
						link: function(scope, iElement, iAttrs, ngModel) {
							if (ngModel) {
								ngModel.$render = function() {
									iElement.tmCheckbox("setChecked", ngModel.$modelValue);
								}
							}
						}
					}
				})
				.directive("tmRadiobutton", function() {
					return {
						require: "?ngModel",
						link: function(scope, iElement, iAttrs, ngModel) {
							if (ngModel) {
								ngModel.$render = function() {
									iElement.tmRadiobutton("setChecked", ngModel.$modelValue == iElement.val());
								}
							}
						}
					}
				});

			angular.bootstrap("#angularContainer", ["angular-checkbox"]);
		}
	};

	return data;
});