'use strict';


angular.module('core').controller('HomeController', ['$scope', 'uiGmapGoogleMapApi', 'mecenateMapService',
	function($scope, uiGmapGoogleMapApi, mecenateMapService) {

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		});

		mecenateMapService.getPois().then(function(data) {
			console.log('AAA' + data);
		});

	}
]);
