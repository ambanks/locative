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
                markers: []                            
            });

    var latitudes  = [];
    var longitudes = [];
    var i;
    var posts = [];

    $http.get('/api/users/4/journeys/13/posts')
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

