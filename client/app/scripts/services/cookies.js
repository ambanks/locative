'use strict';

angular.module('locativeApp')
.service('CookieService', ['$cookies', function($cookies) {
  this.setCookie = function(cookie){
    $cookies.put('_locative_session', cookie);
  };
  // var favoriteCookie = $cookies.get('myFavorite');
  // // Setting a cookie
  // $cookies.put('myFavorite', 'oatmeal');
}]);


// angular.module('locativeApp')
// .service('CookieService', ['$cookies', function($cookies) {
//   CookieService.setCookie = function(cookie){
//     $cookies.put('_locative_session', cookie);
//   };
//   var favoriteCookie = $cookies.get('myFavorite');
//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal');
// }]);