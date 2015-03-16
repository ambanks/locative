'use strict';

angular.module('locativeApp')
.service('JourneyService', function($http) {

  this.getJourneys = function(user) {
    return $http.get('/api/users/' + user.id + '/journeys');
  };

  this.getJourney = function(user, journey) {
    return $http.get('/api/users/' + user.id + '/journeys/' + journey.id);
  };

  this.updateJourney = function(journey) {
    console.log('updateJourney: ' + JSON.stringify(journey));
    return $http.put('/api/users/' + journey['user_id']+ '/journeys/' + journey.id, { journey: journey } );
  };

  this.destroyJourney = function(journey) {
    return $http.delete('/api/users/' + journey['user_id'] + '/journeys/' + journey.id, { journey: journey });
  };
});