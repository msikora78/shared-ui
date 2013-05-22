define(['jquery', 'angular', 'tm/core', 'widget!tm/widgets/modalDialog'], function($, angular, tm) {
    'use strict';

    var data = {
        legend: 'Angular integration',
        description: 'This demonstrates how to integrate the modalDialog component into an Angular directive in order to use it as a <code>tm-modal-dialog</code> html attribute.',
        html: '\
            <div id="angular-integration" ng-controller="angularIntegrationCtrl">\n\
                <div tm-modal-dialog="objectToEdit">\n\
                    <div class="modal-header">\n\
                        <h3>Angular Integration</h3>\n\
                    </div>\n\
                    <div class="modal-body">\n\
                        Enter your name: <input type="text" ng-model="objectToEdit.name" />\n\
                    </div>\n\
                    <div class="modal-footer">\n\
                        <button type="button" ng-click="cancel()" class="btn">Cancel</button>\n\
                        <button type="button" ng-click="save()" class="btn btn-primary">Save</button>\n\
                    </div>\n\
                </div>\n\
                <p><button type="button" class="btn btn-primary" ng-click="edit();">Click me</button> Hello <span ng-bind="object.name"></span>!</p>\n\
            </div>',
        js: function() {
            var app = angular.module('angular-integration', []);

            app.controller('angularIntegrationCtrl', function($scope) {
                var previousState = null;
                $scope.object = {
                    name: '',
                    date: new Date(1900,01,01)
                }

                $scope.edit = function() {
                    previousState = $.extend({}, $scope.object);
                    $scope.objectToEdit = $scope.object; //This triggers modalDialog.show
                };

                $scope.save = function() {
                    $scope.objectToEdit = null;
                    previousState = null;
                };

                $scope.cancel = function() {
                    $scope.object = previousState;
                    $scope.objectToEdit = null;
                    previousState = null;
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

                        dialog.on('shown', function() {
                            $(this).find('input').focus();
                        });
                    }
                };
            });

            angular.bootstrap('#angular-integration', ['angular-integration']);
        }
    };

    return data;
});
