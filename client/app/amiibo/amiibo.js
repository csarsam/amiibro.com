'use strict';

angular.module('amiibolocatorcomApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amiibo/:amiibo', {
        templateUrl: 'app/amiibo/amiibo.html',
        controller: 'AmiiboCtrl'
      });
  });
