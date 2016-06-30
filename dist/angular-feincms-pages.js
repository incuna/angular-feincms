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

(function (angular) {
    'use strict';

    var module = angular.module('feincms-pages.pages-detail', [
        'ngRoute'
    ]);

    module.controller('PagesDetailCtrl', [
        '$scope', '$routeParams', 'loadPage',
        function ($scope, $routeParams, loadPage) {
            loadPage($routeParams.slug).then(function (response) {
                $scope.response = response;
            });
        }
    ]);

}(window.angular));

(function (angular) {
    'use strict';

    var module = angular.module('feincms-pages.feincms-page', []);

    module.directive('feincmsPage', ['loadPage', function (loadPage) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                scope.feincmsPages = {};
                scope.$watch(attrs.feincmsPage, function () {
                    var slug = scope.$eval(attrs.feincmsPage);
                    if (angular.isDefined(slug)) {
                        loadPage(slug).then(function (response) {
                            scope.page = response;
                        });
                    }
                });
            }
        };
    }]);

}(window.angular));

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

(function (angular) {
    'use strict';

    var module = angular.module('feincms-pages.routes', [
        'project_settings',
        'ngRoute'
    ]);

    module.config(['$routeProvider', 'FEINCMS_PAGES', 'PROJECT_SETTINGS', function ($routeProvider, FEINCMS_PAGES, PROJECT_SETTINGS) {
        var MODULE_SETTINGS = angular.extend({}, FEINCMS_PAGES, PROJECT_SETTINGS.FEINCMS_PAGES);

        $routeProvider
            .when(MODULE_SETTINGS.PAGES + ':slug/', {
                templateUrl: 'templates/feincms/pages/detail.html',
                controller: 'PagesDetailCtrl'
            });
    }]);

}(window.angular));

angular.module('feincms-pages.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/feincms/pages/detail.html',
    "<div>{{ response|json }}</div>"
  );


  $templateCache.put('templates/feincms/pages/region.html',
    "<div ng-bind-html=content></div>"
  );

}]);
