'use strict';

angular.module('locativeApp')

.controller('SliderCtrl', ['$scope', 'PostService', function ($scope, PostService) {
  
  $scope.slides = [];
  $scope.posts = [];
  function getImagesforSlider(user, journey) {
    PostService.getPosts(user, journey)
    .success(function(data) {
      $scope.posts = data;
      angular.forEach($scope.posts, function(post) {
        $scope.slides.push({image: post['low_res_img'], description: post['caption']});
      });
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  $scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function (index) {
      $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function (index) {
      return $scope.currentIndex === index;
  };

  $scope.prevSlide = function () {
      $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function () {
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
}])
.animation('.slide-animation', ['TweenMax', function (TweenMax) {
  return {
    addClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });            
      }
      else {
          done();
      }
    },
    removeClass: function (element, className, done) {
      if (className === 'ng-hide') {
        element.removeClass('ng-hide');

        TweenMax.set(element, { left: element.parent().width() });
        TweenMax.to(element, 0.5, {left: 0, onComplete: done });
      }
      else {
          done();
      }
    }
  };
}]);
