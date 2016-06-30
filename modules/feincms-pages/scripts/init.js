(function (angular) {
    'use strict';

    angular.module('feincms-pages', [
        'feincms-pages.pages-detail',
        'feincms-pages.feincms-page',
        'feincms-pages.page-group',
        'feincms-pages.load-page',
        'feincms-pages.constants',
        'feincms-pages.routes'
    ]);

}(window.angular));
