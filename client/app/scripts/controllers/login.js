'use strict';

angular.module('locativeApp')
.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = { 
    email: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
      console.log(JSON.stringify($scope.currentUser));
      console.log($scope.currentUser['remember_token']);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
  $scope.logout = function() {
    AuthService.logOut();
  };
});



