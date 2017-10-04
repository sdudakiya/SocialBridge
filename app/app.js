var socialBridge = angular.module( 'socialBridge', ['ngRoute','ngCookies','ng-facebook-api','ngSanitize','socialBridge.services','ui.bootstrap'])
      .config(function(facebookProvider) {
        facebookProvider.setInitParams('1663972093898924',true,true,true,'v2.8');
        facebookProvider.setPermissions('user_posts','read_stream');
      });
