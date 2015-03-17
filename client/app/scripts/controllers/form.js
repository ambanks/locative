'use strict';

angular.module('locativeApp')
.controller('FormCtrl', 
  ['$scope', '$rootScope', '$state', 'AuthService', 'JourneyService', 'UserService',
  function ($scope, $rootScope, $state, AuthService, JourneyService, UserService) {

  $scope.logUsers = function(){
    console.log('User: ' + JSON.stringify($scope.user));
    console.log('Current User: ' + JSON.stringify($scope.currentUser));
  };

    console.log('User: ' + JSON.stringify($scope.user));
    console.log('Current User: ' + JSON.stringify($scope.currentUser));

  $scope.isAuthorized = function() {
    var userId = $scope.user.id;
    var currentUserId = $scope.currentUser.id;
    return userId == currentUserId;
  };



  function isAuthorized() {
    var userId = $scope.user.id;
    var currentUserId = $scope.currentUser.id;
    return userId == currentUserId;
    // return $scope.user === $scope.currentUser;
  }

  // function getUserById(id) {
  //   UserService.getUserById(id)
  //   .success(function(data) {
  //     console.log(JSON.stringify(data));
  //     $scope.user = data['user']; 
  //     $scope.journeys = data['journeys'];
  //   })
  //   .error(function(/* data, status, headers, config */) {
  //     alert('GET: error');
  //   });
  // }



  console.log(isAuthorized());

  $scope.updateJourney = function(journey) {
    return JourneyService.updateJourney(journey)
    .success(function() {
      UserService.getUserById($scope.user.id)
      .success(function(data) {
        console.log(JSON.stringify(data));
        $scope.user = data['user']; 
        $scope.journeys = data['journeys'];
      });
    })
    .error(function(data, status) {
      console.log(data);
      alert('EDIT ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.destroyJourney = function(journey) {
    JourneyService.destroyJourney(journey)
    .success(function() {
      UserService.getUserById($scope.user.id)
      .success(function(data) {
        console.log(JSON.stringify(data));
        $scope.user = data['user']; 
        $scope.journeys = data['journeys'];
      });
    })
    .error(function(data, status) {
      console.log(data);
      alert('DESTROY ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };



  // $scope.updateUser = function(user) {
  //   return UserService.updateUser(user)
  //   .success(function() {
  //     getUsers();
  //   })
  //   .error(function(data, status) {
  //     console.log(data);
  //     alert('EDIT ERROR: ' + status + ' : ' + JSON.stringify(data));
  //   });
  // };

}]);