socialBridge
.controller('MainCtrl', function($scope, $q, spontaneousService) {
  $scope.myPosts = [];

  spontaneousService.initialize();
console.log("Spontaneous Initialized");
  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  $scope.refreshPosts = function() {
    spontaneousService.getLatestPosts().then(function(data) {
      $scope.myPosts = $scope.myPosts.concat(data);
    }, function() {
      $scope.rateLimitError = true;
    });
  }

  //when the user clicks the connect twitter button, the popup authorization window opens
  $scope.connectSpontaneousButton = function() {
    spontaneousService.connectSpontaneous().then(function() {
      if(spontaneousService.isReady()) {
        //if the authorization is successful, hide the connect button and display the tweets
        $('#connectSpontaneousButton').fadeOut(function() {
          $('#getPostsButton','#signOutSpontaneous').fadeIn();
          $scope.refreshPosts();
          $scope.connectedSpontaneous = true;
        });
      } else {
        console.log("Spontaneous Service not ready!");
      }
    });
  }

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
});
