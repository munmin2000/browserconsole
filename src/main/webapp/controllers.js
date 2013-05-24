var appControllers = angular.module('app.controllers', []);

appControllers.controller('homeController', function($scope) {
	$scope.message = 'Welcome to Home!';
});

appControllers.controller('webSqlController', function($scope) {
	$scope.message = 'Welcome to WebSql!';
});

appControllers.controller('aboutController', function($scope) {
	$scope.message = 'Welcome to About!';
});