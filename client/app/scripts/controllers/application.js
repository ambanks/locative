'use strict';

angular.module('locativeApp')
.controller('ApplicationController', function ($scope) {
 $scope.currentUser = null;
 // $scope.isAuthorized = AuthService.isAuthorized;
 $scope.setCurrentUser = function (user) {
   $scope.currentUser = user;
 };
});