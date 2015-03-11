// 'use strict';

// angular.module('locativeApp')
// .controller('SessionCtrl', function($scope, $rootScope, AUTH_EVENTS, SessionService) {
//   $scope.createSession = function() {
//     var returningUser = { email: $scope.returningUserEmail,
//                           password: $scope.returningUserPassword };
//     SessionService.createSession(returningUser)
//     .success(function(user) {
//       console.log('Success.');
//       $scope.returningUserEmail = null;
//       $scope.returningUserPassword = null;
//       $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//       $scope.setCurrentUser(user);
//     })
//     .error(function(data, status) {
//       console.log(data);
//       $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//       alert('SAVE ERROR: ' + status + ' : ' + JSON.stringify(data));
//     });
//   };

//   $scope.destroySession = function() {
//     SessionService.destroySession()
//     .success(function() {
//       console.log('Success.');
//       $scope.returningUserEmail = null;
//       $scope.returningUserPassword = null;
//     })
//     .error(function(data, status) {
//       console.log(data);
//       alert('SAVE ERROR: ' + status + ' : ' + JSON.stringify(data));
//     });
//   };  

// });



