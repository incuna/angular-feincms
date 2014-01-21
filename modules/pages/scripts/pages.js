(function () {
    'use strict';

    var pages = angular.module('feincms.pages', [
        'project_settings',
        'djangularRestFramework'
    ]);

    pages.constant('FEINCMS_PAGES', {
        ENDPOINT: '/pages'
    });

    pages.directive('feincmsPageRegion', ['$location', 'drf', 'FEINCMS_PAGES', 'PROJECT_SETTINGS', function ($location, drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);

        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/feincms/pages/region.html',
            link: function (scope, element, attrs) {
                var url = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.ENDPOINT;
                if(attrs.pageId) {
                    url = url + '/' + attrs.pageId;
                }
                if (attrs.pageId) {
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
        $templateCache.put('templates/feincms/pages/region.html',
            '<div ng-bind-html=content></div>'
        );
    }]);
}());
