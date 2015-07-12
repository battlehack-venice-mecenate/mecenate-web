'use strict';

(function () {

    angular.module('core').controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$q', '$scope',
        'uiGmapGoogleMapApi', 'mecenateMapService'];

    var initBraintree = function($log, $scope, mecenateMapService) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        var completePayment = function(nonce) {
            mecenateMapService.postDonation(nonce, $scope.donation.id, $scope.donation.amount).then(function (data) {
                //$log.debug('invoke service postDonation: ' + JSON.stringify(data));

                var message = 'New donation of ' + data.donation['braintree_response'].amount;
                $scope.alerts.push({type: 'success', msg: message});

                $scope.donation = undefined;
            });
        };

        var initClientToken = function() {
            mecenateMapService.getClientToken().then(function (data) {
                //$log.debug('invoke service getClientToken: ' + JSON.stringify(data));
                braintree.setup(data.client_token, "dropin", {
                    container: "dropin-container",
                    onPaymentMethodReceived: function(response) {
                        //$log.debug('onPaymentMethodReceived: ' + JSON.stringify(response));
                        completePayment(response.nonce);
                    },
                    onReady: function() {
                        //$log.debug('onReady');
                        $scope.$apply(function() {
                            $scope.donation.showBtn = true;
                        });
                    },
                    onError: function(response) {
                        //$log.debug('onError: ' + JSON.stringify(response));
                    }
                });
            });
        };

        initClientToken();
    };

    function HomeController($log, $q, $scope, uiGmapGoogleMapApi, mecenateMapService) {

        mecenateMapService.getPois().then(function (data) {
            //$log.debug('invoke service getPois: ' + JSON.stringify(data));
            uiGmapGoogleMapApi.then(function (maps) {
                $scope.map = data;
            });
        });

        $scope.clickMarker = function (gMarker, eventName, model) {
            //$log.debug('clickMarker: ' + JSON.stringify(model));
            $scope.donation = {
                id: model.id,
                name: model.name,
                description: model.description,
                imageUrl: model.imageUrl,
                amount: 5,
                total: model.total
            };

            initBraintree($log, $scope, mecenateMapService);
        };
    };

})();
