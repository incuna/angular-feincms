(function (angular) {
    'use strict';

    var module = angular.module('feincms-pages.page-group', [
        'project_settings',
        'djangularRestFramework'
    ]);

    module.directive('pageGroup', [
        'drf',
        'FEINCMS_PAGES',
        'PROJECT_SETTINGS',
        function (drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                drf.loadList(PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PAGES_ENDPOINT + '?group=' + encodeURI(attrs.pageGroup))
                    .then(function (response) {
                        scope.pages = response;
                    });
            }
        };
    }]);

}(window.angular));
