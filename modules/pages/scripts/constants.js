(function (angular) {
    'use strict';

    var module = angular.module('feincms-pages.constants', []);

    module.constant('FEINCMS_PAGES', {
        // API endpoints
        PAGES_ENDPOINT: '/pages',
        // Angular routes
        PAGES: '/pages/'
    });

}(window.angular));
