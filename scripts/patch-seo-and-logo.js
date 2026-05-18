#!/usr/bin/env node
/**
 * SEO + branding patcher. Idempotent.
 *
 * For each public/*.html:
 *  1. Insert favicon, theme-color, OG, Twitter, canonical, robots meta into <head>
 *     (after the existing <meta name="description"> when present, else after <title>)
 *  2. Replace the textual "3we" brand link in the nav with an <img> of /img/logo.png
 *
 * Skips files that already contain MARKER.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITE_URL = 'https://3we.org';
const PAGES = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

const MARKER = '<!-- seo:injected -->';

const PAGE_META = {
  'index.html':       { path: '/',            title: '3we — AI-First Open Platform for Embodied Robotics' },
  'product.html':     { path: '/product',     title: '3we Product — One API, Four Backends, Zero Compromise' },
  'hardware.html':    { path: '/hardware',    title: '3we Hardware — Open BOM, KiCad PCB, CERN-OHL-P v2' },
  'benchmarks.html':  { path: '/benchmarks',  title: '3we Benchmarks — Standardized Embodied AI Evaluation', desc: '3 tasks × 8 scenes × public leaderboard. Reproducible evaluation across simulation and real hardware.' },
  'playground.html':  { path: '/playground',  title: '3we Playground — Try the Platform in Your Browser',  desc: 'Interactive playground for the 3we Robot Platform on HuggingFace Spaces. No installation required.' },
  'blog.html':        { path: '/blog',        title: '3we Blog — Engineering Notes on Embodied AI' },
  'community.html':   { path: '/community',   title: '3we Community — Open Source Embodied AI Research' },
  'paper.html':       { path: '/paper',       title: '3we Paper — Sim-to-Real Embodied AI Research Platform' },
  'pricing.html':     { path: '/pricing',     title: '3we Pricing — Open Hardware Configurations from $120' },
  'about.html':       { path: '/about',       title: 'About 3we — Mission, Team, and Open Licensing' },
  'docs.html':        { path: '/docs',        title: '3we Documentation — Redirecting to docs.3we.org',     desc: 'Technical documentation for the 3we Robot Platform. Redirecting to docs.3we.org.' },
};

function buildSeoBlock(title, desc, url) {
  return `${MARKER}
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="icon" type="image/png" sizes="512x512" href="/img/logo.png"/>
<link rel="apple-touch-icon" href="/img/logo.png"/>
<meta name="theme-color" content="#815500"/>
<meta name="robots" content="index,follow"/>
<link rel="canonical" href="${url}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="3we Robot Platform"/>
<meta property="og:url" content="${url}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${desc}"/>
<meta property="og:image" content="${SITE_URL}/img/og-image.png"/>
<meta property="og:image:width" content="512"/>
<meta property="og:image:height" content="512"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${desc}"/>
<meta name="twitter:image" content="${SITE_URL}/img/og-image.png"/>`;
}

const DEFAULT_DESC = 'AI-First open infrastructure for embodied robotics. Run the same Python code from simulation to real hardware. Open-source robot platform under $500.';

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1].trim() : null;
}
function extractDesc(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  return m ? m[1].trim() : null;
}

function patch(filePath) {
  const fname = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');

  // ── 1. SEO head injection ───────────────────────────────────────
  if (!html.includes(MARKER)) {
    const meta = PAGE_META[fname] || { path: '/' + fname.replace('.html', ''), title: extractTitle(html) || '3we Robot Platform' };
    const title = meta.title || extractTitle(html) || '3we Robot Platform';
    const desc = meta.desc || extractDesc(html) || DEFAULT_DESC;
    const url = SITE_URL + (meta.path === '/' ? '/' : meta.path);

    // Update <title> if PAGE_META gives a richer one
    if (meta.title) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
    }

    // Ensure <meta name="description"> exists
    if (!extractDesc(html)) {
      html = html.replace(/<title>[^<]*<\/title>/, m => `${m}\n<meta name="description" content="${desc}"/>`);
    } else if (meta.desc) {
      // Replace description with PAGE_META override
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${desc}"/>`);
    }

    // Insert SEO block right after the description tag (or right after title)
    const seoBlock = buildSeoBlock(title, desc, url);
    if (html.match(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/)) {
      html = html.replace(
        /(<meta\s+name="description"\s+content="[^"]*"\s*\/?>)/,
        `$1\n${seoBlock}`
      );
    } else {
      html = html.replace(/<\/head>/, `${seoBlock}\n</head>`);
    }
  }

  // ── 2. Replace text brand "3we" with logo image ──────────────────
  // Two patterns exist in the codebase: compact and prettier-formatted.
  // Compact: <a href="/" class="font-display ..."> 3we</a>
  html = html.replace(
    /<a href="\/" class="font-display text-headline-md font-bold tracking-tighter text-text-primary">3we<\/a>/g,
    '<a href="/" class="flex items-center gap-2" aria-label="3we home"><img src="/img/logo.png" alt="3we Robot Platform" width="36" height="36" class="rounded-lg"/><span class="font-display text-headline-md font-bold tracking-tighter text-text-primary hidden sm:inline">3we</span></a>'
  );
  // Prettier multi-line variant
  html = html.replace(
    /<a\s+href="\/"\s+class="font-display text-headline-md font-bold tracking-tighter text-text-primary"\s*>3we<\/a\s*>/g,
    '<a href="/" class="flex items-center gap-2" aria-label="3we home"><img src="/img/logo.png" alt="3we Robot Platform" width="36" height="36" class="rounded-lg"/><span class="font-display text-headline-md font-bold tracking-tighter text-text-primary hidden sm:inline">3we</span></a>'
  );
  // Footer brand "3we" — keep as text but tighter (won't touch). Footer detection:
  // <span class="font-display text-headline-sm font-bold ...">3we</span>
  // Leave the footer text alone.

  fs.writeFileSync(filePath, html);
  return fname;
}

PAGES.forEach(p => {
  const r = patch(path.join(PUBLIC_DIR, p));
  console.log('  ok   ' + r);
});
