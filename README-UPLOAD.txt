Performance fix — upload into the repo root of the deepthought site (dist/ contents).
Keep folder structure: files at top level go to the site root; assets/ goes to assets/.
Existing PNGs stay — county/blog pages still reference them.

Included:
- 13 pages (head critical-path fix + webp refs + lazy images)
- 7 DC partials (stylesheet chain removed)
- ds-tokens.css (new, flattened design tokens)
- assets/: 16 new webp images (4113 KiB -> 504 KiB)

Still to do: Cloudflare cache rule (1 year for /assets/*, *.css, *.js) to clear the
"Use efficient cache lifetimes" audit — GitHub Pages forces max-age=600.
