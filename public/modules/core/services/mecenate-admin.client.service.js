(function () {
    'use strict';

    var URL_API = 'https://mecenate-api.herokuapp.com/';

    angular.module('core').service('mecenateAdminService', mecenateAdminService);

    mecenateAdminService.$inject = ['$log', '$q', '$http', 'lodash'];

    function mecenateAdminService($log, $q, $http, _) {

        var getDonations = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/donations').
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateAdminService.getDonations(): ' + JSON.stringify(data));
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateAdminService.getDonations(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        return {
            getDonations: getDonations
        };
    }

})();
