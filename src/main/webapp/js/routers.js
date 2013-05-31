var router = function($stateProvider, $routeProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$routeProvider.when('/', {
		redirectTo : '/webSql'
	});

	var stateProvider = $stateProvider.state('home', {
		url : '/home',
		views : {
			'viewA' : {
				templateUrl : 'partials/home.html',
				controller : 'homeController'
			}
		}
	});

	stateProvider.state('webSql', {
		url : '/webSql',
		views : {
			'viewA' : {
				templateUrl : 'partials/webSql.html',
				controller : 'webSqlController'
			}
		}
	});

	stateProvider.state('test', {
		url : '/test',
		views : {
			'viewA' : {
				templateUrl : 'partials/test.html',
				controller : 'testController'
			}
		}
	});

};
var configs = [ '$stateProvider', '$routeProvider', '$urlRouterProvider',
		router ];
