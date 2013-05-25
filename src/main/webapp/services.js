'use strict';

var appServices = angular.module('app.services', []);

appServices.value('appContext', {
	appId : 'browserConsole'
});

appServices.value('version', '0.1');

appServices.factory('alertService', function() {
	return [];
});

appServices.factory('webSqlService', function($log, appContext) {

	try {
		var dbName = appContext.appId + 'Db', description = dbName + ' console database';
		html5sql.openDatabase(dbName, _.str.capitalize(description),
				1 * 1024 * 1024);
		html5sql.logInfo = true;
		html5sql.logErrors = true;
		html5sql.putSelectResultsInArray = true;
		$log.info(_.str.camelize(dbName) + ' database initialized...');
	} catch (error) {
		$log.error('Unable to initialize local database [' + error.message
				+ ']');
	}

	return html5sql;
});
