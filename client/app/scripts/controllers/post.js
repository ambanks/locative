'use strict';

angular.module('locativeApp')

.controller('PostCtrl', ['$scope', 'PostService', 'xeditable', function ($scope, PostService, xeditable) {

  function getPosts(user, journey) {
    PostService.getPosts(user, journey)
    .success(function(data) {
      $scope.posts = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  // getPosts();

  $scope.getPost = function(user, journey, post) {
    PostService.getPost(user, journey, post)
    .success(function(data) {
      $scope.post = data;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  };

  $scope.updatePost = function(user, journey, post) {
    return PostService.updatePost(user, journey, post)
    .success(function() {
      getPosts();
    })
    .error(function(data, status) {
      console.log(data);
      alert('EDIT ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };

  $scope.destroyPost = function(user, journey, post) {
    PostService.destroyPost(user, journey, post)
    .success(function() {
      getPosts();
    })
    .error(function(data, status) {
      console.log(data);
      alert('DESTROY ERROR: ' + status + ' : ' + JSON.stringify(data));
    });
  };
}]);
