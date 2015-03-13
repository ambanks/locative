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
