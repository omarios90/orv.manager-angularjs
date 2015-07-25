angular
    .module('##moduleDirectives')
    .directive('##name', function() {

        return {
            templateUrl: '##name.html',
            compile: function(element, attr) {

                return {
                    pre: function(scope, element, attr, controller) {}
                    post: function(scope, element, attr, controller) {}
                }

            },
            controller: ['$rootScope', '$scope',
                function($rootScope, $scope) {

                    // When all the templates are loaded
                    $scope.$on('$includeContentLoaded', function() {

                    });

                }
            ]

        };

    });