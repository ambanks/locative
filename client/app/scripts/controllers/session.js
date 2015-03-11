'use strict';

angular.module('locativeApp')
.controller('SessionCtrl', function($scope, SessionService) {

  $scope.createSession = function() {
    var returningUser = { email: $scope.returningUserEmail,
                          password: $scope.returningUserPassword };
    console.log(JSON.stringify(returningUser));
    SessionService.createSession(returningUser)
    .success(function() {
      console.log('Success.');
      $scope.returningUserEmail = null;
      $scope.returningUserPassword = null;
    })
    .error(function(data, status) {
      console.log(data);
      alert('SAVE ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.destroySession = function() {
    SessionService.destroySession()
    .success(function() {
      console.log('Success.');
      $scope.returningUserEmail = null;
      $scope.returningUserPassword = null;
    })
    .error(function(data, status) {
      console.log(data);
      alert('SAVE ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

});