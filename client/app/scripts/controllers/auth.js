'use strict';

angular.module('locativeApp')
.controller('AuthCtrl', 
  ['$scope', '$rootScope', '$state', 'AuthService', 
  function ($scope, $rootScope, $state, AuthService) {
  
  $scope.signUp = function() {
    console.log('AuthCtrl.signUp');
    AuthService.signUp($scope.user)
    .success(function(user) {
      console.log('Rails promised to sign up: ' + JSON.stringify(user));
      $rootScope.$emit('auth:new-sign-up', user);
      $state.go('user', { userId: user.id });
    })
    .error(function(error) {
      alert('Registration Failed: ' + JSON.stringify(error));
    });
  };

  $scope.signIn = function() {
    console.log('AuthCtrl.signIn');
    AuthService.signIn($scope.session)
    .success(function(user) {
      console.log('Rails promised to sign in: ' + JSON.stringify(user));
      $rootScope.$emit('auth:sign-in', user);
      $state.go('user', { userId: user.id });
    })
    .error(function(error) {
      alert('Sign In Failed: ' + JSON.stringify(error));
      $scope.session = {};
    });
  };

}]);
