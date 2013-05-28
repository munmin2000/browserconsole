var router = function($stateProvider, $routeProvider, $urlRouterProvider,
		$registryProvider) {

	$registryProvider.defaults({
		appId : 'browserConsole',
		appVersion : 0.1
	});

	$urlRouterProvider.otherwise('/');

	$routeProvider.when('/', {
		redirectTo : '/home'
	});

	var stateProvider = $stateProvider.state('home', {
		url : '/home',
		views : {
			'viewA' : {
				templateUrl : 'home.html',
				controller : 'homeController'
			}
		}
	});

	stateProvider.state('webSql', {
		url : '/webSql',
		views : {
			'viewA' : {
				templateUrl : 'webSql.html',
				controller : 'webSqlController'
			}
		}
	});

	stateProvider.state('indexedDb', {
		url : '/indexedDb',
		views : {
			'viewA' : {
				templateUrl : 'indexedDb.html',
				controller : 'indexedDbController'
			}
		}
	});

	stateProvider.state('about', {
		url : '/about',
		views : {
			'viewA' : {
				templateUrl : 'about.html',
				controller : 'aboutController'
			}
		}
	});

	stateProvider.state('test', {
		url : '/test',
		views : {
			'viewA' : {
				templateUrl : 'test.html',
				controller : 'testController'
			}
		}
	});

};
var configs = [ '$stateProvider', '$routeProvider', '$urlRouterProvider',
		'$registryProvider', router ];
