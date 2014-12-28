'use strict';

angular.module('amiibolocatorcomApp').controller('AmiibosCtrl', ['$scope', 'Amiibos', function ($scope, Amiibos) {
    $scope.amiibos = {};

    Amiibos.getAmiibos().then(function (amiibos) {
        $scope.amiibos = amiibos;
    });
}]);
