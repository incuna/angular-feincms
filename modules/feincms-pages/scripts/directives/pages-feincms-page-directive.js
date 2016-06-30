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
