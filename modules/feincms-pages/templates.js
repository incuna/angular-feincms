angular.module('feincms-pages.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/feincms/pages/detail.html',
    "<div>{{ response|json }}</div>"
  );


  $templateCache.put('templates/feincms/pages/region.html',
    "<div ng-bind-html=content></div>"
  );

}]);
