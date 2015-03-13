'use strict';

/**
 * @ngdoc function
 * @name locativeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the locativeApp
 */

angular.module('locativeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
