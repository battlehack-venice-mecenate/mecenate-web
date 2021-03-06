(function () {
    'use strict';

    var URL_API = 'https://mecenate-api.herokuapp.com/';

    angular.module('core').service('mecenateHomeService', mecenateHomeService);

    mecenateHomeService.$inject = ['$log', '$q', '$http', 'lodash'];

    var buildPoisMap = function(data) {
        var markersTransformed = _.transform(data.pois, function(result, n, value) {
            result.push({
                id: n.id,
                name: n.name,
                description: n.description,
                imageUrl: n['image_url'],
                latitude: n.lat,
                longitude: n.lon,
                total: n.total_donations_in_cents/100,
                target: n.target_in_cents
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

    function mecenateHomeService($log, $q, $http, _) {

        var getPois = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/pois').
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateHomeService.getPois(): ' + JSON.stringify(data));
                    if (data.pois !== undefined && !_.isEmpty(data.pois)) {
                        deferred.resolve(buildPoisMap(data));
                    } else {
                        deferred.reject([]);
                    }
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateHomeService.getPois(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        var getClientToken = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/client_token').
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateHomeService.getClientToken(): ' + JSON.stringify(data));
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateHomeService.getClientToken(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        // for test a valid card is: cardNumber = 4111 1111 1111 1111 and aaYY greater than now
        var postDonation = function(nonce, id, amount, email) {
            var payload = {
                'payment_method_nonce': nonce,
                'amount_in_cents': amount*100,
                'email': email
            };

            var URL_DONATION = '/pois/' + id + '/donations';

            //$log.debug('new DONATION: [id=' + id + '] ' + JSON.stringify(payload));

            var deferred = $q.defer();
            $http.post(URL_API + URL_DONATION, payload).
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateHomeService.postDonation(): ' + JSON.stringify(data));
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateHomeService.postDonation(): ' + JSON.stringify(data));
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
