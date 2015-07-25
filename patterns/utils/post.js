/**
 * MODULE: utils
 *
 * Description:
 * - on success parameters: data, status, headers, config
 * - on error parameters: data, status, headers, config
 */
angular
    .module('utils')
    .service('Post', ['$rootScope', '$http',
        function ($rootScope, $http) {

            this.withConfig = function (req, callbackOK, callbackKO, adjustments) {
                req.headers = _.extend(req.headers || {}, {
                    'Content-Type': 'application/json'
                });
                $http(req)
                    .success(function (data, status, headers, config) {
                        if (callbackOK) callbackOK(data, status, headers, config);
                        if (adjustments) setTimeout(adjustments, 50);
                    })
                    .error(function(data, status, headers, config) {
                        if (callbackKO) callbackKO(data, status, headers, config);
                    });
            }

        }]);