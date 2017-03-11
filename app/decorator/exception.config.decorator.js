(function() {
    'use strict';

    angular.module('bab').config(exceptionConfig);

    exceptionConfig.$inject = ['$provide'];

    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', '$injector', 'toastr'];

    function extendExceptionHandler($delegate, $injector, toastr) {
        return function(exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            //var $rootScope = $injector.get('$rootScope');
            //$rootScope.errors.push(exception.message);
            //console.log($rootScope.errors);
            /**
             * Pode adicionar o erro para um serviço de coleções,
             * adicionar os erros no $rootScope, logar os erros em um servidor remoto
             * ou logar localmente. Ou lançar a exceção. Isso cabe interiamente à você.
             * throw exception;
             */

            if (exception.message === undefined) {
                toastr.error(exception.data.message, errorData.cause);
            } else {
                toastr.error("Erro: " + exception.message, errorData.cause);
            }
        };
    }
})();