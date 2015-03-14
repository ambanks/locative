'use strict';

angular.module('locativeApp')
.controller('UserCtrl', ['$scope', 'UserService' function($scope, UserService) {

  function getUsers() {
    UserService.getUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  getUsers();

  $scope.getUser = function(user) {
    UserService.getUser(user)
    .success(function(data) {
      $scope.user = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  };

  // $scope.getUser();

  $scope.updateUser = function(user) {
    return UserService.updateUser(user)
    .success(function() {
      getUsers();
    })
    .error(function(data, status) {
      console.log(data);
      alert('EDIT ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };


  $scope.addUser = function() {
    var newUser = { name: $scope.newUserName, 
                    email: $scope.newUserEmail,
                    password: $scope.newUserPassword,
                    passwordConfirmation: $scope.newUserPasswordConfirmation,
                    instagramName: $scope.newUserInstagramName };
    console.log(JSON.stringify(newUser));
    UserService.addUser(newUser)
    .success(function() {
      console.log('Success.');
      $scope.newUserName = null; 
      $scope.newUserEmail = null;
      $scope.newUserPassword = null;
      $scope.newUserPasswordConfirmation = null;
      $scope.newUserInstagramName =null;
      // $scope.getUser();
    })
    .error(function(data, status) {
      console.log(data);
      alert('SAVE ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.destroyUser = function(user) {
    UserService.destroyUser(user)
    .success(function() {
      getUsers();
    })
    .error(function(data, status) {
      console.log(data);
      alert('DESTROY ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

}]);
