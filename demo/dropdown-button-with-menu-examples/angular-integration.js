define(['jquery', 'angular', 'bootstrap'], function($, angular) {
	'use strict';

	var data = {
		legend: 'Angular integration',
		description: 'Dropdown menu content provided by angular',
		html: '\
            <div id="angularIntegrationContainer" class="demo-container" ng-controller="dropdownController">\n\
				<div tm-dropdown-menu class="btn-group">\n\
            		<button class="btn dropdown-toggle" data-toggle="dropdown">Select action<span class="caret" /></button>\n\
            		<ul class="dropdown-menu">\n\
            			<li ng-repeat="item in items"><a tabindex="-1" href="#dropDownMenu{{item.url}}">{{item.title}}</a></li>\n\
            		</ul>\n\
            	</div>\n\
            </div>',
        js: function(){
			var app = angular.module("angular-dropdown", []);

			app.controller("dropdownController", function($scope) {
				$scope.items = [];
				for (var i = 1; i <= 5; i++) { $scope.items.push({ title: "Action " + i, url: "#" + i }); }
			});

			angular.bootstrap("#angularIntegrationContainer", ["angular-dropdown"]);
    	}
    };

	return data;
});