'use strict';

angular.module('locativeApp')
.controller('AuthCtrl', function ($scope, $rootScope, $state, AuthService) {
  
  $scope.signUp = function() {
    console.log('AuthCtrl.signUp');
    AuthService.signUp($scope.user)
    .success(function(user) {
      console.log('Rails promised to sign up: ' + JSON.stringify(user));
      $rootScope.$emit('auth:new-sign-up', user);
      $state.go('home');
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
      $state.go('home');
    })
    .error(function(error) {
      alert('Sign In Failed: ' + JSON.stringify(error));
      $scope.session = {};
    });
  };

});





//Use AuthEvents?

// angular.module('locativeApp')
// .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
//   $scope.credentials = { 
//     email: '',
//     password: ''
//   };
//   $scope.login = function (credentials) {
//     AuthService.login(credentials).then(function (user) {
//       $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//       $scope.setCurrentUser(user);
//       console.log(JSON.stringify($scope.currentUser));
//       console.log($scope.currentUser['remember_token']);
//     }, function () {
//       $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//     });
//   };
//   $scope.logout = function() {
//     AuthService.logOut();
//   };
// });
