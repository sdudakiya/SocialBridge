myApp.factory('authFact', ["$cookieStore", function ($cookieStore) {
	var authFact = {};
	authFact.setAccessToken = function(accessToken){
		$cookieStore.put('accessToken', accessToken);
		//authFact.authToken = accessToken;
	}

	authFact.getAccessToken = function(){
		authFact.authToken = $cookieStore.get('accessToken');
		return authFact.authToken;
	}

	authFact.getUserObj = function(){
		var userObj = $cookieStore.get('userObj');
		if (userObj) { return userObj; }
		else { console.log('User Not foudnd'); };
	}

	return authFact;
}]);