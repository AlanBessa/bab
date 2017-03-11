module.exports = function(grunt) {

    var componentes = ['public/dev/js/html5shiv.min.js',
        'public/dev/js/respond.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/toastr/toastr.min.js',
        'bower_components/moment/min/moment.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/angular-i18n/angular-locale_pt-br.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/ngstorage/ngStorage.min.js',
        'bower_components/angular-loading-bar/build/loading-bar.min.js',
        'bower_components/textAngular/dist/textAngular-rangy.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-ui-select/dist/select.min.js',
        'bower_components/textAngular/dist/textAngular.min.js',
        'public/dev/js/textAngularSetup.js',
        'bower_components/angular-translate/angular-translate.min.js',
        'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        'bower_components/angular-moment/angular-moment.min.js',
        'bower_components/angular-messages/angular-messages.min.js'
    ];

    var aplicacao = [
        'app/app.js',
        'app/routes.js',
        'app/config.js',
        'app/filters/telefone.filter.js',
        'app/filters/cep.filter.js',
        'app/filters/cpf.filter.js',
        'app/filters/cnpj.filter.js',
        'app/decorator/exception.config.decorator.js',
        'app/factories/home.factory.js',
        'app/factories/paginacao.factory.js',
        'app/controllers/home/home.controller.js'
    ];

    grunt.initConfig({
        //Plugin to javascript sintax validation 
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['app']
        },
        cssmin: {
            sitecss: {
                files: {
                    'public/dist/css/styles-1.0.0.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/font-awesome/css/font-awesome.css',
                        'bower_components/toastr/toastr.css',
                        'bower_components/angular-loading-bar/build/loading-bar.css',
                        'bower_components/angular-ui-select/dist/select.css',
                        'bower_components/textAngular/dist/textAngular.css',
                        'public/dev/css/fontes.css',
                        'public/dev/css/estilo.css'
                    ]
                }
            }
        },
        uglify: {
            aplicacaoConfig: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'public/dist/js/aplicacao-1.0.0.min.js': aplicacao,
                }
            },
            componenteConfig: {
                options: {
                    mangle: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'public/dist/js/componentes-1.0.0.min.js': componentes,
                }
            }
        },
        clean: {
            src: ['public/dist/js', 'public/dist/css', 'public/dist/fonts', 'public/dist/pages', 'public/dist/json', 'public/dist/img']
        },
        copy: {
            main: {
                files: [{
                        expand: true,
                        cwd: "bower_components/font-awesome/fonts",
                        src: '**',
                        dest: 'public/dist/fonts',
                        flatten: false
                    },
                    {
                        expand: true,
                        cwd: "public/dev/fonts",
                        src: '**',
                        dest: 'public/dist/fonts',
                        flatten: false
                    },
                    {
                        expand: true,
                        cwd: 'public/dev/img',
                        src: '**',
                        dest: 'public/dist/img',
                        flatten: false
                    },
                    {
                        expand: true,
                        cwd: 'public/dev/json',
                        src: '**',
                        dest: 'public/dist/json',
                        flatten: false
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/dist/pages/home/index.html': 'public/dev/pages/home/index.html',
                    'public/dist/pages/shared/carregando.html': 'public/dev/pages/shared/carregando.html',
                    'public/dist/pages/shared/paginacao.html': 'public/dev/pages/shared/paginacao.html'
                }
            }
        },
        watch: {
            files: ['app/**/*.js', aplicacao],
            tasks: ['jshint']
        }
    });

    // Default task.
    grunt.registerTask('dist', ['cssmin', 'copy', 'htmlmin', 'uglify', 'jshint', 'clean', 'watch']);

    // These plugins provide necessary tasks.{% if (min_concat) { %}
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
};