(function () {
    'use strict';

    var module = angular.module('feincms-pages.templates', []);

    module.run(['$templateCache', function ($templateCache) {
        $templateCache.put('templates/feincms/pages/detail.html',
            '<div>{{ response|json }}</div>'
        );
        $templateCache.put('templates/feincms/pages/region.html',
            '<div ng-bind-html=content></div>'
        );
    }]);

}());
