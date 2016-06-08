angular-feincms
===============

### Directive
`feincms-page` attribute should be an angular expression. If you pass a simple slug it needs to be passed as a quoted string.

Example:
```
 <div feincms-page="'pageSlug'">
    <div bind-html-compile="feincmsPages.pageSlug.regions.main"></div>
    <div bind-html-compile="feincmsPages.pageSlug.regions.sidebar"></div>
</div>
```