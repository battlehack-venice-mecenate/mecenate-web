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

        var buildPoisList = function(data) {
            var poisList = _.transform(data.pois, function(result, n, value) {
                result.push({
                    value: n.name + ' - ' + n.total_donations_in_cents/100 + '/' + n.target_in_cents/100
                });
            });
            return poisList;
        };

        var getPois = function() {
            var deferred = $q.defer();
            $http.get(URL_API + '/pois').
                success(function(data, status, headers, config) {
                    //$log.debug('SUCCESS mecenateAdminService.getPois(): ' + JSON.stringify(data));
                    if (data.pois !== undefined && !_.isEmpty(data.pois)) {
                        deferred.resolve(buildPoisList(data));
                    } else {
                        deferred.reject([]);
                    }
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateAdminService.getPois(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        var postPois = function(data) {

            var payload = {
                name: data.name,
                description: data.description,
                lat: data.latitude,
                lon: data.longitude,
                'image_url': data.imageUrl,
                'target_in_cents': data.target*100
            };

            $log.debug('payload: ' + payload);

            var deferred = $q.defer();
            $http.post(URL_API + '/pois', payload).
                success(function(data, status, headers, config) {
                    $log.debug('SUCCESS mecenateAdminService.postPois(): ' + JSON.stringify(data));
                    deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    $log.debug('ERROR mecenateAdminService.postPois(): ' + JSON.stringify(data));
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        return {
            getDonations: getDonations,
            getPois: getPois,
            postPois: postPois
        };
    }

})();
