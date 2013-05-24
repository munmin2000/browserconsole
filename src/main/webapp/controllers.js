var appControllers = angular.module('app.controllers', []);

appControllers.controller('alertController', function($scope, alertService) {
	$scope.alerts = alertService;

	$scope.add = function() {
		$scope.alerts.push({
			msg : "Another alert!"
		});
	};

	$scope.close = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.closeAll = function() {
		$scope.alerts.length = 0;
	};

});

appControllers.controller('homeController', function($scope) {
	$scope.message = 'Welcome to Home!';
});

appControllers.controller('webSqlController', function($scope, alertService) {
	$scope.alerts = alertService;

	$scope.message = 'Welcome to WebSql!';
});

appControllers.controller('aboutController', function($scope, alertService, appId) {
	$scope.alerts = alertService;

	$scope.appId = appId;
	
	$scope.addAlert = function() {
		$scope.alerts.push({
			msg : $scope.alertMessage
		});
	};

});

appControllers.controller('errorController', function($scope) {
	$scope.message = 'Oops, Something went wrong!';
});
