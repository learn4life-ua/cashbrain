# Navigation maintenance

The site is static: navigation and breadcrumbs are included in the HTML and work without JavaScript or a build step.

After adding a page or renaming a heading, run from any directory:

```sh
python scripts/sync-navigation.py
python scripts/check-navigation.py
```

`sync-navigation.py` owns the marked header block and breadcrumbs on every page. The six section labels and routes live in `SECTIONS`. Local catalog/how-to shortcuts are retained. Breadcrumb labels use each page's H1; the current page is not a link.

Shared header and breadcrumb styles live in `assets/ui.css`. The `cb-page` class opts existing hub/tool pages into shared screen styling. Investigation pages receive navigation styling without replacing their individual visual design. Navigation is hidden for printing.
