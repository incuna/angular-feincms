'use strict';

var _ = require('lodash');
var fs = require('fs');

module.exports = function (grunt) {

    var projectTemplates = {};

    var modules_dir = 'modules/';
    var modules = fs.readdirSync(modules_dir).filter(function (file) {
        return fs.statSync(modules_dir + file).isDirectory();
    });

    _.each(modules, function (name) {
        var module_path = 'epatient.' + name + '.templates';
        projectTemplates[name] = {
            cwd: 'modules/' + name,
            src: '**/*.html',
            dest: 'modules/' + name + '/templates.js',
            options: {
                module: module_path,
                standalone: true
            }
        };
    });


    if (grunt.option('help')) {
        require('load-grunt-tasks')(grunt);
    } else {
        require('jit-grunt')(grunt, {
            ngtemplates: 'grunt-angular-templates'
        });
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
                ],
                templatesJS: 'modules/**/templates.js',
                templatesHTML: 'modules/**/*.html'
            }
        },
        watch: {
        templates: {
                files: 'modules/**/*.html',
                tasks: 'ngtemplates'
            },
            scripts: {
                files: 'modules/**/scripts/**/*.js',
                tasks: ['build', 'eslint']
            }
        },
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
        ngtemplates: _.extend({
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            },
            projectTemplates
        ),
        concat: concatConfig,
        uglify: uglifyConfig
    });

    grunt.registerTask('lint', [
        'eslint',
        'jscs'
    ]);

    grunt.registerTask('build', [
        'ngtemplates',
        'concat',
        'uglify'
    ]);

};
