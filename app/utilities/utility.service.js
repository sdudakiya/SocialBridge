/**
 * Created by shobhit on 30/07/17.
 */
"use strict";

(function () {
    var socialBridge = angular.module( 'socialBridge');
    socialBridge.service("spontaneousMatchService", ['$http', function ($http) {
        //var access_token = 'usbbnvp7fzm5spfhybphk5xi5tyrxafcdxtuwztl';
        var success = function(response, status) {
            var response ={
                successResponse : response.data,
                successStatus : status
            };
            return response;
        };

        var error = function(error, status) {
            var response ={
                errorResponse : error.data,
                errorStatus : status
            };
            return response;
        };
        var postFeed = function(title, content) {
            /*var data = $.param({
                'title' : title,
                'content' : content,
                'status' : 'publish'
            });*/
            var url="http://spontaneousmatch.ca/wp-json/wp/v2/social?access_token=usbbnvp7fzm5spfhybphk5xi5tyrxafcdxtuwztl&status=publish";
            url = url + '&title=' + title + "&content=" + content;
            console.log(url.length);
            return $http.post(url).then(success, error);
        };

        return {
            postFeed : postFeed
        }
    }])
}());