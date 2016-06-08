angular-feincms
===============

### Directive
`feincms-page` attribute should be an angular expression. If you pass a simple slug it needs to be passed as a quoted string.

Example:
```
 <div feincms-page="'page-slug'" >
    <div bind-html-compile="page.regions.main"></div>
    <div bind-html-compile="page.regions.sidebar"></div>
</div>
```