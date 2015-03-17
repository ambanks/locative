'use strict';

angular.module('locativeApp')
.controller('UserCtrl', ['$scope', 'UserService', '$state', '$stateParams', function ($scope, UserService, $state, $stateParams) {

  function getUsers() {
    UserService.getUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  $scope.journeysNil = false;
  
  function getUserById(id) {
    UserService.getUserById(id)
    .success(function(data) {
      console.log(JSON.stringify(data));
      $scope.user = data['user']; 
      $scope.journeys = data['journeys'];
      if ($scope.journeys.length === 0) {
        $scope.journeysNil = true;
      }
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  function getUserJourney(userId, journeyId) {
    UserService.getUserJourney(userId, journeyId)
    .success(function(data) {
      console.log(JSON.stringify(data));
      $scope.journey = data['journey']; 
      $scope.posts = data['posts'];
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  function checkState(stateName) {
    if (stateName === 'user') {
      getUserById($stateParams.userId);
    } else if (stateName === 'user.journey') {
      getUserJourney($stateParams.userId, $stateParams.journeyId);
    } else { 
      getUsers();
    }
  }

  checkState($state.$current.name);

  $scope.logUser = function() {
    console.log($scope.user);
  };

  $scope.logJourneys = function() {
    console.log($scope.journeys);
  };

  console.log($state.$current.name);

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
