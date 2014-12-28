'use strict';

angular.module('amiiBroApp').service('amiiboService', ['$http', function ($http) {
  return {
    status: function (statusData) {
      return $http.get('/api/amiibos/status?name=' + statusData.name + '&zip=' + statusData.zip + '&radius=' + statusData.radius);
    },
    identifiers: function () {
      return $http.get('/api/amiibos/identifiers');
    },
    getBasic: function() {
      return $http.get('/api/amiibos');
    },
    byName: function (name) {
      return $http.get('/api/amiibos?name=' + name);
    }
  };
}]);
