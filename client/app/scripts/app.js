'use strict';

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
    'xeditable',
    'angular-carousel'
  ])
    
.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', 
  function ($httpProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://scontent.cdninstagram.com/**',
      'http://scontent.cdninstagram.com/**'
    ]);

    $httpProvider.defaults.withCredentials = true;

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
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
                .then(function(response){ return response['user']; });
        }
      }
    })
    .state('user.journey', {
      url: '/journeys/{journeyId}',
      templateUrl: 'partials/user-journeys.html',
      controller: 'UserCtrl',
      resolve: {
        journey: function($http, $stateParams){
          var url = 'api/users/' + $stateParams.userId + '/journeys/' + $stateParams.journeyId;
          return $http.get(url)
            .then(function(response){ return response['journeys']; });
        }
      }
    })
    // .state('user.journey.posts', {
    //   url: '/journeys/{journeyId}/posts',
    //   templateUrl: 'partials/user-posts.html',
    //   controller: 'PostCtrl'
    // })

    // .state('user.journey.map', {
    //   url: '/journeys/{journeyId}/map',
    //   templateUrl: 'partials/user-map.html',
    //   controller: 'MapCtrl'
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
  }])
     
  .run(function(editableOptions) {
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
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
