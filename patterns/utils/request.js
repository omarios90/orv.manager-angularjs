/**
 * MODULE: utils
 *
 * Description:
 * - on success, response attributes: data, status, headers, config
 * - on error, response attributes: data, status, headers, config
 */
angular
    .module('utils')
    .service('Request', ['$rootScope', '$http',
        function ($rootScope, $http) {

            this.json = function (req, callbackOK, callbackKO, adjustments) {
                req.headers = _.extend(req.headers || {}, {
                    'Content-Type': 'application/json'
                });
                return start(req, callbackOK, callbackKO, adjustments);
            };

            this.urlencoded = function (req, callbackOK, callbackKO, adjustments) {
                req.headers = _.extend(req.headers || {}, {
                    'Content-Type': 'application/x-www-form-urlencoded'
                });
                var data = '';
                _.each(req.data, function (value, key) {
                    data += key + '=' + value + '&'
                });
                req.data = data.substring(0, data.length - 1);
                return start(req, callbackOK, callbackKO, adjustments);
            };

            this.start = this.json;

            function start(req, callbackOK, callbackKO, adjustments) {
                req.url = $rootScope.url + req.url;
                $rootScope.requestCount++;
                return $http(req)
                    .then(function (response) {
                        if (callbackOK) {
                            $rootScope.requestCount--;
                            callbackOK(response);
                        }
                        if (adjustments) setTimeout(adjustments, 50);
                    }, function (response) {
                        if (callbackKO) {
                            $rootScope.requestCount--;
                            callbackKO(response);
                        }
                    });
            }

        }
    ]);