# Sitemap update workflow

## Automated generation (default)
1. Run `python3 scripts/generate_sitemap.py` from the repository root.
2. The script regenerates `sitemap.xml` using:
   - the route list in `CANDIDATE_ROUTES`,
   - per-page indexability inferred from each page's `$metaRobots` value (`noindex` pages are excluded),
   - per-page `<lastmod>` from `git log -1 --format=%cs -- <page-file>`.
3. Validate XML and robots alignment:
   - `xmllint --noout sitemap.xml`
   - `python3 - <<'PY' ...` checks that `robots.txt` declares `https://autovalley.ma/sitemap.xml` and that `sitemap.xml` exists.

## Manual fallback (if automation is unavailable)
Use this deterministic release-tied process:
1. Determine release date `R` (ISO format `YYYY-MM-DD`) from the deployment/release record.
2. Build the URL list from indexable pages only:
   - include pages with no `$metaRobots` declaration or explicit `index` directive,
   - exclude pages with `$metaRobots` containing `noindex` (currently legal pages).
3. For each indexable URL changed in the release, set `<lastmod>` to `R`.
4. For unchanged URLs, preserve existing `<lastmod>`.
5. Validate XML syntax and ensure the robots-declared sitemap URL resolves to `/sitemap.xml`.
