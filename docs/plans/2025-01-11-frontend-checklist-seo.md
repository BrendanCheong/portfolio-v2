# Frontend Checklist SEO & Meta Tags Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement high-priority Frontend Checklist items for portfolio-v2 including Google Site Verification, Open Graph/Twitter meta tags, structured data, sitemap, robots.txt, and 404 page.

**Architecture:** Add SEO meta tags and structured data to the base Layout.astro component, create static SEO files in public/ directory, and create a custom 404 page. Environment variable for Google verification keeps sensitive data out of source code.

**Tech Stack:** Astro 5, TypeScript, JSON-LD for structured data

---

## Task 1: Create .env file with Google Site Verification

**Files:**
- Create: `.env`
- Reference: `.env.example` (optional)

**Step 1: Create .env file**

```bash
cat > /Users/daip/other/portfolio-v2/.env << 'EOF'
# Google Site Verification
# Used to verify ownership with Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=1oxF7G6_fEXhGoqV-vMT975YbJVIS6tnbpTr-uR2cCo
EOF
```

**Step 2: Verify file created**

Run: `cat .env`
Expected: Output shows the Google verification code

**Step 3: Create .env.example (optional but recommended)**

```bash
cat > /Users/daip/other/portfolio-v2/.env.example << 'EOF'
# Google Site Verification
# Get your code from: https://search.google.com/search-console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
EOF
```

**Step 4: Commit**

```bash
git add .env .env.example
git commit -m "feat: add Google Site Verification env var"
```

---

## Task 2: Update Layout.astro with Enhanced Meta Tags

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Read current Layout.astro**

Run: `cat src/layouts/Layout.astro`
Expected: See current layout with basic meta tags

**Step 2: Add type definition and constants at top of frontmatter**

Add after the interface definition:

```typescript
const canonicalUrl = `https://brendancej.tech${Astro.url.pathname}`;
const ogImage = '/rich-preview.png';
const twitterHandle = '@BrendanCheong';
const googleSiteVerification = import.meta.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';
```

**Step 3: Add Google Site Verification meta tag**

Add after `<meta name="viewport" ... />`:

```astro
{googleSiteVerification && (
  <meta name="google-site-verification" content={googleSiteVerification} />
)}
```

**Step 4: Add Open Graph meta tags**

Add after description meta tag:

```astro
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={`https://brendancej.tech${ogImage}`} />
<meta property="og:image:width" content="1681" />
<meta property="og:image:height" content="693" />
```

**Step 5: Add Twitter Card meta tags**

Add after Open Graph tags:

```astro
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalUrl} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={`https://brendancej.tech${ogImage}`} />
<meta property="twitter:creator" content={twitterHandle} />
```

**Step 6: Add theme color and canonical link**

Add after favicon link:

```astro
<meta name="theme-color" content="#000000" />
<link rel="canonical" href={canonicalUrl} />
```

**Step 7: Add enhanced favicon links**

Replace the single favicon link with:

```astro
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

**Step 8: Add Apple Web App meta tags**

Add after favicon links:

```astro
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Portfolio" />
```

**Step 9: Verify syntax**

Run: `pnpm astro check`
Expected: No errors

**Step 10: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add enhanced meta tags (OG, Twitter, favicons)"
```

---

## Task 3: Add Structured Data (JSON-LD) to Layout

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Add Person structured data script**

Add before closing `</head>` tag:

```astro
<!-- Structured Data - Person -->
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
```

**Step 2: Add WebSite structured data script**

Add after Person script:

```astro
<!-- Structured Data - WebSite -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Brendan Cheong - Portfolio",
  "url": "https://brendancej.tech",
  "description": "Full-stack software engineer from Singapore"
})} />
```

**Step 3: Verify syntax**

Run: `pnpm astro check`
Expected: No errors

**Step 4: Build to verify JSON-LD renders correctly**

Run: `pnpm build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add JSON-LD structured data for SEO"
```

---

## Task 4: Create robots.txt

**Files:**
- Create: `public/robots.txt`

**Step 1: Create robots.txt file**

```bash
cat > /Users/daip/other/portfolio-v2/public/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://brendancej.tech/sitemap.xml
EOF
```

**Step 2: Verify file created**

Run: `cat public/robots.txt`
Expected: Shows robots.txt content

**Step 3: Verify accessible**

Run: `pnpm dev` (in background) and `curl http://localhost:4321/robots.txt`
Expected: Returns robots.txt content

