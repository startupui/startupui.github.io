angular.module('angular-article').directive('checkbox', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/directive_templates/checkbox_template.html',
        replace: true,
        scope: {
            value: '@',
            id: '@',
            text: '@',
            checked: '='
        },
        link: function ($scope, element, attrs) {
            $scope.value = attrs.value;
            $scope.id = attrs.id;
            $scope.text = attrs.text;

            $scope.$watch('checked', function (value) {
                if (value)
                {
                    $scope.checked = value;
                    element.children().checkbox('check');
                }

                else $scope.checked = false;
            });

            element.children().on('toggle', function () {
                $scope.$apply(function(){
                    $scope.checked = !$scope.checked;
                });

            });

            element.children().checkbox();
        }
    }
});