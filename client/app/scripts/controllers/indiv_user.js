'use strict';

angular.module('locativeApp')
.controller('IndivUserCtrl', ['$scope', '$UserService, $stateParams', function($scope, UserService, $stateParams) {
  
  function getUserById(id) {
    UserService.getUserById(id)
    .success(function(data) {
      console.log('party all the time');
      $scope.user = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }
  console.log($stateParams.userId);
  getUserById($stateParams.userId);
}]);