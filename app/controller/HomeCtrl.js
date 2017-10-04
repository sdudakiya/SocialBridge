socialBridge.controller('HomeCtrl', ["$location",
	"spontaneousMatchService",
	function ($location, spontaneousMatchService) {
	var $scope = this;
        $scope.loginSuccess = false;
	if(spontaneousMatchService.checkCookie() !== false) {
		spontaneousMatchService.validateCookie(spontaneousMatchService.checkCookie());
        $scope.loginSuccess = true;
	}

	$scope.login = function(user) {
        var data = {
            'username' : user.userName,
            'password' : user.password
        };
        $scope.loadingSpinner = true;
        spontaneousMatchService.generateCookie(data).then(function (response) {
            if(response) {
            	var data = {
            		'controller' : 'userplus'.toString(),
					'method' : 'add_post'.toString()
				}
            	$scope.loginSuccess = true;
            	spontaneousMatchService.getNonce(data).then(function () {
					$location.path("/spontaneous");
                }, function () {
					$scope.nonceError = 'Server is down';
                    $scope.loadingSpinner = false;
                });
			} else {
            	$scope.errorMessage = true;
                $scope.loadingSpinner = false;
			}
        }, function (error) {
            $scope.errorMessage = true;
            $scope.loadingSpinner = false;
            console.log(error);
        });
	}
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
