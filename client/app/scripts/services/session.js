'use strict';

angular.module('locativeApp')
.service('SessionService', function($http) {

  // this.newSession = function() {
  //   return $http.get('/api/ ');
  // };


  this.createSession = function(session) {
    return $http.post('/api/sessions', { session: session } );
  };

  this.destroySession = function() {
    return $http.delete('/api/sessions/');
  };

});