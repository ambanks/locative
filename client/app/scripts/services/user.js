'use strict';

angular.module('locativeApp')
.service('UserService', function($http) {

  this.getUsers = function() {
    return $http.get('/api/users');
  };

  this.getUserById = function(id) {
    return $http.get('/api/users/' + id);
  };

  this.getUserJourney = function(userId, journeyId) {
    return $http.get('api/users/' + userId + '/journeys/' + journeyId);
  };


  this.getUserJourneys = function(user) {
    return $http.get('api/users/' + user.id + '/journeys');
  };

  this.getUser = function(user) {
    return $http.get('/api/users/' + user.id);
  };

  this.updateUser = function(user) {
    console.log('updateUser: ' + JSON.stringify(user));
    return $http.put('/api/users/' + user.id, { user: user } );
  };

  // functionality moved to AuthService
  // this.addUser = function(user) {
  //   return $http.post('/api/users', { user: user } );
  // };

  this.destroyUser = function(user) {
    return $http.delete('/api/users/' + user.id);
  };

});