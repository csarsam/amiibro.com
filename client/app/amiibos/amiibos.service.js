'use strict';

angular.module('amiibolocatorcomApp')
  .service('Amiibos', function ($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var amiibos = undefined;

    return {
        /**
         * Retrieve all amiibos
         */
         getAmiibos: function () {
            var deferred = $q.defer();
            if (amiibos) {
                deferred.resolve(amiibos);
            }
            else {
                $http.get('/api/amiibos/images')
                .success(function(data) {
                    amiibos = data[0];
                    deferred.resolve(amiibos);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
         },

         getAmiiboByKey: function (key) {
          var deferred = $q.defer();

          if (amiibos) {
            amiibos.forEach(function(amiibo) {
              if (amiibo.key == key) {
                deferred.resolve(amiibo);
              }
            });
          }
          else {
            this.getAmiibos().then(function() {
              amiibos.forEach(function(amiibo) {
                if (amiibo.key == key) {
                  deferred.resolve(amiibo);
                }
              });
            });
          }

          return deferred.promise;
         }
    }
  });
