/**
 * MODULE: utils
 *
 * Description:
 * Service to set, get or remove cookies
 */
angular
    .module('utils')
    .service('Cookie', function () {
        this.set = function (cname, cvalue, exdays) {
            exdays = exdays === undefined ? 365 : exdays;
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + d.toUTCString();
            var path = '; path=/;';
            document.cookie = cname + '=' + cvalue + expires + path;
        };
        this.get = function (cname) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
            return '';
        };
        this.remove = function (cname) {
            document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';
        };
        this.removeAll = function () {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
            }
        };
    });