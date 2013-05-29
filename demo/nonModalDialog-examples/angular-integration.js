define(['jquery', 'angular', 'tm/core', 'widget!tm/widgets/popup'], function($, angular, tm) {
    'use strict';

    var data = {
        legend: 'Angular integration',
        description: 'Popup widget applied in an angular directive.',
        html:'\
            <div id="angular-integration" ng-controller="angularIntegrationCtrl">\n\
                <div id="popupTemplate">\n\
                    <div class="popup-body">\n\
                        Enter your name: <input type="text" ng-model="objectToEdit.name" />\n\
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
                        data-template-id="popupTemplate">Click me\n\
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
                    previousState = $.extend({}, $scope.object);
                    $scope.objectToEdit = $scope.object; //This triggers popup.show
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

            app.directive('tmPopup', function() {
                return {
                    scope: true,
                    link: function(scope, iElement, iAttrs) {
                        var popup = iElement.tmPopup({
                            trigger: 'manual'
                        });

                        scope.$watch(iAttrs.tmPopup, function(newValue) {
                            popup.tmPopup(newValue ? 'show' : 'hide');
                        });

                        scope.$on('$destroy', function() {
                            iElement.tmPopup('destroy');
                        });

                        popup.on('shown', function() {
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