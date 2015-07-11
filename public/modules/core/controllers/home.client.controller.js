'use strict';

(function () {

	angular.module('core').controller('HomeController', HomeController);

	HomeController.$inject = ['$log', '$q', '$scope', 'uiGmapGoogleMapApi', 'mecenateMapService'];

	function HomeController($log, $q, $scope, uiGmapGoogleMapApi, mecenateMapService) {

		mecenateMapService.getPois().then(function(data) {
			//$log.debug('invoke service getPois: ' + JSON.stringify(data));
			uiGmapGoogleMapApi.then(function(maps) {
				$scope.map = data;
			});
		});

		$scope.clickMarker = function (gMarker,eventName, model) {
			$log.debug('clickMarker: ' + JSON.stringify(model));
		};
	};

})();
