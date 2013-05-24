var app = angular.module('app', [ 'ui.bootstrap', 'ui.utils', 'ui.compat' ]);

app.config(function($stateProvider, $routeProvider) {
	$stateProvider.state('index', {
		url : "",
		views : {
			"viewA" : {
				templateUrl : "home.html"
			}
		}
	}).state('webSql', {
		url : "/webSql",
		views : {
			"viewA" : {
				templateUrl : "webSql.html"
			}
		}
	}).state('about', {
		url : "/about",
		views : {
			"viewA" : {
				templateUrl : "about.html"
			}
		}
	})
})

app.controller('mainController', function($scope) {

	$scope.message = 'Welcome to Browser Console!';
});
