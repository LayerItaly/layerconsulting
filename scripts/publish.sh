#!/bin/sh
# Publish the site to the gh-pages branch (GitHub Pages serves that branch).
# Only the site files go out; README, PRODUCT.md and scripts stay in main.
set -eu
cd "$(dirname "$0")/.."
FILES="index.html 404.html en assets robots.txt sitemap.xml .nojekyll"
REV=$(git rev-parse --short HEAD)
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
cp -R $FILES "$TMP"/
[ -f CNAME ] && cp CNAME "$TMP"/ || true
cd "$TMP"
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C "$OLDPWD" config user.name)" -c user.email="$(git -C "$OLDPWD" config user.email)" \
  commit -q -m "Publish site from main@$REV"
git push -q -f "$(git -C "$OLDPWD" remote get-url origin)" gh-pages
echo "Published main@$REV to gh-pages"
