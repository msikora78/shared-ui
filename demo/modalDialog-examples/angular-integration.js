define(['jquery', 'angular', 'widget!tm/widgets/modalDialog'], function($, angular) {

	return {
		legend: 'angular-integration',
		html: '<div id="angular-integration" ng-controller="angularIntegrationCtrl">\n' +
			'	<div tm-modal-dialog="objectToEdit">\n' +
			'		<div class="modal-header">\n' +
			'			<h3>Angular Integration</h3>\n' +
			'		</div>\n' +
			'		<div class="modal-body">\n' +
			'			<p>Enter name</p>\n' +
			'			<input type="text" ng-model="objectToEdit.name" />\n' +
			'		</div>\n' +
			'		<div class="modal-footer">\n' +
			'			<button type="button" ng-click="cancel()" class="btn">Cancel</button>\n' +
			'			<button type="button" ng-click="save()" class="btn btn-primary">Save</button>\n' +
			'		</div>\n' +
			'	</div>\n' +
			'	<button type="button" class="btn btn-primary" ng-click="edit()">Click me</button>\n' +
			'</div>',
		setup: function() {
			var app = angular.module('angular-integration', []);

			app.controller('angularIntegrationCtrl', function($scope) {
				var o = {
					name: ''
				};

				$scope.edit = function() {
					$scope.objectToEdit = {
						name: o.name
					};
				};

				$scope.save = function() {
					o = $scope.objectToEdit;

					$scope.objectToEdit = null;
				};

				$scope.cancel = function() {
					$scope.objectToEdit = null;
				};

				$scope.objectToEdit = null;
			});

			app.directive('tmModalDialog', function() {
				return {
					scope: true,
					link: function(scope, iElement, iAttrs) {
						var dialog = iElement.tmModalDialog();

						scope.$watch(iAttrs.tmModalDialog, function(newValue) {
							dialog.tmModalDialog(newValue ? 'show' : 'hide');
						});

						scope.$on('$destroy', function() {
							iElement.tmModalDialog('destroy');
						});
					}
				};
			});

			angular.bootstrap('#angular-integration', ['angular-integration']);
		}
	};

});
