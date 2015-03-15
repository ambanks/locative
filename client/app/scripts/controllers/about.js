'use strict';

/**
 * @ngdoc function
 * @name locativeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the locativeApp
 */

angular.module('locativeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

// parallax

$(document).ready(function() {
  if ($('#js-parallax-window').length) {
    parallax();
  }
});

$(window).scroll(function(e) {
  if ($('#js-parallax-window').length) {
    parallax();
  }
});

function parallax(){
  if( $('#js-parallax-window').length > 0 ) {
    var plxBackground = $('#js-parallax-background');
    var plxWindow = $('#js-parallax-window');

    var plxWindowTopToPageTop = $(plxWindow).offset().top;
    var windowTopToPageTop = $(window).scrollTop();
    var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

    var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
    var windowInnerHeight = window.innerHeight;
    var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
    var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
    var plxSpeed = 0.35;

    plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
  }
 }


// FADE-IN BOX
$(document).ready(function() {
  var element = document.getElementById('js-fadeInElement');
  $(element).addClass('js-fade-element-hide');

  $(window).scroll(function() {
    if( $('#js-fadeInElement').length > 0 ) {
      var element = document.getElementById('js-fadeInElement');
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('js-fade-element-show');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('js-fade-element-show');
        $(element).addClass('js-fade-element-hide');
      }
    }
  });
});