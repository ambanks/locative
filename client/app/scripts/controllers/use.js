'use strict';

angular.module('locativeApp')
.controller('UseCtrl', function($scope, $stateParams, UserService) {

  function getUserById(id) {
    UserService.getUserById(id)
    .success(function(data) {
      console.log(data);
      $scope.user = data; 
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }


  console.log($stateParams.userId);

  getUserById($stateParams.userId);
});

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