(function() {
    'use strict';

    angular.module('bab').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$location', '$exceptionHandler', 'toastr', 'HomeFactory', 'PaginacaoFactory'];

    function HomeController($scope, $rootScope, $location, $exceptionHandler, toastr, HomeFactory, PaginacaoFactory) {

        //Variaveis
        /* jshint validthis:true */
        var vm = this;
        vm.palavraChave = '';

        vm.maxSize = 10;
        vm.bigTotalItems = '';
        vm.bigCurrentPage = '';

        vm.listaDoResultadoDePesquisa = [];
        vm.paginas = [];

        $rootScope.estaCarregando = false;

        //Chamada de metodos
        vm.buscar = buscar;

        vm.pagina = pagina;

        activate();

        //Construtor
        function activate() {
            //funcaoTeste();
        }

        //Metodos       
        function buscar() {
            if (vm.palavraChave === '' || vm.palavraChave === undefined) return;

            $rootScope.estaCarregando = true;

            vm.params = vm.palavraChave;

            PaginacaoFactory.carregarListaPaginada(HomeFactory.obterPesquisa, 10, vm.params, function(response) {
                carregarRetornoDeBusca(response);
            }, function(error) {
                $rootScope.estaCarregando = false;

                if (error.status !== 404) {
                    $exceptionHandler(error, "Falha na Requisição");
                } else {
                    angular.element(document.querySelector('#menuTopo')).addClass("transicao");
                    angular.element(document.querySelector('#busca')).addClass("transicao");
                    angular.element(document.querySelector('#lista')).addClass("transicao");
                }
            });
        }

        function carregarRetornoDeBusca(response) {
            $rootScope.estaCarregando = false;

            vm.listaDoResultadoDePesquisa = response.elementos;

            vm.bigTotalItems = response.totalElementos;
            vm.bigCurrentPage = response.numeroDaPagina;

            angular.element(document.querySelector('#menuTopo')).addClass("transicao");
            angular.element(document.querySelector('#busca')).addClass("transicao");
            angular.element(document.querySelector('#lista')).addClass("transicao");

            carregarNumeroPaginas();
        }

        //Funções de Paginação
        function carregarNumeroPaginas() {
            vm.paginas = PaginacaoFactory.carregarNumeroPaginas();
        }

        function pagina(pagina) {
            PaginacaoFactory.carregarPaginaAtual('', pagina, vm.params, function(paginaAtual) {
                carregarRetornoDeBusca(paginaAtual);
            });
        }
    }
})();