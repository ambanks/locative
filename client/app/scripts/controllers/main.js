'use strict';
/**
 * @ngdoc function
 * @name locativeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the locativeApp
 */
angular.module('locativeApp')
  .controller('MainCtrl', function ($scope, $http, leafletData) {

    angular.extend($scope, {
                markers: [],
                bounds: {},
                center: {},
                layers: {
                  baselayers: {
                    osm: {
                      name: 'StreetMap',
                      type: 'xyz',
                      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                      layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '&copy; <a href="http://osm.org/copyright" target="_blank">OpenStreetMap</a> contributors',
                        continuousWorld: true
                      }
                    },
                    cycle: {
                      name: 'Satellite',
                      type: 'xyz',
                      url: 'http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
                      layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.creativecommons/content/osm/mq_logo.png"',
                        continuousWorld: true
                      }
                    },
                    toner: {
                      name: 'Toner',
                      type: 'xyz',
                      url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
                      layerOptions: {
                        attribution: 'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright" target="_blank">ODbL</a>.',
                        continuousWorld: true
                      }
                    },
                    terrain: {
                      name: 'Terrain',
                      type: 'xyz',
                      url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png',
                      layerOptions: {
                        attribution: 'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC BY SA</a>.',
                        continuousWorld: true
                      }
                    }
                  },
                  overlays: {
                    watercolor: {
                      name: 'Watercolor',
                      type: 'xyz',
                      url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
                      layerOptions: {
                        visible: true,
                        opacity: 0.5, 
                        attribution: 'Map tiles by <a href="http://stamen.com" target="_blank">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC BY SA</a>.',
                        continuousWorld: true
                      }
                    }
                  }
                }                           
            });



    var latitudes  = [];
    var longitudes = [];
    var i;
    var posts = [];

    $http.get('/api/users/1/journeys/16/posts')
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
      // var centerLat = (parseFloat(minLat) + parseFloat(maxLat)) / 2;
      // var centerLng = (parseFloat(minLng) + parseFloat(maxLng)) / 2;

      $scope.bounds = {
        southWest: {
            lat: (parseFloat(minLat)), 
            lng: (parseFloat(minLng))
        },
        northEast: {
            lat: (parseFloat(maxLat)),
            lng: (parseFloat(maxLng))
        }
      };
      // $scope.addMarkers = function() {
      //   $scope.markers = [];
      //   var loopResult = [];
      //   angular.forEach(posts, function(post) {
      //     loopResult.push( 
      //       { lat: parseFloat(post.latitude),
      //         lng: parseFloat(post.longitude),
      //         message: post.caption
      //     });
      //   });

      //   for (i=0;i<loopResult.length;i++) {
      //     $scope.markers.push({
      //       lat: loopResult[i].lat,
      //       lng: loopResult[i].lng,
      //       message: loopResult[i].message
      //     });
      //   }
      // };
      // $scope.addMarkers();
      
      var markers = [];
      for(i=0;i<posts.length;i++) {
        markers.push(L.marker([parseFloat(posts[i].latitude), parseFloat(posts[i].longitude)]));
      }

      var waypoints = [];
      for(i=0;i<posts.length;i++) {
        waypoints.push(L.latLng(parseFloat(posts[i].latitude), parseFloat(posts[i].longitude)));
      }

      leafletData.getMap().then(function(map) {
        L.Routing.control({
          waypoints: waypoints,
          show: false,
        }).addTo(map);

        for(i=0;i<posts.length;i++) {
        markers[i].bindPopup('<img src="' + posts[i].lowResImg + '">').addTo(map);
        }
      });
    });
  });

