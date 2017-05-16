// socialBridge.controller('fbPostCntrl',["$scope","authFact","$http",function ($scope,authFact,$http) {
//   var userObj = authFact.getUserObj();
//   $scope.Name = userObj.name;
//   $scope.form = {method:'GET',path:"/me/feed"};
//     FB.api($scope.form.path, function (response){
//       console.log(response)
//       $scope.posts = response.data;
//
//     })
//
// }]);
socialBridge
  .controller('fbPostCntrl', function ($rootScope,$scope, facebook) {
    $scope.results = [];
    $rootScope.$on("fb.init",function () {
      console.log("SDK ready");
    });

    $scope.getPublicProfile = function () {
      facebook.getUser().then(function (r) {
        $scope.results = r.user;
      });
    }

    $scope.img = "";
    $scope. getProfilePicture =  function () {
      facebook.getUserPicture("me",{width:300, height:300}).then(function (r) {
        $scope.img = r.picture.url;
      });
    }
    $scope.posts = [];
    $scope.form = {method:'GET',path:"/me/posts?fields=picture,story,description,link,full_picture"};
    $scope.fbapi = function () {
      facebook.api($scope.form.path,facebook.API_METHOD[$scope.form.method]).then(function (resp) {
        console.log("Success!");
        console.log(resp);
        $scope.posts = resp.data;
      })
    }
  });
