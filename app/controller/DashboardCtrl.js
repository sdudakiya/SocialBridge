myApp.controller('DashboardCtrl', ["$scope", "authFact", "$http", function ($scope, authFact, $http) {
    var userObj = authFact.getUserObj();
    console.log(userObj);
    $scope.Name = userObj.name;
    $scope.FBPost = function () {
        FB.ui({
            method: 'feed',
            name: 'Spontaneous Match',
            link: 'http://spontaneousmatch.ca',
                        //picture: 'http://picture-you-want-to-show',
                        caption: 'Please Follow me on Spontaneous Match',
                        description: 'Best Dating Site',
                        message: 'Please Follow me on spontaneousmatch.ca'
                    });
    }, {scope: 'publish_actions'}

    $scope.FBHello = function(){
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object:'https://developers.facebook.com/docs/',
        })
      }, function(response){});
    };

    $scope.FBRead = function(){
        FB.api(
            //https://m.facebook.com/story.php?story_fbid=1354875074572730&id=100001507521989
            //GET /{object-instance-id},
            function (response) {
              if (response && !response.error) {
                /* handle the result */
            }
        });
    }


    $scope.FBReading = function(){
        console.log('Reading');
        //1291944647509380
        FB.api(
            "/547102158831071",
            { access_token: authFact.getAccessToken() },
            function (response) {
        //console.log(response)
        $scope.data = response;
        if (response && !response.error) {
            /* handle the result */
            console.log('success');
            console.log(response);
        }
    });
    }

    $scope.GetNum = function(){
        var string = "https://www.facebook.com/Cutebabebaba/videos/570382813165522/";
        //var string = "https://www.facebook.com/amar.mohite.969/posts/1401478289914319?notif_t=close_friend_activity&notif_id=1490268187475317";
        var numbers = string.match(/\d+/g).map(Number);

        console.log(numbers);
        FB.api(
            "/" + numbers,
            { access_token: authFact.getAccessToken() },
            function (response) {
        //console.log(response)
        $scope.data = response;
        if (response && !response.error) {
            /* handle the result */
            console.log('success');
            console.log(response);
        }
    });
        //alert(numbers);
    }

}]);