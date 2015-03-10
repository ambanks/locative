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
    angular.extend($scope, {
                atlanta: {
                    lat: 33.77152,
                    lng: -84.36736,
                    zoom: 8
                },
                markers: {
                    mainMarker: {
                        lat: 33.77152,
                        lng: -84.36736,
                        focus: true,
                        message: "Hey, drag me if you want",
                        draggable: true
                    }
                }
            });
       

    $http.get('/api/users/4/journeys/13/posts')
      .success(function(data) {
        console.log(data);

      });

  });
