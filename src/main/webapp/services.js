'use strict';

var appServices = angular.module('app.services', []);

appServices.value('version', '0.1');

appServices.factory('sqlService', function($log, $registry) {
	try {
		var dbName = $registry.get('appId') + 'Db', description = dbName
				+ ' console database';
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

appServices.factory("sqlServiceHelper", function($log) {
	var webSqlServiceHelper = {};

	webSqlServiceHelper.toSqlListAndSkipSelects = function(sql) {
		var sqls = [], tsql = '', tsqls = _.str.lines(sql);

		if (tsqls.length > 1) {
			for ( var i = 0; i < tsqls.length; i++) {
				tsqls[i] = _.str.trim(tsqls[i]);
				if (_.str.isBlank(tsqls[i]) || tsqls[i].charAt(0) === '-') {
					continue;
				}
				if (_.str.endsWith(tsqls[i], ';')) {
					tsql += tsqls[i];
					tsql = tsql.toLowerCase();
					if (!_.str.startsWith(tsql, 'select')) {
						sqls.push(tsql);
					}
					tsql = '';
				} else {
					tsql += tsqls[i];
				}
			}
		} else {
			sqls = tsqls;
		}

		return sqls;
	};

	return webSqlServiceHelper;
});

/*
 * appServices.factory('appContext', function($log, $http) { var appContext =
 * {}; var http = $http.get('appContext.json'); http.success(function(response,
 * status, headers, config) { $log.info('success...'); appContext =
 * angular.copy(response); $log.info(appContext); $log.info('Status = ' +
 * status); }); http.error(function(response, status, headers, config) {
 * $log.info('error...'); $log.error(response); $log.info('Status = ' + status);
 * }); return appContext; });
 */
