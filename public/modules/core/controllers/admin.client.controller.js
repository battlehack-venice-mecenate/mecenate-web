'use strict';

(function () {

    angular.module('core').controller('AdminController', AdminController);

    AdminController.$inject = ['$log', '$q', '$scope', 'mecenateAdminService'];

    function AdminController($log, $q, $scope, mecenateAdminService) {

        mecenateAdminService.getDonations().then(function (data) {
            //$log.debug('invoke service getDonations: ' + JSON.stringify(data));
            $scope.donations = data.donations;
        });
    };

})();
