'use strict';

(function () {

    angular.module('core').controller('AdminController', AdminController);

    AdminController.$inject = ['$log', '$q', '$scope', 'mecenateMapService'];

    function AdminController($log, $q, $scope, mecenateMapService) {

        mecenateMapService.getDonations().then(function (data) {
            //$log.debug('invoke service getDonations: ' + JSON.stringify(data));
            $scope.donations = data.donations;
        });
    };

})();
