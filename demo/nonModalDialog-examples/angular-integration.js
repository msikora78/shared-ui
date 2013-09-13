define(['jquery', 'angular', 'tm/core', 'widget!tm/widgets/popup'], function($, angular, tm) {
    'use strict';

    var data = {
        legend: 'Angular integration',
        description: 'Popup widget applied in an angular directive.',
        html:'\
            <div id="angular-integration" ng-controller="angularIntegrationCtrl">\n\
                <div id="popupTemplate">\n\
                    <div class="popup-body">\n\
                        <label>Enter name<input type="text" ng-model="objectToEdit.name"></label>\n\
                    </div>\n\
                    <div class="popover-footer">\n\
                        <button type="button" ng-click="cancel()" class="btn">Cancel</button>\n\
                        <button type="button" ng-click="save()" class="btn btn-primary">Save</button>\n\
                    </div>\n\
                </div>\n\
                <p>\n\
                    <button type="button" class="btn btn-primary"\n\
                        tm-popup="objectToEdit" \n\
                        ng-click="edit();"\n\
                        title="Angular integration"\n\
                        data-custom-template-id="popupTemplate">Click me\n\
                    </button>\n\
                    Hello <span ng-bind="object.name"></span>!</p>\n\
            </div>',
        js: function() {
            var app = angular.module('angular-integration', []);

            app.controller('angularIntegrationCtrl', function($scope) {
                var previousState = null;
                $scope.object = {
                    name: ''
                }

                $scope.edit = function() {
                    if ($scope.objectToEdit == null) {
                        previousState = $.extend({}, $scope.object);
                        $scope.objectToEdit = $scope.object; //This triggers popup.show
                    }
                    else {
                        $scope.cancel();
                    }
                };

                $scope.save = function() {
                    $scope.objectToEdit = null;
                    previousState = null;
                };

                $scope.cancel = function() {
                    $scope.object = previousState;
                    $scope.objectToEdit = null;
                    previousState = null;
                    if (!$scope.$$phase) {
                        $scope.$apply(); 
                    } 
                };

                $scope.objectToEdit = null;
            });

            app.directive('tmPopup', function() {
                return {
                    scope: true,
                    link: function(scope, iElement, iAttrs) {
                        var popup = iElement.tmPopup({
                            trigger: 'manual',
                            height: '175px'
                        });

                        scope.$watch(iAttrs.tmPopup, function(newValue) {
                            popup.tmPopup(newValue ? 'show' : 'hide');
                        });

                        scope.$on('$destroy', function() {
                            popup.tmPopup('destroy');
                        });

                        popup.on('shown', function() {
                            popup.tmPopup('getPopup').find('input').focus();
                        });

                        popup.on('hidden', function() {
                            if (scope.objectToEdit) {
                                scope.cancel();
                            }
                        });
                    }
                };
            });

            angular.bootstrap('#angular-integration', ['angular-integration']);
        }
    };

    return data;
});