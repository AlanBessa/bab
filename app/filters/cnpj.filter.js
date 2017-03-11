(function() {
    'use strict';

    angular.module('bab').filter('cnpj', function() {
        return function(cnpj) {
            if (!cnpj) {
                return '';
            }

            var value = cnpj.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return cnpj;
            }

            var first, second, third, fourth, index;

            // ffssstttffffii -> ff.sss.ttt/ffff-ii
            first = value.slice(0, 2);
            second = value.slice(2, 5);
            third = value.slice(5, 8);
            fourth = value.slice(8, 12);
            index = value.slice(12);

            return (first + "." + second + "." + third + "/" + fourth + "-" + index).trim();
        };
    });
})();