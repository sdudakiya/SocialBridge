/**
 * Created by shobhit on 30/07/17.
 */
(function () {
    "use strict";
    var modalResultInstanceCtrl = function($uibModalInstance, params) {
        var $scope = this;
        $scope.param = params;

        $scope.ok = function() {
            $uibModalInstance.close();
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };
    angular.module('socialBridge').controller('ModalResultInstanceCtrl',['$uibModalInstance', 'params', modalResultInstanceCtrl]);
}());