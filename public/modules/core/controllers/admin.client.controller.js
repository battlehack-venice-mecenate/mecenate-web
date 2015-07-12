'use strict';

(function () {

    angular.module('core').controller('AdminController', AdminController);

    AdminController.$inject = ['$log', '$q', '$scope', 'mecenateAdminService'];

    var updatePois = function($scope, mecenateAdminService) {
        mecenateAdminService.getPois().then(function (data) {
            //$log.debug('invoke service getPois: ' + JSON.stringify(data));
            $scope.poisList = data;
        })
    };

    function AdminController($log, $q, $scope, mecenateAdminService) {

        mecenateAdminService.getDonations().then(function (data) {
            //$log.debug('invoke service getDonations: ' + JSON.stringify(data));
            $scope.donations = data.donations;
        });

        updatePois($scope, mecenateAdminService);

        /*
        $scope.isFormShown = true;
        $scope.toggleForm = function() {
            $scope.isFormShown = !$scope.isFormShown;
            if (!$scope.isFormShown) {
                $scope.poisItem = undefined;
            }
        };
        */
        $scope.submitForm = function() {
            // TODO validazione
            if ($scope.poisItem !== undefined) {
                mecenateAdminService.postPois($scope.poisItem).then(function (data) {
                    //$log.debug('invoke service getPois: ' + JSON.stringify(data));
                    updatePois($scope, mecenateAdminService);
                    $scope.poisItem = undefined;
                });
            }
        };
    };

})();
