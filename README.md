# layerconsulting.net

Static site for Layer Consulting. Plain HTML and CSS, no build step.

```
index.html        Italian (default)
en/index.html     English
404.html          not-found page (served by GitHub Pages)
assets/           site.css, site.js, favicon.svg
CNAME             custom domain for GitHub Pages
```

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000.

## Deploy (GitHub Pages)

1. Repository Settings → Pages → Source: *Deploy from a branch*, `main`, `/ (root)`.
   On the free organisation plan Pages needs a **public** repository.
2. DNS for `layerconsulting.net` (nameservers `ns-cloud-e*.googledomains.com`, registrar Squarespace Domains):

   | Type  | Host  | Value                   |
   |-------|-------|-------------------------|
   | A     | @     | 185.199.108.153         |
   | A     | @     | 185.199.109.153         |
   | A     | @     | 185.199.110.153         |
   | A     | @     | 185.199.111.153         |
   | CNAME | www   | layeritaly.github.io.   |

3. Back in Settings → Pages, wait for the certificate and tick *Enforce HTTPS*.

Leave the existing MX/TXT records alone: they carry the `@layerconsulting.net` mailboxes on Google Workspace.
