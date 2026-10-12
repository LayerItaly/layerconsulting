# layerconsulting.net

Static site for Layer Consulting. Plain HTML and CSS, no build step.

```
index.html        Italian (default)
en/index.html     English
404.html          not-found page (served by GitHub Pages)
assets/           site.css, site.js, favicon.svg, img/
CNAME             custom domain for GitHub Pages
```

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000.

## Deploy (GitHub Pages)

`scripts/publish.sh` copies only the site files (`index.html`, `404.html`, `en/`, `assets/`,
`robots.txt`, `sitemap.xml`, `CNAME`) to the `gh-pages` branch, which GitHub Pages serves. Run it after
pushing `main`. Until the domain points here the site lives at https://layeritaly.github.io/layerconsulting/.

To serve it on `layerconsulting.net`:

1. DNS for `layerconsulting.net` (nameservers `ns-cloud-e*.googledomains.com`, registrar Squarespace Domains):

   | Type  | Host  | Value                   |
   |-------|-------|-------------------------|
   | A     | @     | 185.199.108.153         |
   | A     | @     | 185.199.109.153         |
   | A     | @     | 185.199.110.153         |
   | A     | @     | 185.199.111.153         |
   | CNAME | www   | layeritaly.github.io.   |

   Leave the existing MX/TXT records alone: they carry the `@layerconsulting.net` mailboxes on Google Workspace.
2. Once the records resolve: `gh api -X PUT repos/LayerItaly/layerconsulting/pages -f cname=layerconsulting.net`,
   then tick *Enforce HTTPS* in Settings, Pages, when the certificate is issued.

## Images

`assets/img/franco-puppo.jpg` is Franco's portrait. The abstract plates are Unsplash photos
(Unsplash License, free to use), fetched in grayscale through Picsum:
hero-bg / facade (Mike Wilson), courtyard (Liam Andrew), lattice (Samuel Zeller),
ridge (Fabio Rose), stairs (davide ragusa).
