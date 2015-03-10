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
                        message: 'Hey, drag me if you want',
                        draggable: true
                    }
                }
            });
    
    $http.get('/api/users/4/journeys/13/posts')
    .success(function(data) {
      var latitudes  = [];
      var longitudes = [];
      var i;
      for (i=0; i < data.length; i++) {
        latitudes.push(data[i].latitude);
        longitudes.push(data[i].longitude);
      }
      console.log(latitudes);
      console.log(longitudes);

      var maxLat = _.max(latitudes);
      var minLat = _.min(latitudes);
      var maxLng = _.max(longitudes);
      var minLng = _.min(longitudes);
      var centerLat = (parseFloat(minLat) + parseFloat(maxLat)) / 2;
      var centerLng = (parseFloat(minLng) + parseFloat(maxLng)) / 2;
      console.log(centerLat, centerLng);


      // var maxLat = _.max(latitudes, function(latitude) {
      //  return parseInt(latitude);
      // });
      // console.log(maxLat);

      // var minLat = _.min(latitudes, function(latitude) {
      //  return parseInt(latitude);
      // });
      // console.log(minLat);

      // var maxLng = _.max(longitudes, function(longitude) {
      //  return parseInt(longitude);
      // });

      // var minLng = _.min(longitudes, function(longitude) {
      //  return parseInt(longitude);
      // });

    });
  });




    // function getLocations() {
    //   var x = [];
      // });
        // var locations = [
        //   { latitude: ..., longitude: ..., low_res_img: '', med_res_img: '', hi_res_img: '' },
        //   { latitude: ..., longitude: ..., low_res_img: '', med_res_img: '', hi_res_img: '' },
        //   { latitude: ..., longitude: ..., low_res_img: '', med_res_img: '', hi_res_img: '' },
        //   { latitude: ..., longitude: ..., low_res_img: '', med_res_img: '', hi_res_img: '' }
        // ];

