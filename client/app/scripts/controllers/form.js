'use strict';

angular.module('locativeApp')
.controller('FormCtrl', 
  ['$scope', '$rootScope', '$state', 'AuthService', 'JourneyService',
  function ($scope, $rootScope, $state, AuthService, JourneyService) {

  $scope.updateJourney = function(journey) {
    return JourneyService.updateJourney(journey)
    .success(function() {

    })
    .error(function(data, status) {
      console.log(data);
      alert('EDIT ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.destroyJourney = function(journey) {
    JourneyService.destroyJourney(journey)
    .success(function() {

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