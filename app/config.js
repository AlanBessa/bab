(function() {
    'use strict';

    angular.module('bab')
        .constant('SETTINGS', {
            'VERSION': '0.1.0.0',
            'CURR_ENV': 'dev',
            'AUTH_TOKEN': 'bab-token',
            'AUTH_USER': 'bab-user',
            'AUTH_ID': 'bab-id',
            'SERVICE_URL': 'http://50.19.226.130/bab-search-engine/api/'
        })
        .constant('toastr', toastr)
        .constant('moment', moment);

    angular.module('bab').run(['$rootScope', '$location', '$localStorage', 'SETTINGS',
        function($rootScope, $location, $localStorage, SETTINGS) {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "10000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        }
    ]);

    angular.module('bab').config(['$qProvider', function($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);
})();