/**
 * MODULE: utils
 *
 * Description:
 * This service is called at the beginning of the app
 */
angular
    .module('utils')
    .service('Base', ['$rootScope', '$state', '$stateParams', '$location', '$sce', 'Post', 'Cookie',
        function ($rootScope, $state, $stateParams, $location, $sce, Post, Cookie) {

            this.init = function () {

                $rootScope.relativePath = '';
                $rootScope.url = 'http://' + $location.host();

                $rootScope.modalErrorMessages = {
                    load: {
                        title: 'Error del servidor',
                        message: 'Ha ocurrido un error al intentar cargar los datos.' +
                        'Por favor, contacte con el administrador de la página.'
                    },
                    action: {
                        title: 'Error del servidor',
                        message: 'No se ha podido terminar la petición.' +
                        'Por favor, contacte con el administrador de la página.'
                    }
                };

                $rootScope.queryString = function (name) {
                    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                        results = regex.exec(location.search);
                    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
                };

                $rootScope.reload = function () {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                };

                $rootScope.bindHtml = function (html) {
                    return $sce.trustAsHtml(html);
                };

            }

        }
    ]);