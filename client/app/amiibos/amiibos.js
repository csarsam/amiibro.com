'use strict';

angular.module('amiibolocatorcomApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/amiibos/amiibos.html',
        controller: 'AmiibosCtrl'
      });
  });
