var wydAngularFilters = angular.module('wydAngular.filters', []);

wydAngularFilters.filter('charLimit', function() {
	return function(input, charLimit) {
		if (isNaN(charLimit)) {
			return input;
		}
		if (charLimit <= 0) {
			return '';
		}
		if (input && input.length >= charLimit) {
			input = input.substring(0, charLimit);
			var lastspace = input.lastIndexOf(' ');
			// get last space
			if (lastspace !== -1) {
				input = input.substr(0, lastspace);
			}
			return input + '...';
		}
		return input;
	};
});

wydAngularFilters.filter('wordLimit', function() {
	return function(input, wordLimit) {
		if (isNaN(wordLimit)) {
			return input;
		}
		if (wordLimit <= 0) {
			return '';
		}
		if (input) {
			var inputWords = input.split(/\s+/);
			if (inputWords.length > wordLimit) {
				input = inputWords.slice(0, wordLimit).join(' ') + '...';
			}
		}
		return input;
	};
});

var wydAngularServices = angular.module('wydAngular.services', []);

wydAngularServices.factory('alertService', [ '$timeout', function($timeout) {
	var baseAlert = {
		success : false,
		error : false,
		warning : false,
		message : ''
	};
	return {
		messages : [],
		addSuccess : function(message) {
			this.messages.push(angular.extend({}, baseAlert, {
				success : true,
				message : message
			}));
		},
		addError : function(message) {
			this.messages.push(angular.extend({}, baseAlert, {
				error : true,
				message : message
			}));
		},
		addWarning : function(message) {
			var alert = angular.extend({}, baseAlert, {
				warning : true,
				message : message
			});
			this.messages.push(alert);
			var self = this;
			$timeout(function() {
				self.remove(alert);
			}, 3000);
		},
		remove : function(alert) {
			var index = this.messages.indexOf(alert);
			this.messages.splice(index, 1);
		},
		removeAll : function() {
			this.messages.length = 0;
		}
	};
} ]);

var wydAngular = angular.module('wydAngular.directives', []);

function wydAngularAlerts(alertService) {
	return {
		restrict : 'EA',
		replace : true,
		template : '<div class="alerts">'
				+ '<div class="alert" '
				+ 'ng-repeat="alert in alerts.messages" '
				+ 'ng-class="{\'alert-success\': alert.success, \'alert-error\': alert.error}"'
				+ '>'
				+ '<a class="close" ng-click="alerts.remove(alert)">&times;</a>'
				+ '{{alert.message}}' + '</div>' + '</div>',
		link : function(scope) {
			scope.alerts = alertService;
		}
	};
}
wydAngular.directive('alerts', [ 'alertService', wydAngularAlerts ]);

function wydAngularCharLimit($parse) {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, ngModelCtrl) {
			var ngModelSet = $parse(attrs.ngModel).assign;

			ngModelCtrl.$viewChangeListeners.push(function() {
				ngModelSet(scope, ngModelCtrl.$viewValue.slice(0,
						attrs.charLimit));
			});
		}
	};
}
wydAngular.directive('charLimit', [ '$parse', wydAngularCharLimit ]);
