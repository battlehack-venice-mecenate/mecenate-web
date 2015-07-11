(function () {
    'use strict';

    var URL_API = 'https://boiling-escarpment-2702.herokuapp.com';

    angular.module('core', ['braintree-angular'])
        .constant('clientTokenPath', URL_API + '/client_token');
});
