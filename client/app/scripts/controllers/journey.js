'use strict';

angular.module('locativeApp')
.controller('JourneyCtrl', ['$scope', 'user', 'journey', 'JourneyService', 'xeditable',
 function ($scope, user, journey, JourneyService, xeditable) {

  function getJourneys(user) {
    JourneyService.getJourneys(user)
    .success(function(data) {
      $scope.user.journeys = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }
  getJourneys();

  $scope.journeysNil = false;
  function noJourneys() {
    if ($scope.user.journeys.length === 0) {
      $scope.journeysNil = true;
    } else {
      $scope.journeysNil = false;
    }
  }

  getJourneys();
  noJourneys();

  $scope.getJourney = function(user, journey) {
    JourneyService.getJourney(user, journey)
    .success(function(data) {
      $scope.user.journey = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  };

  $scope.updateJourney = function(user, journey) {
    return JourneyService.updateJourney(user, journey)
    .success(function() {
      getJourneys();
    })
    .error(function(data, status) {
      console.log(data);
      alert('EDIT ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.destroyJourney = function(user, journey) {
    JourneyService.destroyJourney(user, journey)
    .success(function() {
      getJourneys();
    })
    .error(function(data, status) {
      console.log(data);
      alert('DESTROY ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.isEditing = false;

  function startEditing() {
    $scope.isEditing = true;
  }
  function stopEditing() {
    $scope.isEditing = false;
  }
}]);
