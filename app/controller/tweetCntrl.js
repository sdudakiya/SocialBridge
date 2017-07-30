socialBridge
.controller('tweetCntrl',['$q','twitterService','spontaneousMatchService','modalFactory',
    function($q, twitterService, spontaneousMatchService, modalFactory) {
  var $scope = this;
  $scope.tweets = [];
  twitterService.initialize();
  console.log("Initialized");
  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  $scope.refreshTimeline = function(maxId) {
    twitterService.getLatestTweets(maxId).then(function(data) {
      $scope.tweets = $scope.tweets.concat(data);
    }, function() {
      $scope.rateLimitError = true;
    });
  }

  /**To post the socialBridge Post to spontaneousMatch*/
  $scope.postFeed = function (title, content) {
    debugger;
      var postFeedDeferred = $q.defer();
      var promise = spontaneousMatchService.postFeed(title, content);
      promise.then(function(response){
        postFeedDeferred.resolve(response);
        console.log(response.successResponse);
        console.log(response.successStatus);
        modalFactory.open('md', 'views/popModal.html', {response : response.successResponse});
      },function (error) {
        postFeedDeferred.reject(error);
        console.log(error.errorResponse);
        console.log(error.errorStatus);
      });
  }
  //when the user clicks the connect twitter button, the popup authorization window opens
  $scope.connectButton = function() {
    twitterService.connectTwitter().then(function() {
      if(twitterService.isReady()) {
        //if the authorization is successful, hide the connect button and display the tweets
        $('#connectButton').fadeOut(function() {
          $('#getTimelineButton','#signOut').fadeIn();
          $scope.refreshTimeline();
          $scope.connectedTwitter = true;
        });
      } else {
        console.log("Service not ready!");
      }
    });
  }


  //sign out clears the OAuth cache, the user will have to reauthenticate when returning
  $scope.signOut = function () {
    twitterService.clearCache();
    $scope.tweets.length = 0;
    $('#getTimelineButton','#signOut').fadeOut(function() {
      $('#connectButton').fadeIn();
      $scope.$apply(function () {
        $scope.connectedTwitter = false
      })
    });
  }

  //if the user is a returning user, hide the sign in button and display the tweets
  if(twitterService.isReady()) {
    $('#connectButton').hide();
    $('#getTimelineButton','#signOut').show();
    $scope.connectedTwitter = true;
    $scope.refreshTimeline();
  }
}]);
