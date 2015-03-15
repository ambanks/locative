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
    'leaflet-directive'

  ])
  
.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {

  $httpProvider.defaults.withCredentials = true;

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
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
    // .state('users.detail', {
    //   url: '/{userId:[0-9]{1,4}}', 
    //   templateUrl: 'views/users.detail.html', 
    //   controller: 'UserCtrl'
    // })
    .state('user', {
      url: 'users/{userId:[1-9]{1,4}}',
      templateUrl: 'views/user.html',
      controller: 'UserCtrl',
      resolve:   {
        user: function($http, $stateParams){
            var url = '/api/users/' + $stateParams.userId;
            return $http.get(url)
                .then(function(response){ return response['user']; });
                // .then(function(res){ return res.data; });
        }
      }
    })
    .state('user.journey', {
      url: '/journeys/{journeyId:[1-9]{1,4}}',
      templateUrl: 'views/user.journey.html',
      controller: 'UserCtrl',
      resolve: {
        journey: function($http, $stateParams){
          var url = 'api/users/' + $stateParams.userId + '/journeys/' + $stateParams.journeyId;
          return $http.get(url)
            .then(function(response){ return response['journey']; });
        }
      }
    })




    // .state('users.detail.journeys.', {
    //   url: '/{userId:[0-9]{1,4}}', 
    //   templateUrl: 'views/users.detail.html', 
    //   controller: 'UseCtrl'


      // function($scope, $stateParams) {
      //       $scope.user = $scope.getUserById($stateParams.userId);
      //   } 




        // function ($scope, $stateParams) {
        //   $scope.user = UserCtrl.getUserById($stateParams.usedId);
        // }
      



      // views:
      //   '': {
      //     templateUrl: 'views/user.html',
      //     controller: ['$scope', '$stateParams', 'utils',

      //       function (  $scope,   $stateParams,   utils) {
      //         $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
      //       }]
      //   },



    
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
  });


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

