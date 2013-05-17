define(['jquery', 'angular', 'widget!tm/widgets/modalDialog'], function($, angular) {

	var data = {
		legend: 'angular-integration',
		description: 'This demonstrates how to integrate the modalDialog component into an Angular directive in order to use it as a <code>tm-modal-dialog</code> html attribute.',
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
			'	<p><button type="button" class="btn btn-primary" ng-click="edit();">Click me</button> Hello <span ng-bind="object.name"></span>!</p>\n' +
			'</div>',
		setupString: "function() {\n \
			var app = angular.module('angular-integration', []);\n \
\n \
			app.controller('angularIntegrationCtrl', function($scope) {\n \
				undoValue = '';\n \
				$scope.object = {\n\
					name: ''\n\
				}\n\
\n \
				$scope.edit = function() {\n \
					undoValue = $scope.object.name;\n \
					$scope.objectToEdit = $scope.object; //This triggers modalDialog.show\n\
				};\n \
\n \
				$scope.save = function() {\n \
					undoValue = '';\n \
					$scope.objectToEdit = null;\n \
				};\n \
\n \
				$scope.cancel = function() {\n \
					$scope.object.name = undoValue;\n \
					$scope.objectToEdit = null;\n \
					undoValue = '';\n \
				};\n \
\n \
				$scope.objectToEdit = null;\n\
			});\n \
\n \
			app.directive('tmModalDialog', function() {\n \
				return {\n \
					scope: true,\n \
					link: function(scope, iElement, iAttrs) {\n \
						var dialog = iElement.tmModalDialog();\n \
\n \
						scope.$watch(iAttrs.tmModalDialog, function(newValue) {\n \
							dialog.tmModalDialog(newValue ? 'show' : 'hide');\n \
						});\n \
\n \
						scope.$on('$destroy', function() {\n \
							iElement.tmModalDialog('destroy');\n \
						});\n \
					}\n \
				};\n \
			});\n \
\n \
			angular.bootstrap('#angular-integration', ['angular-integration']);\n \
		}"
	};

	data.setup = new Function('$', 'angular', 'return ' + data.setupString).call(this, $, angular);

	return data;

});
