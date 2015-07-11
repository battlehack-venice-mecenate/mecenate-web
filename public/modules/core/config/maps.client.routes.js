'use strict';

angular.module('core').config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDQAcUrRl38XIjLXFmUh5I0Vp017sRQF7E',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
