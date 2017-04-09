var socialBridge = angular.module( 'socialBridge', ['ngRoute','ngCookies','ng-facebook-api'])
      .config(function(facebookProvider) {
        facebookProvider.setInitParams('1663972093898924',true,true,true,'v2.8');
        facebookProvider.setPermissions('user_posts','read_stream');
      });
/*
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1663972093898924',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
*/
