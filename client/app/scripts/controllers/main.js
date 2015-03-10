'use strict';
/**
 * @ngdoc function
 * @name locativeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the locativeApp
 */
angular.module('locativeApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 4,
      bounds: {}
    };

    $http.get('/api/users/4/journeys/13/posts')
      .success(function(data) {
        console.log(data);
        $scope.polylines = [
          {
            id: 1,
            path: [
                {
                    latitude: data[0]['latitude'],
                    longitude: data[0]['longitude']
                },
                {
                    latitude: data[1]['latitude'],
                    longitude: data[1]['longitude']
                },

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

  });
