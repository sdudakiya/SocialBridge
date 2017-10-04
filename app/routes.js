socialBridge.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when("/", {
		//templateUrl:'views/home/home.html',
		controller: 'HomeCtrl'
	})
	.when("/spontaneous", {
		templateUrl:'views/home/home.html',
		controller: 'MainCtrl'
	})
	.when("/facebook", {
		// templateUrl: 'views/home/login.html',
		// controller: 'HomeCtrl'
		templateUrl:'views/facebook/newsfeed.html',
		controller: 'fbPostCntrl'
	})
	.when("/twitter", {
		templateUrl:'views/twitter/tweets.html',
		controller:'tweetCntrl',
		controllerAs:'tweet'
	})
	.otherwise({redirectTo : '/'});
}]);
