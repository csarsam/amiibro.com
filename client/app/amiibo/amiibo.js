'use strict';

angular.module('amiiBroApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/amiibo/:amiibo', {
        templateUrl: 'app/amiibo/amiibo.html',
        controller: 'AmiiboCtrl'
      });
  });
