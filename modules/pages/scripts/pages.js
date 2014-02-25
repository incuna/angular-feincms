(function () {
    'use strict';

    var pages = angular.module('feincms.pages', [
        'ngRoute',
        'project_settings',
        'djangularRestFramework'
    ]);

    pages.constant('FEINCMS_PAGES', {
        // API endpoints
        PAGES_ENDPOINT: '/pages',
        // Angular routes
        PAGES: '/pages/'
    });

    pages.config(['$routeProvider', 'FEINCMS_PAGES', 'PROJECT_SETTINGS', function ($routeProvider, FEINCMS_PAGES, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);

        $routeProvider
            .when(MODULE_SETTINGS.PAGES + ':id/', {
                templateUrl: 'templates/feincms/pages/detail.html',
                controller: 'PagesDetailCtrl'
            });
    }]);

    pages.controller('PagesDetailCtrl', ['$scope', '$routeParams', 'drf', 'FEINCMS_PAGES', 'PROJECT_SETTINGS', function ($scope, $routeParams, drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);

        var url = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PAGES_ENDPOINT;
        url = url + '/' + $routeParams.id;

        drf.loadItem(url)
            .then(function (response) {
                $scope.response = response;
            });
    }]);

    pages.directive('pageGroup', ['drf', 'FEINCMS_PAGES', 'PROJECT_SETTINGS', function (drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
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

    pages.directive('feincmsPageRegion', ['$location', 'drf', 'FEINCMS_PAGES', 'PROJECT_SETTINGS', function ($location, drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);

        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/feincms/pages/region.html',
            link: function (scope, element, attrs) {
                var url = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PAGES_ENDPOINT;

                if (attrs.pageId) {
                    url = url + '/' + attrs.pageId;

                    drf.loadItem(url)
                        .then(function (response) {
                            scope.content = response.regions[attrs.region];
                        });
                } else {
                    // If there isn't a page id to load, then use the page slug
                    // to render the appropriate content.
                    var slug = $location.$$path;
                    // Remove the first and last / from the path.
                    slug = slug.replace(/^\/+|\/+$/g, '');

                    // Get the list of pages
                    drf.loadList(url)
                        .then(function (response) {
                            // Find the page by slug in the list
                            angular.forEach(response, function (page) {
                                if (page.slug === slug) {
                                    scope.content = page.regions[attrs.region];
                                    return;
                                }
                            });
                        });
                }

            }
        };
    }]);

    pages.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/feincms/pages/detail.html',
            '<div>{{ response|json }}</div>'
        );
        $templateCache.put('templates/feincms/pages/region.html',
            '<div ng-bind-html=content></div>'
        );
    }]);
}());
