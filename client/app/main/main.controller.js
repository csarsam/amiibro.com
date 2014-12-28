'use strict';

angular.module('amiiBroApp').controller('MainCtrl', ['$scope', '$location', 'amiiboService', function ($scope, $location, amiiboService) {
  $scope.viewPage = function (amiiboLink) {
    $location.path(amiiboLink);
  };
  $scope.getRows = function (arrLength) {
    var rows = Math.ceil(arrLength / 5);
    var rowList = [];
    for (var i = 0; i < rows; i++) {
      rowList.push(i);
    }
    return rowList;
  };
  amiiboService.getBasic().success(function (amiiboResp) {
    $scope.amiibos = amiiboResp;
  }).error(function (error) {
    console.log(error);
    // TODO Show error.
  });
}]);
