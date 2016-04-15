# Upcoming

* Upgrade Angular compatibility to include 1.3, 1.4 and 1.5.
* Upgrade djangular-rest-framework compatibility to include 2, 3 and 4.

# 2.0.0

* Remove feincmsPageRegion directive. Use feincmsPage to load all page data in a single request.
  To upgrade replace all `feincms-page-region` directives with `feincms-page` directive:
     ```
        <div feincms-page-region slug="injection-tracker" region="main"></div>
        <div feincms-page-region slug="injection-tracker" region="sidebar"></div>
     ```
  becomes 
     ```
        <div feincms-page="injection-tracker" >
            <div bind-html-compile="page.regions.main"></div>
            <div bind-html-compile="page.regions.sidebar"></div>
        </div>
     ```

# 1.4.2

* Add loadPage factory to load the page from the api
* Add feincmsPage directive to load a page and add it to the scope.

# 1.4.1

* Amends pageGroup and the feincmsPageRegion directives to return their original result as angular trusted HTML (`$sce.trustAsHtml()`).

# 1.4.0

* Add optional `slug` attribute to feincmsPageRegion directive.

# 1.3.3

* Improve dependency matching in `bower.json` to reduce conflicts.

# 1.3.2

* Fix broken region directive

# 1.3.1

* Fix duplicate output issue when multiple directives with different regions used in same template

# 1.3.0

* Now uses page slugs rather than IDs.
* If you were reversing URL's bg ID you will need to update that to:
  `|reverseUrl:{slug: page.slug} }}`

# 1.2.0

* Renamed pages API endpoint.
* Added pageGroup directive, which returns a list of pages filtered by a group.

# 1.1.1

* Bump ADRF requirement.

# 1.1.0

* Page detail view added.

# 1.0.0

* Initial release.
