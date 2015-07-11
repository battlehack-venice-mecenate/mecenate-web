'use strict';


angular.module('core').controller('HomeController', ['$scope', 'uiGmapGoogleMapApi',
	function($scope, uiGmapGoogleMapApi) {

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		});

	}
]);
