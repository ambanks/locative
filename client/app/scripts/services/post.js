'use strict';

angular.module('locativeApp')
.service('PostService', ['$http', function ($http) {

  this.getPosts = function(user, journey) {
    return $http.get('/api/users/' + user.id + '/journeys/' + journey.id + '/posts');
  };

  this.getPost = function(user, journey, post) {
    return $http.get('/api/users/' + user.id + '/journeys/' + journey.id + '/posts/' + post.id);
  };

  this.updatePost = function(user, journey, post) {
    console.log('updatePost: ' + JSON.stringify(post));
    return $http.put('/api/users/' + user.id + '/journeys/' + journey.id + '/posts/' + post.id, { post: post } );
  };

  this.destroyPost = function(user, journey, post) {
    return $http.delete('/api/users/' + user.id + '/journeys/' + journey.id + '/posts/' + post.id);
  };
}]);