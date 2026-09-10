# mohiemen.com

Personal site for M A Mohiemen Tanim: industrial engineer, innovation
consultant, and founder of Intelactory.

Static site, no build step. Pages: `index.html`, `register.html`,
`intelactory.html`.

Design direction and the reasoning behind the rebuild:
`docs/2026-09-11-rebuild-plan.md`.

## Fonts

Archivo and Source Serif 4 are self-hosted in `fonts/` as latin-subset woff2 and
preloaded in each page's `<head>`. There is no third-party font request. Do not
reintroduce a `@font-face` `@import` from a CDN: it serialises HTML, CSS, the
provider's CSS and then the font files, and it makes rendering depend on someone
else's uptime.

## Deploy

Served from `/var/www/mohiemen` on the Intelactory VPS, which is itself a git
checkout, so the checkout is the artifact:

```
ssh root@45.76.181.2 'cd /var/www/mohiemen && git pull'
```

Nothing is built and nothing is rsynced. If a pull adds files, re-apply
permissions, because nginx reads as `www-data` while root owns the tree:

```
find /var/www/mohiemen -path ./.git -prune -o -type f -exec chmod 644 {} +
find /var/www/mohiemen -path ./.git -prune -o -type d -exec chmod 755 {} +
```
