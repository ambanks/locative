'use strict';

angular.module('locativeApp')
.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = { 
    email: '',
    password: ''
  };
  $scope.currentUser = null;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);

      console.log(JSON.stringify($scope.currentUser));

    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
  $scope.logout = function() {
    AuthService.logOut();
  };
});



