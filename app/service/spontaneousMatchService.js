/* global socialBridgeProperties */

(function () {
    'use strict';
    var socialBridge = angular.module("socialBridge");
    var spontaneousMatchService = function($cookies, $http, $q) {
        var default_header = {"Content-Type": "application/x-www-form-urlencoded"};
        var spontaneousMatchkey = socialBridgeProperties.spontaneousMatch.key;
        var api_end_point = socialBridgeProperties.spontaneousMatch.cookie_api_endpoint;
        var checkCookie = function() {
            var spontaneousMatchCookie = $cookies.get('spontaneousMatchCookie');
            if(angular.isDefined(spontaneousMatchCookie))
                return spontaneousMatchCookie;
            else
                return false;
        };

        var validateCookie =  function(spontaneousMatchCookie, header_data) {
            var defferdPromise = $q.defer();
            var header;
            var data = $.param({
                'key' : spontaneousMatchkey,
                'cookie' : spontaneousMatchCookie
            });
            if(angular.isUndefined(header_data)) {
                header = {'headers' :default_header};
            } else {
                header = {'headers' : header_data};
            }
            var promise = $http.post(api_end_point+'validate_auth_cookie', data, header);

            promise.then(function () {
                defferdPromise.resolve(true);
            }, function(){
                defferdPromise.reject(false);
            });

            return defferdPromise.promise;
        };

        var generateCookie = function (data, header_data) {
            var defferedPromise = $q.defer();
            var postContent = {key : spontaneousMatchkey};
            var header;
            angular.extend(postContent, data);
            if(angular.isUndefined(header_data)) {
                header = {'headers' :default_header};
            } else {
                header = {'headers' : header_data};
            }
            postContent =$.param(postContent);
            var promise = $http.post(api_end_point+'generate_auth_cookie', postContent, header);
            promise.then(function (response) {
                var status = response.data.status;
                if(status === 'ok') {
                    $cookies.put('spontaneousMatchCookie', response.data.cookie);
                    defferedPromise.resolve(true);
                } else {
                    defferedPromise.resolve(false);
                }
            }, function(error){
                defferedPromise.reject('error');
            });
            return defferedPromise.promise;
        };

        var addPost = function (data, header_data) {
            var defferdPromise = $q.defer(), header;
            var postContent = {
                'key' : spontaneousMatchkey,
                'status' : 'publish',
                'cookie' : $cookies.get('spontaneousMatchCookie'),
                'nonce' : $cookies.get('spontaneousMatchNonce')
            };
            angular.extend(postContent, data);
            if(angular.isUndefined(header_data)) {
                header = {'headers' :default_header};
            } else {
                header = {'headers' : header_data};
            }
            postContent =$.param(postContent);
            var promise = $http.post(api_end_point+'add_post', postContent, header);

            promise.then(function (response) {
                defferdPromise.resolve(response.data);
            }, function(){
                defferdPromise.reject(false);
            });
            return defferdPromise.promise;
        };

        var getNonce = function(data, header_data) {
            var defferdPromise = $q.defer(), postContent ={}, header;
            if(angular.isUndefined(header_data)) {
                header = {'headers' : default_header};
            } else {
                header = {'headers' : header_data};
            }
            angular.extend(postContent, data);
            postContent = $.param(postContent);
            var promise = $http.post('http://spontaneousmatch.ca/api/get_nonce/', postContent, header);
            promise.then(function (response) {
                if(response.data.status === 'ok') {
                    $cookies.put('spontaneousMatchNonce', response.data.nonce);
                    defferdPromise.resolve(true);
                    //return true;
                } else {
                    defferdPromise.reject(false)
                 //return false;
                }
            }, function(error){
                defferdPromise.reject('error');
                //return 'error';
            });

            return defferdPromise.promise;
        };
        var fetchPost = function () {
            var defferdPromise = $q.defer();
            var promise = $http.get('http://spontaneousmatch.ca/wp-json/wp/v2/social');
            promise.then(function (response) {
                if(response.status === 200) {
                    defferdPromise.resolve(response.data);
                } else {
                    defferdPromise.resolve(false);
                }
            }, function(error){
                defferdPromise.reject('error');
            });
            return defferdPromise.promise;

        };
        return {
            checkCookie : checkCookie,
            validateCookie : validateCookie,
            generateCookie : generateCookie,
            addPost : addPost,
            getNonce : getNonce,
            fetchPost : fetchPost
        };
    };
    socialBridge.service('spontaneousMatchService', ['$cookies', '$http', '$q', spontaneousMatchService]);
})();
