angular.module('socialBridge.services',[]).factory('twitterService',function($q){
  var authorizationResult = false;

  return {
    initialize: function (){
      //initialize OAuth.io with public key
      OAuth.initialize('o-D0h3l4kPtRYWxp-u4H7Durfoo',{
        cache: true
      });

      //try to create an authorization result when the page loads,
      //this means a returning user won't have to click the twitter button again
      authorizationResult = OAuth.create("twitter");
    },
    isReady: function(){
      return (authorizationResult);
    },
    connectTwitter: function(){
      var deferred = $q.defer();
      OAuth.popup("twitter", {
        cache: true
      }, function (error, result){
        //cache means to execute the callback if the tokens are already present
        if(!error) {
          console.log("Authentication successful");
          authorizationResult = result;
          deferred.resolve();
        } else {
          console.log(error);
        }
      });
      return deferred.promise;
    },
    clearCache: function() {
      OAuth.clearCache('twitter');
      authorizationResult = false;
    },
    getLatestTweets: function(maxId) {
      //create a deferred object using Angular's $q service
      var deferred = $q.defer();
      var url = '/1.1/statuses/home_timeline.json';
      if(maxId) {
        url += '?max_id=' + maxId;
      }
      var promise = authorizationResult.get(url).done(function(data) {
        // https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
        // when the data is retrieved resolve the deferred object
        console.log(data);
        deferred.resolve(data);
      }).fail(function(err) {
        console.log(err);
        deferred.reject(err);
      });
      //return the promise of the deferred object
      return deferred.promise;
    }
  }
});
