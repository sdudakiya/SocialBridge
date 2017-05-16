socialBridge.controller('HomeCtrl', ["$scope", "$location", function ($scope, $location) {

	$scope.facebookHome = function () {
		// FB.login(function(response) {
		// 	if (response.authResponse) {
		// 		console.log('Welcome!  Fetching your information.... ');
		// 		FB.api('/me', function(response) {
		// 			console.log('Good to see you, ' + response.name + '.');
		// 			console.log(response);
		// 			$cookieStore.put('userObj', response);
		// 			var accessToken = FB.getAuthResponse().accessToken;
		// 			console.log(accessToken);
		// 			authFact.setAccessToken(accessToken);
		// 			$location.path("/posts");
		// 			$scope.$apply();
		// 		});
		// 	} else {
		// 		console.log('User cancelled login or did not fully authorize.');
		// 	}
		// });

		$location.path("/facebook");

	}

	$scope.twitterHome = function () {
		$location.path("/twitter");
	}
}]);
