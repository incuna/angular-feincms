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
