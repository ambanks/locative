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
                markers: [],
                bounds: {},
                center: {}                           
            });

    var latitudes  = [];
    var longitudes = [];
    var i;
    var posts = [];

    $http.get('/api/users/3/journeys/11/posts')
    .success(function(data) {
      for (i=0; i < data.length; i++) {
        var postData = {
        caption:     data[i].caption, 
        latitude:    data[i].latitude, 
        longitude:   data[i].longitude,
        timeStamp:   data[i].time_stamp,
        journeyId:   data[i].journey_id,
        tags:        data[i].tags,
        createdAt:   data[i].created_at,
        updatedAt:   data[i].updated_at,
        lowResImg:   data[i].low_res_img, 
        medResImg:   data[i].med_res_img, 
        hiResImg:    data[i].hi_res_img, 
        instagramId: data[i].instagram_id 
        };

        posts.push(postData);
        latitudes.push(postData.latitude);
        longitudes.push(postData.longitude);
      }

      var maxLat = _.max(latitudes);
      var minLat = _.min(latitudes);
      var maxLng = _.max(longitudes);
      var minLng = _.min(longitudes);
      var centerLat = (parseFloat(minLat) + parseFloat(maxLat)) / 2;
      var centerLng = (parseFloat(minLng) + parseFloat(maxLng)) / 2;

      $scope.bounds = {
        southWest: {
            lat: (parseFloat(minLat)), 
            lng: (parseFloat(minLng))
        },
        northEast: {
            lat: (parseFloat(maxLat)),
            lng: (parseFloat(maxLng))
        }
      }
      $scope.addMarkers = function() {
        $scope.markers = [];
        var loopResult = [];
        angular.forEach(posts, function(post) {
          loopResult.push( 
            { lat: parseFloat(post.latitude),
              lng: parseFloat(post.longitude),
              message: post.caption 
          });
        });

        for (i=0;i<loopResult.length;i++) {
          $scope.markers.push({
            lat: loopResult[i].lat,
            lng: loopResult[i].lng,
            message: loopResult[i].message
          })
        }
      };
      $scope.addMarkers();

    });
  });

