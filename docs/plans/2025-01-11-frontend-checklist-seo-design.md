# Frontend Checklist SEO & Meta Tags Implementation Design

**Date:** 2025-01-11
**Author:** Brendan Cheong
**Project:** portfolio-v2

## Overview

Implement high-priority Frontend Checklist items for the portfolio-v2 project to improve SEO, social sharing, and search engine visibility.

## Scope

High-priority items only:
- Meta tags (Google verification, Open Graph, Twitter Cards)
- SEO files (robots.txt, sitemap.xml)
- Structured data (JSON-LD)
- HTML best practices (noopener on external links, 404 page)
- Accessibility verification

## Configuration

### Environment Variables

**`.env`:**
```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=1oxF7G6_fEXhGoqV-vMT975YbJVIS6tnbpTr-uR2cCo
```

### Site Information

| Property | Value |
|----------|-------|
| Domain | https://brendancej.tech |
| Author | Brendan Cheong |
| Title | Brendan Cheong - Full-Stack Software Engineer |
| Description | Full-stack software engineer from Singapore |
| GitHub | @BrendanCheong |
| LinkedIn | https://www.linkedin.com/in/bcej/ |

## Implementation

### 1. Enhanced Meta Tags (`src/layouts/Layout.astro`)

Add to `<head>`:

```astro
---
// Access env var
const googleSiteVerification = import.meta.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';
const canonicalUrl = `https://brendancej.tech${Astro.url.pathname}`;
const ogImage = '/og-image.jpg'; // To be created
---

<!-- Google Site Verification -->
{googleSiteVerification && (
  <meta name="google-site-verification" content={googleSiteVerification} />
)}

<!-- Open Graph (Facebook) -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalUrl} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={ogImage} />
<meta property="twitter:creator" content="@BrendanCheong" />

<!-- Theme Color -->
<meta name="theme-color" content="#000000" />

<!-- Canonical -->
<link rel="canonical" href={canonicalUrl} />

<!-- Enhanced Favicons -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Apple Web App -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Portfolio" />
```

### 2. SEO Files

**`public/robots.txt`:**
```txt
User-agent: *
Allow: /

Sitemap: https://brendancej.tech/sitemap.xml
```

**`public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://brendancej.tech/</loc>
    <lastmod>2025-01-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://brendancej.tech/projects</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://brendancej.tech/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://brendancej.tech/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 3. Structured Data (JSON-LD)

Add to `<head>` in `src/layouts/Layout.astro`:

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Brendan Cheong",
  "url": "https://brendancej.tech",
  "sameAs": [
    "https://github.com/BrendanCheong",
    "https://www.linkedin.com/in/bcej/"
  ],
  "jobTitle": "Full-Stack Software Engineer",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SG"
  },
  "email": "brendancej1@gmail.com"
})} />

<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Brendan Cheong - Portfolio",
  "url": "https://brendancej.tech",
  "description": "Full-stack software engineer from Singapore"
})} />
```

### 4. Custom 404 Page

**`src/pages/404.astro`:**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="404 - Page Not Found">
  <h1>404</h1>
  <p>Page not found</p>
  <a href="/">Return home</a>
</Layout>
```

### 5. External Link Security

Verify all external links with `target="_blank"` also have `rel="noopener noreferrer"`.

## Files Summary

| File | Action |
|------|--------|
| `.env` | Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| `src/layouts/Layout.astro` | Add meta tags, OG, Twitter cards, structured data |
| `public/robots.txt` | Create new file |
| `public/sitemap.xml` | Create new file |
| `src/pages/404.astro` | Create custom 404 page |
| `public/og-image.jpg` | Create OG image (1200x630px) - *to be created separately* |

## Testing Checklist

After implementation:
- [ ] Verify meta tags in browser DevTools
- [ ] Test with Facebook Open Graph debugger
- [ ] Test with Twitter Card validator
- [ ] Submit sitemap to Google Search Console
- [ ] Test robots.txt with Google testing tool
- [ ] Validate structured data with Google Rich Results Test
- [ ] Verify 404 page works
- [ ] Check all external links have noopener

## Notes

- Astro automatically handles minification, CSS bundling, and image optimization
- Current favicon files already exist in `public/`
- Dark theme support is already implemented
