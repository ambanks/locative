'use strict';

angular.module('locativeApp')

.controller('CarouselCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.myInterval = 4000;
  $scope.posts = function(user, journey) {
    return $http.get('/api/users/' + user.id + '/journeys/' + journey.id + '/posts/');
  };

  $scope.slides = [];

  angular.forEach($scope.posts, function(post) {
    $scope.slides.push({image: post['low_res_img'], description: post['caption']});
  });

  // var slides = $scope.slides = [];
  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length + 1;
  //   slides.push({
  //     image: 'http://placekitten.com/' + newWidth + '/300',
  //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
  //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
  //   });
  // };
  // for (var i=0; i<posts.length; i++) {
  //   $scope.addSlide();
  // }
}]);
