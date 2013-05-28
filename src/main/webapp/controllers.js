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

appControllers.controller('homeController', function($scope, $log, $registry) {
	$scope.message = 'Welcome to Home!';
});

appControllers.controller('webSqlController', function($scope, $log, $registry,
		alertService, sqlService, sqlServiceHelper) {
	$scope.alerts = alertService;

	$scope.recentQueries = [];
	$scope.columns = [];
	$scope.records = [];
	$scope.queries = [];
	$scope.message = '';
	$scope.tabs = {
		result : false,
		console : true,
		help : false
	};
	$scope.run = run;

	var sqls = [];

	function run() {
		$scope.query = $scope.query.toLowerCase();
		sqls = sqlServiceHelper.toSqlListAndSkipSelects($scope.query);
		if (sqls.length == 0) {
			var message = "Nothing to process or multiple select";
			message += " statements can't processed";
			$scope.message = message;
			$scope.tabs.console = true;
			return;
		}
		if ($scope.query.match(/^select.*/)) {
			sqlService.process(sqls, onSuccessSelect, onFailure);
		} else {
			sqlService.process(sqls, onSuccess, onFailure);
		}
	}

	function onSuccessSelect(transaction, results, records) {
		$scope.queries.push($scope.query);
		var message = 'Success : ' + sqls.join('\n') + "\n";
		if (records.length > 0) {
			var columns = [];
			for ( var prop in records[0]) {
				columns.push(prop);
			}
			// $log.info(columns);
			$scope.columns = columns;
			$scope.records = records;
		}
		$scope.message = message;

		// $scope.recentQueries.unshift(sqls);

		$scope.tabs.result = true;
		$scope.$apply();
		// $log.info($scope.message);
	}

	function onSuccess() {
		$scope.queries.push($scope.query);
		var message = 'Success : ' + $scope.query;
		$scope.message = message;

		var index = $scope.recentQueries.indexOf($scope.query);
		if (index != -1) {
			$scope.recentQueries.splice(index, 1);
		}

		// $scope.recentQueries.unshift(sqls);

		$scope.tabs.console = true;
		$scope.$apply();
		// $log.info($scope.message);
	}

	function onFailure(error, statement) {
		var message = 'Error : ' + error.message + " when processing "
				+ statement;
		$scope.message = message;
		$scope.tabs.console = true;
		$scope.$apply();
		// $log.warn(message);
	}

});

appControllers.controller('indexedDbController', function($scope, $log,
		$registry, alertService) {
	$scope.alerts = alertService;

	$scope.message = 'Welcome to IndexedDb!';
});

appControllers.controller('aboutController', function($scope, $log, $registry) {
	$scope.appId = $registry.get('appId');
	$scope.appVersion = $registry.get('appVersion');
});

appControllers.controller('testController', function($scope, $log, $registry,
		alertService) {
	$scope.message = 'Test View';

	$scope.alerts = alertService;
	$scope.error = 'An error occurred';
	$scope.warning = 'An warning occurred';
	$scope.success = 'Ok';
});

/*
 * var http = $http.get('appContext.json'); http.success(function(response,
 * status, headers, config) { $log.info('success...'); $scope.data = response;
 * appContext = angular.copy(response); $log.info(appContext); $log.info('Status = ' +
 * status); }); http.error(function(response, status, headers, config) {
 * $log.info('error...'); $log.error(response); $log.info('Status = ' + status);
 * });
 */
