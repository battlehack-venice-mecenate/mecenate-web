(function () {
    'use strict';

    var URL_API = 'https://boiling-escarpment-2702.herokuapp.com';

    angular.module('core').service('mecenateMapService', mecenateMapService);

    mecenateMapService.$inject = ['$log', '$q', '$http', 'lodash'];

    var buildPoisMap = function(data) {
        var markersTransformed = _.transform(data.pois, function(result, n, value) {
            result.push({
                id: n.id,
                name: n.name,
                description: n.description,
                imageUrl: n['image_url'],
                latitude: n.lat,
                longitude: n.lon
            });
        });
        var map = {
            center: {
                latitude: data.pois[0].lat,
                longitude: data.pois[0].lon
            },
            zoom: 17,
            markers: markersTransformed
        };
        return map;
    };

    function mecenateMapService($log, $q, $http, _) {

        var getPois = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/pois').
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mapService.getPois(): ' + JSON.stringify(data));
                    if (data.pois !== undefined && !_.isEmpty(data.pois)) {
                        deferred.resolve(buildPoisMap(data));
                    } else {
                        deferred.reject([]);
                    }
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mapService.getPois(): ' + JSON.stringify(data));
                    //deferred.reject(data);
                });
            return deferred.promise;
        };

        var postDonation = function() {
            // TODO
        };

        return {
            getPois: getPois,
            postDonation: postDonation
        };
    }

})();
