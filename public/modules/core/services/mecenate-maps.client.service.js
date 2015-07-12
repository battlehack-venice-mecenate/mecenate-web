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
                    //$log.debug('SUCCESS mecenateMapService.getPois(): ' + JSON.stringify(data));
                    if (data.pois !== undefined && !_.isEmpty(data.pois)) {
                        deferred.resolve(buildPoisMap(data));
                    } else {
                        deferred.reject([]);
                    }
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateMapService.getPois(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        var getClientToken = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/client_token').
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateMapService.getClientToken(): ' + JSON.stringify(data));
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateMapService.getClientToken(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        // for test a valid card is: cardNumber = 4111 1111 1111 1111 and aaYY greater than now
        var postDonation = function(nonce, id, amount) {
            var payload = {
                'payment_method_nonce': nonce,
                'amount_in_cents': amount*100
            };

            var URL_DONATION = '/pois/' + id + '/donations';

            //$log.debug('new DONATION: [id=' + id + '] ' + JSON.stringify(payload));

            var deferred = $q.defer();
            $http.post(URL_API + URL_DONATION, payload).
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateMapService.postDonation(): ' + JSON.stringify(data));
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateMapService.postDonation(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        return {
            getPois: getPois,
            getClientToken: getClientToken,
            postDonation: postDonation
        };
    }

})();
