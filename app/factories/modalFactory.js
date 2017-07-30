/**
 * Created by shobhit on 30/07/17.
 */
(function () {
    "use strict";
    var socialBridge = angular.module('socialBridge');
    socialBridge.factory('modalFactory', ['$uibModal', function($uibModal) {
        return {
            open: function(size, template, params) {
                return $uibModal.open({
                    animation: true,
                    templateUrl: template,
                    controller: 'ModalResultInstanceCtrl',
                    controllerAs:'modalInstance',
                    size: size,
                    resolve: {
                        params: function() {
                            return params;
                        }
                    }
                });
            }
        };
    }]);
}());