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

## Releasing a new version

1. Commit your changes.
1. Run `grunt build` to generate the compiled template files
1. Follow the guidelines at http://semver.org/ to determine your new version number.
1. Update `CHANGELOG.md` with your new version number and a description of changes.
1. Update the `version` property in `bower.json` and `package.json`
1. Commit those changes with the commit message "Bump to [version number]". [version number] should be in the format x.y.z.
1. `git tag [version number]`
1. `git push`
1. `git push --tags` - must be done separately.
