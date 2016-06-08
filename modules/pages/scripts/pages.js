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
            .when(MODULE_SETTINGS.PAGES + ':slug/', {
                templateUrl: 'templates/feincms/pages/detail.html',
                controller: 'PagesDetailCtrl'
            });
    }]);

    pages.factory('loadPage', [
        '$sce', '$q', 'drf', 'FEINCMS_PAGES', 'PROJECT_SETTINGS',
        function ($sce, $q, drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);
            var urlBase = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PAGES_ENDPOINT;
            return function (slug) {
                var url = urlBase + '/' + slug;
                var deferred = $q.defer();
                drf.loadItem(url)
                    .then(function (response) {
                        angular.forEach(response.regions, function(value, key){
                            response.regions[key] = $sce.trustAsHtml(value);
                        });
                        deferred.resolve(response);
                    },
                    deferred.reject);

                return deferred.promise;
            };
        }
    ]);

    pages.controller('PagesDetailCtrl', [
        '$scope', '$routeParams', 'loadPage',
        function ($scope, $routeParams, loadPage) {
            loadPage($routeParams.slug).then(function (response) {
                $scope.response = response;
            });
        }
    ]);

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

    pages.directive('feincmsPage', ['loadPage', function (loadPage) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                scope.feincmsPages = {};
                scope.$watch(attrs.feincmsPage, function (field) {
                    var slug = scope.$eval(attrs.feincmsPage);
                    if (angular.isDefined(slug)) {
                        loadPage(slug).then(function (response) {
                            scope.feincmsPages[slug] = response;
                        });
                    }
                });
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
