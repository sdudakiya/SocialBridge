socialBridge.controller('fbPostCntrl',["$scope","authFact","$http",function ($scope,authFact,$http) {
  var userObj = authFact.getUserObj();
  $scope.Name = userObj.name;

    FB.api("/"+userObj.id+"/posts", function (response){
      if(response.data){
        $scope.posts = response.data;
      }
    });

}]);
