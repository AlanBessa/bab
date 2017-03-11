(function() {
    'use strict';

    angular.module('bab').filter('cpf', function() {
        return function(cpf) {
            if (!cpf) {
                return '';
            }

            var value = cpf.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return cpf;
            }

            var first, second, third, index;

            // fffssstttii -> fff.sss.ttt-ii
            first = value.slice(0, 3);
            second = value.slice(3, 6);
            third = value.slice(6, 9);
            index = value.slice(9);

            return (first + "." + second + "." + third + "-" + index).trim();
        };
    });
})();