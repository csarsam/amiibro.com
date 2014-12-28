'use strict';

angular.module('amiibolocatorcomApp').controller('MainCtrl', ['$scope', 'Location', function ($scope, Location) {
    $scope.zipChange = function () {
    	Location.setZipcode($scope.zipcode);
    };
}]);
