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

    $scope.polylines = [
      {
        id: 1,
        path: [
            {
                latitude: 33.7335,
                longitude: -84.3735
            },
            {
                latitude: 33.7487,
                longitude: -84.3713
            },
            {
                latitude: 33.7729,
                longitude: -84.3657
            }  
        ],
        stroke: {
            color: '#6060FB',
            weight: 3
        },
        editable: true,
        draggable: true,
        geodesic: true,
        visible: true,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.CIRCLE
            },
            offset: '25px'
          
        }]
      }
    ];
  });
