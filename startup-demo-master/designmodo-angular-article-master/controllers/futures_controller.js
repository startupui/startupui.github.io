angular.module('angular-article').controller('FuturesController',
    ['$scope','$location', function ($scope, $location) {
            $scope.$location = $location;
    }]);

