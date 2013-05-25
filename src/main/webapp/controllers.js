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

appControllers.controller('homeController', function($scope, $log) {
	$scope.message = 'Welcome to Home!';
});

appControllers.controller('webSqlController', function($scope, $log,
		alertService, webSqlService) {
	$scope.alerts = alertService;
	
	$scope.recentQueries = [];
	$scope.columns = [];
	$scope.records = [];
	$scope.query = 'select * from employee';
	$scope.queries = [ $scope.query ];
	$scope.message = '';
	$scope.tabs = {
		result : false,
		console : true,
		help : false
	};

	$scope.run = run;

	function init() {
		
	}
	
	function run() {
		$scope.query = $scope.query.toLowerCase();
		if ($scope.query.match(/^select.*/)) {
			webSqlService.process([ $scope.query ], onSuccessSelect, onFailure);
		} else {
			webSqlService.process([ $scope.query ], onSuccess, onFailure);
		}
	}
	
	function onSuccessSelect(transaction, results, records) {
		$scope.queries.push($scope.query);
		message = 'Success : ' + $scope.query + "\n";
		if (records.length > 0) {
			var columns = [];
			for ( var prop in records[0]) {
				columns.push(prop);
			}
			//$log.info(columns);
			$scope.columns = columns;
			$scope.records = records;
		}
		$scope.message = message;

		var index = $scope.recentQueries.indexOf($scope.query);
		if (index != -1) {
			$scope.recentQueries.splice(index, 1);
		}
		$scope.recentQueries.unshift($scope.query);

		$scope.tabs.result = true;
		$scope.$apply();
		//$log.info($scope.message);
	}

	function onSuccess() {
		$scope.queries.push($scope.query);
		var message = 'Success : ' + $scope.query;
		$scope.message = message;

		var index = $scope.recentQueries.indexOf($scope.query);
		if (index != -1) {
			$scope.recentQueries.splice(index, 1);
		}
		$scope.recentQueries.unshift($scope.query);

		$scope.tabs.console = true;
		$scope.$apply();
		//$log.info($scope.message);
	}

	function onFailure(error, statement) {
		var message = 'Error : ' + error.message + " when processing "
				+ statement;
		$scope.message = message;
		$scope.tabs.console = true;
		$scope.$apply();
		//$log.warn(message);
	}

});

appControllers.controller('indexedDbController', function($scope, $log,
		alertService, appContext) {
	$scope.alerts = alertService;

	$scope.message = 'Welcome to IndexedDb!';
});

appControllers.controller('aboutController', function($scope, $log,
		alertService, appContext) {
	$scope.alerts = alertService;

	$scope.appId = appContext.appId;

	$scope.addAlert = function() {
		$scope.alerts.push({
			msg : $scope.alertMessage
		});
	};

});

appControllers.controller('errorController', function($scope, $log) {
	$scope.message = 'Oops, Something went wrong!';
});
