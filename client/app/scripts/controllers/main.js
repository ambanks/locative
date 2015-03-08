'use strict';
/**
 * @ngdoc function
 * @name locativeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the locativeApp
 */
angular.module('locativeApp')
  .controller('MainCtrl', function ($scope) {
    
    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 4,
      bounds: {}
    };

    $scope.markerList = [
      {
        id: 0,
        latitude: 45,
        longitude: -73
      },
      {
        id: 1,
        latitude: 46,
        longitude: -74
      },
      {
        id: 2,
        latitude: 48,
        longitude: -75
      },
      {
        id: 3,
        latitude: 49,
        longitude: -76
      },
    ];
  });
