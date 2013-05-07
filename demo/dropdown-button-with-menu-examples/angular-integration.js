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
            			<li ng-repeat="item in items"><a tabindex="-1" href="{{item.url}}">{{item.title}}</a></li>\n\
            		</ul>\n\
            	</div>\n\
            </div>',
        setupString: '\
        	function(){\n\
				var app = angular.module("angular-dropdown", []);\n\
\n\
				app.controller("dropdownController", function($scope) {\n\
					$scope.items = [];\n\
					for (var i = 1; i <= 5; i++) { $scope.items.push({ title: "Action " + i, url: "#" + i }); }\n\
				});\n\
\n\
				angular.bootstrap("#angularIntegrationContainer", ["angular-dropdown"]);\n\
        	}'
    };

	data.setup = new Function('return ' + data.setupString).call(this);

	return data;
});