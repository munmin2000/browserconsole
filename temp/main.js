var http = $http.get('appContext.json');
http.success(function(response, status, headers, config) {
	$log.info('success...');
	$scope.data = response;
	appContext = angular.copy(response);
	$log.info(appContext);
	$log.info('Status = ' + status);
});
http.error(function(response, status, headers, config) {
	$log.info('error...');
	$log.error(response);
	$log.info('Status = ' + status);
});

appServices.factory('appContext', function($log, $http) {
	var appContext = {};
	var http = $http.get('appContext.json');
	http.success(function(response, status, headers, config) {
		$log.info('success...');
		appContext = angular.copy(response);
		$log.info(appContext);
		$log.info('Status = ' + status);
	});
	http.error(function(response, status, headers, config) {
		$log.info('error...');
		$log.error(response);
		$log.info('Status = ' + status);
	});
	return appContext;
});
