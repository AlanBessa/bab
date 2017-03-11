(function() {
    'use strict';

    angular.module('bab').filter('tel', function() {
        return function(tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var city, number;

            switch (value.length) {
                case 10: // PP######## -> (PP) ####-####
                    city = value.slice(0, 2);
                    number = value.slice(2);
                    number = number.slice(0, 4) + '-' + number.slice(4);
                    break;

                case 11: // +PP######### -> (PP) #####-####
                    city = value.slice(0, 2);
                    number = value.slice(2);
                    number = number.slice(0, 5) + '-' + number.slice(5);
                    break;

                default:
                    return tel;
            }

            return ("(" + city + ") " + number).trim();
        };
    });
})();