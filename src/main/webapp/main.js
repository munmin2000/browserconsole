var dependents = [ 'ui.bootstrap', 'ui.utils', 'ui.compat', 'app.filters',
		'app.services', 'app.directives', 'app.controllers' ];

var app = angular.module('app', dependents);

app.config([ '$stateProvider', '$routeProvider', '$urlRouterProvider',
		function($stateProvider, $routeProvider, $urlRouterProvider) {

			$stateProvider.state('home', {
				url : '/home',
				views : {
					'viewA' : {
						templateUrl : 'home.html',
						controller : 'homeController'
					}
				}
			}).state('webSql', {
				url : '/webSql',
				views : {
					'viewA' : {
						templateUrl : 'webSql.html',
						controller : 'webSqlController'
					}
				}
			}).state('about', {
				url : '/about',
				views : {
					'viewA' : {
						templateUrl : 'about.html',
						controller : 'aboutController'
					}
				}
			})

		} ]);

app.run([ '$rootScope', '$state', '$stateParams',
		function($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		} ]);
