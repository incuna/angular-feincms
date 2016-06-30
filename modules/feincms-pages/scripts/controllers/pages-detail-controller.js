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
