myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: 'views/home/login.html',
		controller: 'HomeCtrl'
	})
	.when("/dashboard", {
		templateUrl: 'views/home/dashboard.html',
		controller: 'DashboardCtrl',
		authenticated: true
	})
	.otherwise('/',{
		templateUrl: 'views/home/home.html',
		controller: 'HomeCtrl'
	})
}]);

myApp.run(["$rootScope", "$location", "authFact", function($rootScope, $location, authFact){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		//console.log(event);
		//console.log(next);
		//console.log(current);
		/* If the user is authenticated, the user should get access Token */
		if (next.$$route.authenticated) {
			var userAuth = authFact.getAccessToken();
			if (!userAuth) {
				$location.path('/');
			};
		};
	})
}]);