#!/usr/bin/env node
/**
 * Mobile nav patch — applied once. Idempotent.
 *
 * For each public/*.html:
 *  1. nav uses px-margin-mobile md:px-margin-desktop (was px-margin-desktop only)
 *  2. The desktop link group gets a sibling hamburger button visible only <md
 *  3. A mobile drawer is appended after </header> with the same links
 *  4. A small inline <script> toggles [data-mobile-menu] on <html>
 *
 * Detects active page from the existing border-b-2 marker; if absent, no link is marked active.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PAGES = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

const LINKS = [
  { label: 'Product', href: '/' },
  { label: 'Hardware', href: '/hardware' },
  { label: 'Benchmarks', href: '/benchmarks' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
  { label: 'Docs', href: 'https://docs.3we.org' },
];

const MARKER = '<!-- mobile-nav:injected -->';

function buildDrawer(activeHref) {
  const items = LINKS.map(l => {
    const active = l.href === activeHref;
    const cls = active
      ? 'block py-4 px-margin-mobile font-mono text-label-caps uppercase text-primary border-l-2 border-primary bg-surface-container-low'
      : 'block py-4 px-margin-mobile font-mono text-label-caps uppercase text-text-secondary hover:text-primary border-l-2 border-transparent';
    return `      <a class="${cls}" href="${l.href}">${l.label}</a>`;
  }).join('\n');

  return `${MARKER}
<div class="mobile-menu md:hidden" id="mobileMenu" aria-hidden="true">
  <nav class="flex flex-col py-4 max-w-container-max mx-auto">
${items}
    <div class="px-margin-mobile pt-6 mt-2 border-t border-border-subtle flex flex-col gap-3">
      <a href="https://github.com/telleroutlook/3we-robot-platform" class="flex items-center gap-2 text-text-secondary font-mono text-label-caps uppercase">
        <span class="material-symbols-outlined text-base">star</span> Star on GitHub
      </a>
      <a href="https://docs.3we.org" class="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-mono text-label-caps uppercase font-bold text-center">Get Started</a>
    </div>
  </nav>
</div>
<script>
(function(){
  var btn = document.querySelector('.mobile-menu-toggle');
  var html = document.documentElement;
  if(!btn) return;
  btn.addEventListener('click', function(){
    var open = html.classList.contains('menu-open');
    html.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', String(!open));
    var menu = document.getElementById('mobileMenu');
    if(menu) menu.setAttribute('aria-hidden', String(open));
  });
  document.querySelectorAll('#mobileMenu a').forEach(function(a){
    a.addEventListener('click', function(){
      html.classList.remove('menu-open');
    });
  });
})();
</script>`;
}

const HAMBURGER = `<button class="mobile-menu-toggle md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-text-primary" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobileMenu">
      <span class="material-symbols-outlined icon-open">menu</span>
      <span class="material-symbols-outlined icon-close">close</span>
    </button>`;

function patch(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes(MARKER)) {
    // Already patched — leave it alone (idempotent re-runs)
    return { file: path.basename(filePath), skipped: true };
  }

  // 1. Fix nav padding — match the literal pattern with px-margin-desktop
  //    and only px-margin-desktop (not already responsive).
  //    Match both compact and pretty-printed forms.
  html = html.replace(
    /(<nav[^>]*?)class="(max-w-container-max mx-auto )px-margin-desktop( py-4 flex justify-between items-center)"/g,
    '$1class="$2px-margin-mobile md:px-margin-desktop$3"'
  );
  // multi-line variant (benchmarks/docs use prettier-formatted attrs)
  html = html.replace(
    /class="\s*max-w-container-max mx-auto px-margin-desktop py-4 flex justify-between items-center\s*"/g,
    'class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center"'
  );

  // 2. Detect active link. Find the link with `border-b-2 border-primary` marker,
  //    extract its href.
  let activeHref = null;
  const activeMatch = html.match(/border-b-2 border-primary[^"]*"\s*\n?\s*href="([^"]+)"/) ||
                      html.match(/border-b-2 border-primary[^"]*"\s+href="([^"]+)"/);
  if (activeMatch) activeHref = activeMatch[1];

  // 3. Insert hamburger inside the nav's right-hand button cluster.
  //    Find: <div class="flex items-center gap-4">  (the cluster containing the
  //    Get Started / star) and prepend the hamburger BEFORE that div, but
  //    inside the same <nav>. Easier: insert hamburger right before the
  //    closing </nav>. Place it with order utilities so it ends up rightmost on mobile.
  html = html.replace(/<\/nav>/, `  ${HAMBURGER}\n  </nav>`);

  // 4. Inject drawer after </header>
  const drawer = buildDrawer(activeHref);
  html = html.replace(/<\/header>/, `</header>\n${drawer}`);

  fs.writeFileSync(filePath, html);
  return { file: path.basename(filePath), activeHref };
}

const results = PAGES.map(p => patch(path.join(PUBLIC_DIR, p)));
results.forEach(r => {
  if (r.skipped) console.log(`  skip  ${r.file}  (already patched)`);
  else console.log(`  ok    ${r.file}  active=${r.activeHref || '(none)'}`);
});
