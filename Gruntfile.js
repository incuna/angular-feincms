'use strict';

module.exports = function (grunt) {

    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt, {});
    }

    require('time-grunt')(grunt);

    var concatConfig = {
        target: {
            src: [
                'modules/**/**/*.js'
            ],
            dest: 'dist/angular-feincms-pages.js'
        }
    };

    var uglifyConfig = {
        target: {
            files: {
                'dist/angular-feincms-pages.min.js': 'dist/angular-feincms-pages.js'
            }
        }
    };

    grunt.initConfig({
        // Configurable paths
        config: {
            modules: 'modules',
            lib: 'bower_components',
            tests: 'tests',
            files: {
                lint: [
                    '<%= config.modules %>/**/scripts/**/*.js',
                    '!<%= config.modules %>/**/templates.js',
                    'Gruntfile.js'
                ]
            }
        }
    });

    grunt.config.merge({
        eslint: {
            all: {
                options: {
                    config: '.eslintrc'
                },
                src: '<%= config.files.lint %>'
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            src: '<%= config.files.lint %>'
        },
        concat: concatConfig,
        uglify: uglifyConfig
    });

    grunt.registerTask('lint', [
        'eslint',
        'jscs'
    ]);

    grunt.registerTask('default', [
        'lint'
    ]);

    grunt.registerTask('travis', 'Run the tests in Travis', [
        'lint'
    ]);

    grunt.registerTask('build', 'Concat and uglify', [
        'concat',
        'uglify'
    ]);

    // This is used in combination with grunt-force-task to make the most of a
    // Travis build, so all tasks can run but the build will fail if any of the
    // tasks failed/errored.
    grunt.registerTask('errorcodes', 'Fatally error if any errors or warnings have occurred but Grunt has been forced to continue', function () {
        grunt.log.writeln('errorcount: ' + grunt.fail.errorcount);
        grunt.log.writeln('warncount: ' + grunt.fail.warncount);
        if (grunt.fail.warncount > 0 || grunt.fail.errorcount > 0) {
            grunt.fatal('Errors have occurred.');
        }
    });

};
