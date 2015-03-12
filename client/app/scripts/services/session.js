//No longer needed

// 'use strict';

// angular.module('locativeApp')
// .service('Session', function ($http) {
//   this.create = function (sessionId, userId) {
//     this.id = sessionId;
//     this.userId = userId;
//   };
//   this.destroy = function () {
//     this.id = null;
//     this.userId = null;
//     return $http.delete('/api/sessions/');
//   };
// });



// // 'use strict';

// // angular.module('locativeApp')
// // .service('SessionService', function($http) {

// //   // this.newSession = function() {
// //   //   return $http.get('/api/ ');
// //   // };

// //   this.createSession = function(session) {
// //     return $http.post('/api/sessions', { session: session } )
// //     .then(function (res) {
// //         Session.create(res.data.id, res.data.user.id,
// //                        res.data.user.role);
// //   };

// //   this.destroySession = function() {
// //     return $http.delete('/api/sessions/');
// //   };

// // });