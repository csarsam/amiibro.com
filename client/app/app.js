'use strict';

angular.module('amiiBroApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMaterial'
]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});