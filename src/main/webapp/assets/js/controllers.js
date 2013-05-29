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
	$scope.message = 'Welcome!';
});

appControllers.controller('webSqlController', function($scope, $log, $registry,
		alertService, sqlService, sqlServiceHelper) {
	$scope.alerts = alertService;

	$scope.recentQueries = [];
	$scope.columns = [];
	$scope.records = [];
	$scope.message = '';
	$scope.tabs = {
		result : false,
		console : true,
		help : false
	};
	$scope.run = run;
	$scope.runByQuery = runByQuery;
	$scope.copyToQueryEditor = copyToQueryEditor;
	$scope.message = $registry.get('appId') + 'Db database initialized...';

	var sqls = [];

	function run() {
		$scope.query = $scope.query.toLowerCase();
		runByQuery($scope.query);
	}

	function runByQuery(query) {
		sqls = sqlServiceHelper.toSqlListAndSkipSelects(query);
		if (sqls.length == 0) {
			var message = "Nothing to process or multiple select";
			message += " statements can't processed...";
			$scope.message = message;
			$scope.tabs.console = true;
			return;
		}
		if (sqls.length == 1 && sqls[0].match(/^select.*/)) {
			sqlService.process(sqls, onSuccessSelect, onFailure);
		} else {
			sqlService.process(sqls, onSuccess, onFailure);
		}
	}

	function copyToQueryEditor(query) {
		$scope.query = query;
	}

	function onSuccessSelect(transaction, results, records) {
		if (records.length > 0) {
			var columns = [];
			for ( var prop in records[0]) {
				columns.push(prop);
			}
			$scope.columns = columns;
			$scope.records = records;
		}

		var message = 'Success : ';
		for ( var i = 0; i < sqls.length; i++) {
			var index = $scope.recentQueries.indexOf(sqls[i].sql);
			if (index != -1) {
				$scope.recentQueries.splice(index, 1);
			}
			$scope.recentQueries.unshift(sqls[i].sql);
			message += '\n' + sqls[i].sql;
		}
		$scope.message = message;

		$scope.tabs.result = true;
		$scope.$apply();
	}

	function onSuccess() {
		var message = 'Success : ';
		for ( var i = 0; i < sqls.length; i++) {
			var index = $scope.recentQueries.indexOf(sqls[i].sql);
			if (index != -1) {
				$scope.recentQueries.splice(index, 1);
			}
			$scope.recentQueries.unshift(sqls[i].sql);
			message += '\n' + sqls[i].sql;
		}
		$scope.message = message;

		$scope.tabs.console = true;
		$scope.$apply();
	}

	function onFailure(error, statement) {
		var message = 'Error : ' + error.message;
		message += " when processing " + statement;
		$scope.message = message;

		$scope.tabs.console = true;
		$scope.$apply();
	}

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
