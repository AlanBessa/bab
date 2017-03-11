(function() {
    'use strict';

    angular.module('bab').factory('PaginacaoFactory', PaginacaoFactory);

    PaginacaoFactory.$inject = ['SETTINGS'];

    function PaginacaoFactory(SETTINGS) {

        var _funcaoDeBusca = '';
        var _paginaAtual = '';
        var _pagina = '';
        var _numRegistrosPagina = '';

        return {
            carregarListaPaginada: carregarListaPaginada,
            carregarNumeroPaginas: carregarNumeroPaginas,
            carregarPaginaAtual: carregarPaginaAtual,
            anterior: anterior,
            primeira: primeira,
            proxima: proxima,
            ultima: ultima
        };

        function carregarListaPaginada(funcaoDeBusca, numRegistrosPagina, optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro) {
            _funcaoDeBusca = funcaoDeBusca;
            _pagina = 1;
            _numRegistrosPagina = numRegistrosPagina;
            inicializarPaginaAtual();
            carregarPaginaAtual('', _pagina, optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro);
        }

        function carregarNumeroPaginas() {
            var paginas = [];
            for (var i = 0; i < _paginaAtual.totalPaginas; i++) {
                paginas.push(i);
            }

            return paginas;
        }

        function carregarPaginaAtual(url, numeroPagina, optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro) {
            _funcaoDeBusca.call(1, url, numeroPagina, _numRegistrosPagina, optionalParamsString,
                function(response) {
                    _paginaAtual.numeroDaPagina = response.data.page.page;
                    _paginaAtual.totalElementos = response.data.page.totalElements;
                    _paginaAtual.totalPaginas = response.data.page.totalPages;
                    _paginaAtual.elementos = response.data.result;

                    funcaoDeRetornoDeSucesso.call(1, _paginaAtual);
                },
                function(error) {
                    funcaoReRetornoDeErro.call(1, error);
                });
        }

        function formatarUrlPaginacao(palavraChave, pagina, tamanho) {
            return SETTINGS.SERVICE_URL + 'search?query=' + palavraChave + '&page=' + pagina + '&size=' + tamanho;
        }

        function inicializarPaginaAtual() {
            if (_paginaAtual === undefined || _paginaAtual === '') {
                _paginaAtual = {
                    primeira: '',
                    ultima: '',
                    anterior: '',
                    proxima: '',
                    numeroDaPagina: '',
                    totalElementos: '',
                    totalPaginas: '',
                    elementos: []
                };
            }
        }

        function anterior(optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro) {
            if (_paginaAtual.numeroDaPagina > 0) {
                carregarPaginaAtual(_paginaAtual.anterior, '', optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro);
            }
        }

        function primeira(optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro) {
            if (_paginaAtual.numeroDaPagina > 0) {
                carregarPaginaAtual(_paginaAtual.primeira, '', optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro);
            }
        }

        function proxima(optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro) {
            if (_paginaAtual.numeroDaPagina < _paginaAtual.totalPaginas - 1) {
                carregarPaginaAtual(_paginaAtual.proxima, '', optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro);
            }
        }

        function ultima(optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro) {
            if (_paginaAtual.numeroDaPagina < _paginaAtual.totalPaginas - 1) {
                carregarPaginaAtual(_paginaAtual.ultima, '', optionalParamsString, funcaoDeRetornoDeSucesso, funcaoReRetornoDeErro);
            }
        }
    }
})();