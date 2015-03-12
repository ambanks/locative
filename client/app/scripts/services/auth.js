'use strict';

angular.module('locativeApp')
.service('AuthService', function ($http) {

  var that = this;

  that.currentUser = null;

  that.isAuthenticated = function() {
    return !!that.currentUser;
  };

  that.getSession = function() {
    var deferred = $http.get('/api/sessions');
    deferred.success(function(user) {
      console.log('getSession returned user = ' + JSON.stringify(user));
      that.currentUser = user;
    });
    return deferred;
  };

  that.getSession();

  that.signUp = function(user) {
    console.log('signUp: user = ' + JSON.stringify(user));
    var deferred = $http.post('/api/users', { user: user });
    deferred.success(function(user) {
      that.currentUser = user;
    });
    return deferred;
  };

  that.signIn = function(session) {
    console.log('signIn: session = ' + JSON.stringify(session));
    var deferred = $http.post('/api/sessions', session);
    deferred.success(function(user) {
      that.currentUser = user;
    });
    return deferred;
  };

  that.signOut = function() {
    console.log('signOut');
    var deferred = $http.delete('/api/sessions');
    deferred.success(function() {
      that.currentUser = null;
    });
    return deferred;
  };
});



//   var authService = {};
 
//   authService.login = function (credentials) {
//     return $http
//       .post('/api/sessions', { session: credentials } )
//       .then(function (response) {
//         Session.create(response.data.id);
//         return response.data;
//       });
//   };
 
//   authService.isAuthenticated = function () {
//     return !!Session.userId;
//   };
 
//   authService.isAuthorized = function (authorizedRoles) {
//     if (!angular.isArray(authorizedRoles)) {
//       authorizedRoles = [authorizedRoles];
//     }
//     return (authService.isAuthenticated() &&
//       authorizedRoles.indexOf(Session.userRole) !== -1);
//   };
 
//   authService.logOut = function(){
//     Session.destroy();
//   };

//   return authService;
// });



// {"password_digest":"$2a$10$fGsM82/qnsomh/PK0fZZLefSG8fXnATpMpAuHY.W0m0OSpQyBmqGa","id":3,"name":"Jacob 2","instagram_id":null,"email":"lp@lp.com","remember_token":"3aba857093735da4082683f1d660570b8506578e","created_at":"2015-03-11T17:42:50.027Z","updated_at":"2015-03-11T20:44:56.694Z","instagram_name":null}