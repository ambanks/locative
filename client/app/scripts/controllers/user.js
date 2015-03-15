'use strict';

angular.module('locativeApp')
.controller('UserCtrl', function($scope, $state, $stateParams, UserService) {

  function getUsers() {
    UserService.getUsers()
    .success(function(data) {
      $scope.users = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

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

  // $scope.getUserById = function(id) {
  //   UserService.getUserById(id)
  //   .success(function(data) {
  //     console.log(data);
  //     // $scope.user = data;
  //     return data;
  //   })
  //   .error(function(/* data, status, headers, config */) {
  //     alert('GET: error');
  //   });
  // };

  // function getUserById(id) {
  //   UserService.getUserById(id)
  //   .success(function(data) {
  //     $scope.user = data;
  //   })
  //   .error(function(/* data, status, headers, config */) {
  //     alert('GET: error');
  //   });
  // }

  // function getUser(user) {
  //   UserService.getUser(user)
  //   .success(function(data) {
  //     $scope.user = data;
  //   })
  //   .error(function(/* data, status, headers, config */) {
  //     alert('GET: error');
  //   });
  // }

  // getUser($stateParams);


  // $scope.
  //   function (  $scope,   $stateParams,   utils) {
  //     $scope.user = getUser($scope.contacts, $stateParams.contactId);
  //   }]


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
