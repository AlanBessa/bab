(function() {
    'use strict';

    angular.module('bab').factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = ['$http', '$rootScope', 'SETTINGS'];

    function HomeFactory($http, $rootScope, SETTINGS) {
        return {
            obterPesquisa: obterPesquisa
        };

        function obterPesquisa(urlPaginacao, page, size, optionalParams, callbackSucess, callbackError) {
            if (urlPaginacao === undefined || urlPaginacao === '') {
                return $http.get(SETTINGS.SERVICE_URL + 'search?query=' + optionalParams + '&page=' + page + '&size=' + size)
                    .then(callbackSucess)
                    .catch(callbackError);
            } else {
                return $http.get(urlPaginacao)
                    .then(callbackSucess)
                    .catch(callbackError);
            }
        }
    }
})();