**Step 4: Kill dev server**

Run: `pkill -f "astro dev"`

**Step 5: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt"
```

---

## Task 5: Create sitemap.xml

**Files:**
- Create: `public/sitemap.xml`

**Step 1: Create sitemap.xml file**

```bash
cat > /Users/daip/other/portfolio-v2/public/sitemap.xml << 'EOF'
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
EOF
```

**Step 2: Verify file created**

Run: `cat public/sitemap.xml`
Expected: Shows sitemap XML content

**Step 3: Verify accessible**

Run: `pnpm dev` (in background) and `curl http://localhost:4321/sitemap.xml`
Expected: Returns sitemap XML

**Step 4: Kill dev server**

Run: `pkill -f "astro dev"`

**Step 5: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat: add sitemap.xml"
```

---

## Task 6: Create Custom 404 Page

**Files:**
- Create: `src/pages/404.astro`

**Step 1: Check existing pages structure**

Run: `ls src/pages/`
Expected: See index.astro, projects.astro, contact.astro, etc.

**Step 2: Read a page to understand layout usage**

Run: `head -20 src/pages/index.astro`
Expected: See how Layout is imported and used

**Step 3: Create 404.astro**

```bash
cat > /Users/daip/other/portfolio-v2/src/pages/404.astro << 'EOF'
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="404 - Page Not Found | Brendan Cheong">
  <div class="flex flex-col items-center justify-center py-20">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl text-muted-foreground mb-8">
      Sorry, I couldn't find that page.
    </p>
    <a
      href="/"
      class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
    >
      Return Home
    </a>
  </div>
</Layout>
EOF
```

**Step 4: Verify syntax**

Run: `pnpm astro check`
Expected: No errors

**Step 5: Build and test 404 page**

Run: `pnpm build && pnpm preview`
Then visit: `http://localhost:4321/nonexistent-page`
Expected: Shows 404 page

**Step 6: Kill preview server**

Run: `pkill -f "astro preview"`

**Step 7: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add custom 404 page"
```

---

## Task 7: Verify External Links Have Security Attributes

**Files:**
- Check: `src/components/*.astro`
- Check: `src/data/*.json`

**Step 1: Find all external links**

Run: `grep -r "target=\"_blank\"" src/`
Expected: Find any external links with target="_blank"

**Step 2: Check if links have rel="noopener"**

For each link found, verify it has `rel="noopener noreferrer"`

**Step 3: Update any links missing security attributes**

If any links are missing `rel="noopener noreferrer"`, add it:

```astro
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
```

**Step 4: Commit if changes made**

```bash
git add -A
git commit -m "fix: add noopener to external links"
```

---

## Task 8: Build and Verification

**Files:**
- All files

**Step 1: Run full build**

Run: `pnpm build`
Expected: Build succeeds with no errors

**Step 2: Check meta tags in built HTML**

Run: `grep -E "(og:|twitter:|google-site-verification)" dist/index.html`
Expected: See all meta tags present

**Step 3: Verify JSON-LD in built HTML**

Run: `grep -A 5 "application/ld+json" dist/index.html`
Expected: See structured data scripts

**Step 4: Preview the site**

Run: `pnpm preview`

**Step 5: Test key pages manually**

Visit in browser:
- `http://localhost:4321/` - Check meta tags in DevTools
- `http://localhost:4321/robots.txt` - Verify robots.txt
- `http://localhost:4321/sitemap.xml` - Verify sitemap
- `http://localhost:4321/test-404` - Verify 404 page

**Step 6: Kill preview server**

Run: `pkill -f "astro preview"`

**Step 7: Final commit**

```bash
git add -A
git commit -m "chore: finalize SEO implementation"
```

---

## Post-Implementation Testing Checklist

After all tasks complete:

- [ ] Meta tags appear in browser DevTools (Elements tab)
- [ ] Test with Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] Test with Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] Test robots.txt with Google Robots Testing Tool
- [ ] Validate structured data with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Submit sitemap to Google Search Console
- [ ] Verify 404 page works on random routes
- [ ] Check all external links have noopener

---

## Notes

- Astro automatically handles HTML/CSS/JS minification
- Astro handles image optimization with the `<Image />` component
- Current favicon files already exist in `public/`
- Dark theme support is already implemented
- Update `lastmod` in sitemap.xml when content changes
