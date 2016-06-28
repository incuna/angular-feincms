(function (angular) {
    'use strict';

    var module = angular.module('feincms-pages.load-page', [
        'project_settings',
        'djangularRestFramework'
    ]);

    module.factory('loadPage', [
        '$sce', '$q', 'drf', 'FEINCMS_PAGES', 'PROJECT_SETTINGS',
        function ($sce, $q, drf, FEINCMS_PAGES, PROJECT_SETTINGS) {
            var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);
            var urlBase = PROJECT_SETTINGS.API_ROOT + MODULE_SETTINGS.PAGES_ENDPOINT;
            return function (slug) {
                var url = urlBase + '/' + slug;
                var deferred = $q.defer();
                drf.loadItem(url)
                    .then(function (response) {
                        angular.forEach(response.regions, function (value, key) {
                            response.regions[key] = $sce.trustAsHtml(value);
                        });
                        deferred.resolve(response);
                    },
                    deferred.reject);

                return deferred.promise;
            };
        }
    ]);

}(window.angular));
