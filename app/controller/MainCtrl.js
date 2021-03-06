socialBridge
.controller('MainCtrl', ["$q",
    "spontaneousService",
    "spontaneousMatchService",
    "$filter",
    function($q, spontaneousService, spontaneousMatchService, $filter) {
  var $scope = this;
  $scope.myPosts = [];



  $scope.login = false;

  //spontaneousService.initialize();
  var initilaize = function () {
      spontaneousMatchService.fetchPost().then(function (res) {
        if(res !== false) {
            $scope.myPosts = res;
        }
      },function (error) {
          console.log(error);
      });
  };
  initilaize();

console.log("Spontaneous Initialized");
  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  $scope.refreshPosts = function() {
    spontaneousService.getLatestPosts().then(function(data) {
      $scope.myPosts = $scope.myPosts.concat(data);
    }, function() {
      $scope.rateLimitError = true;
    });
  };

  //when the user clicks the connect twitter button, the popup authorization window opens
  /*$scope.connectSpontaneousButton = function() {

  }*/

  //sign out clears the OAuth cache, the user will have to reauthenticate when returning
  $scope.signOutSpontaneous = function () {
    spontaneousService.clearCache();
    $scope.myPosts.length = 0;
    $('#getPostsButton','#signOutSpontaneous').fadeOut(function() {
      $('#connectSpontaneousButton').fadeIn();
      $scope.$apply(function () {
        $scope.connectedSpontaneous = false
      })
    });
  }

  //if the user is a returning user, hide the sign in button and display the tweets
  if(spontaneousService.isReady()) {
    $('#connectSpontaneousButton').hide();
    $('#getPostsButton','#signOutSpontaneous').show();
    $scope.connectedSpontaneous = true;
    $scope.refreshPosts();
  }
}]);
