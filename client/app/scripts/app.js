'use strict';

/**
 * @ngdoc overview
 * @name locativeApp
 * @description
 * # locativeApp
 *
 * Main module of the application.
 */
angular
  .module('locativeApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'leaflet-directive',
    'xeditable'
  ])
  
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {

    $httpProvider.defaults.withCredentials = true;

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MapCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UserCtrl'
      })
      .state('user', {
        url: 'users/{userId}',
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        resolve:   {
          user: function($http, $stateParams){
              var url = '/api/users/' + $stateParams.userId;
              return $http.get(url)
                  .then(function(res){ return res['user']; });
          }
        }
      })
      .state('user.journeys', {
        url: '/journeys',
        templateUrl: 'partials/user-journeys.html',
        controller: 'JourneyCtrl',
        resolve:   {
          journeys: function($http){
              var url = '/api/users/{userId}/journeys';
              return $http.get(url)
                  .then(function(res){ return res['journeys']; });
          }
        }
      })
      // .state('user.map', {
      //   url: '/map',
      //   templateUrl: 'partials/user-map.html',
      //   controller: 'MapCtrl'
      // })
      // .state('user.journeys', {
      //   url: '/journeys',
      //   templateUrl: 'partials/user-journeys.html',
      //   controller: 'JourneyCtrl'
        // resolve:   {
        //   journeys: function($http){
        //       var url = '/api/users/{userId}/journeys';
        //       return $http.get(url)
        //           .then(function(res){ return res.data; });
        //       console.log('dolphins');  
        //   }
        // }
      // })
      // .state('user.posts', {
      //   url: '/posts',
      //   templateUrl: 'papartials/users-posts.html',
      //   controller: 'PostCtrl'
      // })
      .state('signup', {
        url: '/signup', 
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'AuthCtrl'
      });

      $urlRouterProvider.otherwise('home');
  })
  
  .run(function(editableOptions) {
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });
       
       // views: {
       //    'map': {
       //      templateUrl: 'partials/users-indiv-map.html',
       //      controller: 'MainCtrl'
       //    },
       //    'journeys': {
       //      templateUrl: 'partials/users-indiv-journeys.html',
       //      controller: 'JourneyCtrl'
       //    },
       //    'posts': {
       //      templateUrl: 'partials/users-indiv-posts.html',
       //      controller: 'PostCtrl'
       //    }
       //  }
        // .state('user', {
      //   url: 'users/{userId:[0-9]{1,4}}', 
      //   templateUrl: 'views/user.html',
      //   controller: 'UserCtrl'
      // })
 
        // .state('users.detail.journeys', {
        //       url: '/users/{userId:[0-9][0-9]}', 
        //       templateUrl: 'partials/journey.html',
        //       controller: function($scope){
        //         $scope.things = ["A", "Set", "Of", "Things"];
        //       }
        //   })
  // Groups routing from lunch hub. Provides an example of 
  // conditional onEnter

  // .state('groups', {
  //   url: '/groups',
  //   templateUrl: 'views/groups.html',
  //   controller: 'GroupCtrl',
  //   onEnter: ['$state', 'AuthService', function($state, AuthService) {
  //     if (!AuthService.isAuthenticated()) {
  //       $state.go('home');
  //     }
  //   }]
  // })   

