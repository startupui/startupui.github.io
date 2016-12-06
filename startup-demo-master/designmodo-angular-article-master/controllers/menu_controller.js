angular.module('angular-article').controller('MenuController',
    ['$scope', '$routeSegment', function ($scope, $routeSegment) {

        $scope.$routeSegment = $routeSegment;
    }]);
