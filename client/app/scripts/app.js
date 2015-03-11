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
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'UserCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });   

