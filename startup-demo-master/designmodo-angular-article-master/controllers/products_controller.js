angular.module('angular-article').controller('ProductsController',
    ['$scope', function ($scope) {


        $scope.products = [
            {
                "fname": 'Gibson',
                "lname": 'Classic',
                "year": 2011,
                "rating": 3,
                "votes": 500
            },
            {
                "fname": 'Gibson',
                "lname": 'Custom Shop',
                "year": 2012,
                "rating": 5,
                "votes": 10000
            }
            ,
            {
                "fname": 'Fender',
                "lname": 'Stratocaster',
                "year": 2012,
                "rating": 4,
                "votes": 1200
            },
            {
                "fname": 'Ibanez',
                "lname": 'Fuzz',
                "year": 2012,
                "rating": 1,
                "votes": 16070
            }
        ];


    }]);
