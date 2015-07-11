(function () {
    'use strict';

    var URL_API = 'https://boiling-escarpment-2702.herokuapp.com';

    angular.module('core').service('mecenateMapService', mecenateMapService);

    mecenateMapService.$inject = ['$log', '$q', '$http'];

    function mecenateMapService($log, $q, $http) {

        var getPois = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/pois').
                success(function(data, status, headers, config) {
                    $log.debug('SUCCESS mapService.getPois(): ' + JSON.stringify(data));
                    /*
                    var dataTransformed = _.transform(response.data, function(result, n, value) {
                        result.push({id: n.code, value: n.title});
                    });
                    */
                    //deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mapService.getPois(): ' + JSON.stringify(data));
                    //deferred.reject(data);
                });
            return deferred.promise;
        };

        return {
            getPois: getPois
        };
    }

})();
