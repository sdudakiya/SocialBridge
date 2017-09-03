socialBridge.controller('HomeCtrl', ["$scope", "$location", function ($scope, $location) {
	$scope.spontaneousHome = function () {
		$location.path("/spontaneous");
	}

	$scope.facebookHome = function () {
		$location.path("/facebook");
	}

	$scope.twitterHome = function () {
		$location.path("/twitter");
	}
}]);
