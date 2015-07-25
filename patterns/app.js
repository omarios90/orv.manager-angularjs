/**
 * MODULE: ##module
 * Main module configuration file
 */
angular
    .module('##moduleApp', [
    	'##moduleHtml',
        '##moduleTemplates',
        'ui.router',
        'utils',
        '##moduleDirectives',
        '##moduleControllers',
        '##moduleServices',
        'baseDirectives',
        'baseControllers',
        'baseServices'
    ])
    .config(['$urlRouterProvider', '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                /*DONT_ERASE*/;

        }])
    .run(['$rootScope', '$state', '$location', 'Base',
        function ($rootScope, $state, $location, Base) {

            Base.init();

            $rootScope.$on('$stateChangeSuccess', function (event) {
                //var name = $state.current.name;
            });

        }
    ]);