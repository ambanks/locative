'use strict';
/**
 * @ngdoc function
 * @name locativeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the locativeApp
 */
angular.module('locativeApp')
  .controller('MapCtrl', ['$scope', '$http', 'leafletData', '$stateParams', function ($scope, $http, leafletData, $stateParams) {
    angular.extend($scope, {
                markers: [],
                bounds: {},
                center: {},
                layers: {
                  baselayers: {
                    street: {
                      name: 'Streets',
                      type: 'xyz',
                      url: 'https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?secure&access_token=pk.eyJ1IjoiYmVubmV0dGF0b21zIiwiYSI6Ik1Td09jOUkifQ.2_RXTxWsYP_YjQI66y4kkg',
                      layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox © OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
                        continuousWorld: true
                      }
                    },
                    satellite_street: {
                      name: 'Satellite',
                      type: 'xyz',
                      url: 'https://{s}.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?secure&access_token=pk.eyJ1IjoiYmVubmV0dGF0b21zIiwiYSI6Ik1Td09jOUkifQ.2_RXTxWsYP_YjQI66y4kkg',
                      layerOptions: {
                        subdomains: ['a', 'b', 'c'],
                        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox © OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
                        continuousWorld: true
                      }
                    },
                    terrain: {
                      name: 'Run/Bike/Hike',
                      type: 'xyz',
                      url: 'https://{s}.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?secure&access_token=pk.eyJ1IjoiYmVubmV0dGF0b21zIiwiYSI6Ik1Td09jOUkifQ.2_RXTxWsYP_YjQI66y4kkg',
                      layerOptions: {
                        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox © OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
                        continuousWorld: true
                      }
                    },
                    toner: {
                      name: 'Black/White',
                      type: 'xyz',
                      url: 'https://{s}.tiles.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png?secure&access_token=pk.eyJ1IjoiYmVubmV0dGF0b21zIiwiYSI6Ik1Td09jOUkifQ.2_RXTxWsYP_YjQI66y4kkg',
                      layerOptions: {
                        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox © OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
                        continuousWorld: true
                      }
                    },
                    comic: {
                      name: 'ComicBook',
                      type: 'xyz',
                      url: 'https://{s}.tiles.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?secure&access_token=pk.eyJ1IjoiYmVubmV0dGF0b21zIiwiYSI6Ik1Td09jOUkifQ.2_RXTxWsYP_YjQI66y4kkg',
                      layerOptions: {
                        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox © OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
                        continuousWorld: true
                      }
                    }
                  },
                  overlays: {
                    wheatpaste: {
                      name: 'Wheatpaste',
                      type: 'xyz',
                      url: 'https://{s}.tiles.mapbox.com/v4/mapbox.wheatpaste/{z}/{x}/{y}.png?secure&access_token=pk.eyJ1IjoiYmVubmV0dGF0b21zIiwiYSI6Ik1Td09jOUkifQ.2_RXTxWsYP_YjQI66y4kkg',
                      layerOptions: {
                        visible: true,
                        opacity: 0.4, 
                        attribution: '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox © OpenStreetMap</a> | <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>',
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

    $http.get('/api/users/' + $stateParams.userId + '/journeys/' + $stateParams.journeyId + '/posts')
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
      
      var markers = []
      for(i=0;i<posts.length;i++) {
        markers.push(L.marker([parseFloat(posts[i].latitude), parseFloat(posts[i].longitude)]));
      }

      var waypoints = [];
      for(i=0;i<posts.length;i++) {
        waypoints.push(L.latLng(parseFloat(posts[i].latitude), parseFloat(posts[i].longitude)));
      }

      $scope.routeDisplayed = false;

      leafletData.getMap().then(function(map) {
        var itinerary;
        $scope.showRoute = function() {                    
          itinerary = L.Routing.control({ waypoints: waypoints, show: true }).addTo(map);
          $scope.routeDisplayed = true;   
        };

        $scope.hideRoute = function() {                    
          itinerary.removeFrom(map);
          $scope.routeDisplayed = false;  
        };

        for(i=0;i<posts.length;i++) {
          markers[i].bindPopup('<img src="' + posts[i].lowResImg + '">' + posts[i].caption).addTo(map);
        }
      });
    });
  }]);



