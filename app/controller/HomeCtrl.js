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
                });
			} else {
            	$scope.errorMessage = true;
			}
        }, function (error) {
            $scope.errorMessage = true;
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
