'use strict';

angular.module('locativeApp')
.controller('UserCtrl', function($scope, UserService, $state, $stateParams, JourneyService) {

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

  function getUserById(id) {
    UserService.getUserById(id)
    .success(function(data) {
      console.log(JSON.stringify(data));
      $scope.user = data['user'];
      $scope.journeys = data['journeys'];
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }
  console.log($stateParams.userId);
  getUserById($stateParams.userId);

  function getUserJourneys(id) {
    JourneyService.getJourneys(id)
    .success(function(data) {
      $scope.user.journeys = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  function checkState(stateName) {
    if (stateName === 'user') {
      getUserById($stateParams.userId);
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
  // getUserJourneys($stateParams.userId);

  $scope.getUser = function(user) {
    UserService.getUser(user)
    .success(function(data) {
      $scope.user = data;
      console.log(data);
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

});
