'use strict';

angular.module('locativeApp')

.controller('ApplicationCtrl', 
  ['$scope', '$rootScope', '$state', '$browser', 'AuthService', 
  function ($scope, $rootScope, $state, $browser, AuthService) {

  AuthService.getSession().success(function(user) {
    $scope.currentUser = user;
  });

  $rootScope.$on('auth:new-sign-up', function(event, user) {
    $scope.currentUser = user;
    $state.go('user', { userId: $scope.currentUser.id });
  });

  $rootScope.$on('auth:sign-in', function(event, user) {
    $scope.currentUser = user;
    $state.go('user', { userId: $scope.currentUser.id });
  });

  $rootScope.$on('auth:sign-out', function(/* event, user */) {
    $scope.currentUser = null;
    $state.go('home');
  });

}]);
