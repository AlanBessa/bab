(function() {
    'use strict';

    angular.module('bab').filter('cep', function() {
        return function(cep) {
            if (!cep) {
                return '';
            }

            var value = cep.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return cep;
            }

            var number;

            // #####-###
            number = value.slice(0, 5) + '-' + value.slice(5);

            return number.trim();
        };
    });
})();