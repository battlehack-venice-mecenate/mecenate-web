'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'uiGmapGoogleMapApi',
	function($scope, Authentication, uiGmapGoogleMapApi) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		});

	}
]);
