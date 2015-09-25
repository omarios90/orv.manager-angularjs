angular
    .module('utils')
    .service('Storage', function () {

        this.set = function (name, data) {
            window.localStorage[name] = JSON.stringify(data);
        };

        this.get = function (name) {
            return JSON.parse(window.localStorage[name] || '{}');
        };

        this.remove = function (name) {
            delete window.localStorage[name];
        };

    });