'use strict';

(function () {

    angular.module('core').controller('HomeController', HomeController);

    HomeController.$inject = ['$log', '$q', '$scope',
        'uiGmapGoogleMapApi', 'mecenateMapService'];

    function HomeController($log, $q, $scope, uiGmapGoogleMapApi, mecenateMapService, $braintree) {

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
                amount: 5
            };

            mecenateMapService.getClientToken().then(function (data) {
                //$log.debug('invoke service getClientToken: ' + JSON.stringify(data));
                /*
                braintree.setup(data.client_token, "dropin", {
                    container: "payment-form",
                    onPaymentMethodReceived: function (obj) {
                        // Do some logic in here.
                        // When you're ready to submit the form:
                        //myForm.submit();
                        $log.debug('braintree: ' + JSON.stringify(obj));
                    }
                });
                */
                braintree.setup(data.client_token, "dropin", {
                    container: "dropin-container",
                    paypal: {
                        singleUse: true,
                        amount: 10.00,
                        currency: 'USD'
                    }
                });
            });
        };

    };

})();
