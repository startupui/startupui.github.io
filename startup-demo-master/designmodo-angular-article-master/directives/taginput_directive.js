angular.module('angular-article').directive('taginput', function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/directive_templates/taginput_template.html',
        replace: true,
        scope: {
            tags: '=',
            name: '@',
            id: '@'
        },
        link: function($scope, element, attrs){
            $scope.name = attrs.name;
            $scope.id = attrs.id;

            $scope.$watch('tags', function (value) {
                $scope.values = value;
                element.importTags(value.toString());

            });

            element.tagsInput({
                onAddTag: function(value){
                    $scope.values.push(value);
                    $scope.$apply(function(){
                        $scope.tags = $scope.values;
                    });
                }
            });

        },
        controller: function($scope){
        }
    }

});

