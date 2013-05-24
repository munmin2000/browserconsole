var dependents = [ 'ui.bootstrap', 'ui.utils', 'ui.compat', 'app.filters',
		'app.services', 'app.directives', 'app.controllers' ];

var app = angular.module('app', dependents);

app.config(configs);

app.run([ '$rootScope', '$state', '$stateParams',
		function($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		} ]);
