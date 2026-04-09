// IM AESTHETIC — Shared Navigation (floating home button + sidebar)
(function() {
  const PAGES = [
    { section: 'Strategy & Analysis' },
    { name: 'Profile Renewal', title: '\ud504\ub85c\ud544 \ub9ac\ub274\uc5bc \uac00\uc774\ub4dc', href: '/instagram_profile_renewal_1.html', icon: '\ud83d\udcf1' },
    { name: 'Trend Analysis', title: '2026 \ud2b8\ub80c\ub4dc \ubd84\uc11d', href: '/trend_analysis_2026.html', icon: '\ud83d\udcca' },
    { name: 'User Guide', title: '\uc0ac\uc6a9 \uac00\uc774\ub4dc', href: '/user_guide.html', icon: '\ud83d\udcd6' },
    { section: 'Contents Tools' },
    { name: 'Dashboard', title: '\ucf58\ud150\uce20 \ub300\uc2dc\ubcf4\ub4dc', href: '/dashboard.html', icon: '\ud83d\udccb' },
    { name: 'Feed Preview', title: '\ud53c\ub4dc \ud504\ub9ac\ubdf0', href: '/instagram_preview_react.html', icon: '\ud83d\uddbc' },
    { name: 'Card News', title: '\uce74\ub4dc\ub274\uc2a4 \uba54\uc774\ucee4', href: '/card_news_maker.html', icon: '\ud83d\udcf0' },
    { name: 'Highlight Cover', title: '\ud558\uc774\ub77c\uc774\ud2b8 \ucee4\ubc84', href: '/highlight_cover_maker.html', icon: '\u2b55' },
    { name: 'Event Card', title: '\uc774\ubca4\ud2b8 \uce74\ub4dc \uba54\uc774\ucee4', href: '/event_card_maker.html', icon: '\ud83c\udf89' },
    { name: 'Reels Cover', title: '\ub9b4\uc2a4 \ucee4\ubc84 \uba54\uc774\ucee4', href: '/reels_cover_maker.html', icon: '\ud83c\udfac' },
    { name: 'Review Overlay', title: '\ub9ac\ubdf0 \uc624\ubc84\ub808\uc774', href: '/review_overlay_maker.html', icon: '\u2705' },
    { name: 'B/A Photo', title: 'B/A \ube44\uad50\uc0ac\uc9c4', href: '/ba_photo_maker.html', icon: '\ud83d\udcf7' },
    { name: 'Canva Templates', title: '\uce94\ubc14 \ud15c\ud50c\ub9bf', href: '/canva_templates.html', icon: '\ud83c\udfa8' },
    { name: 'Carousel Guide', title: '\uce90\ub7ec\uc140 \uac00\uc774\ub4dc', href: '/carousel_templates.html', icon: '\ud83d\uddc2' },
    { name: 'Photo Checklist', title: '\ucd2c\uc601 \uccb4\ud06c\ub9ac\uc2a4\ud2b8', href: '/\ud604\uc7a5\ucd2c\uc601_\uccb4\ud06c\ub9ac\uc2a4\ud2b8.html', icon: '\ud83d\udcf7' },
    { section: 'IMGROUND' },
    { name: 'IMGROUND Templates', title: 'IMGROUND 템플릿', href: '/imground_templates.html', icon: '🎓' },
  ];

  // Detect current page
  var currentPath = location.pathname;
  // Handle both /page.html and /page
  function isCurrentPage(href) {
    if (!href) return false;
    var decoded = decodeURIComponent(currentPath);
    var decodedHref = decodeURIComponent(href);
    return decoded === decodedHref || decoded.endsWith(decodedHref);
  }

  // Build sidebar HTML
  var sidebarItems = '';
  PAGES.forEach(function(p) {
    if (p.section) {
      sidebarItems += '<div class="im-nav-section">' + p.section + '</div>';
    } else {
      var active = isCurrentPage(p.href) ? ' im-nav-active' : '';
      sidebarItems += '<a class="im-nav-item' + active + '" href="' + p.href + '">' +
        '<span class="im-nav-icon">' + p.icon + '</span>' +
        '<span class="im-nav-title">' + p.title + '</span>' +
        '</a>';
    }
  });

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = [
    // Overlay
    '.im-nav-overlay{position:fixed;inset:0;background:rgba(26,20,16,0.5);z-index:99990;opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}',
    '.im-nav-overlay.open{opacity:1;visibility:visible}',
    // Sidebar
    '.im-nav-sidebar{position:fixed;top:0;left:0;bottom:0;width:280px;background:#1A1410;z-index:99991;transform:translateX(-100%);transition:transform .35s cubic-bezier(0.16,1,0.3,1);overflow-y:auto;-webkit-overflow-scrolling:touch}',
    '.im-nav-sidebar.open{transform:translateX(0)}',
    // Header
    '.im-nav-header{padding:32px 24px 20px;border-bottom:1px solid rgba(232,112,58,0.15)}',
    '.im-nav-brand{font-family:"Playfair Display",serif;font-size:18px;font-weight:500;color:#FAF8F5;letter-spacing:6px;text-transform:uppercase}',
    '.im-nav-sub{font-size:11px;color:rgba(255,248,240,0.3);letter-spacing:2px;margin-top:6px}',
    // Home link
    '.im-nav-home{display:flex;align-items:center;gap:12px;padding:16px 24px;color:#FAF8F5;text-decoration:none;font-size:14px;font-weight:600;border-bottom:1px solid rgba(232,112,58,0.1);transition:background .2s}',
    '.im-nav-home:hover{background:rgba(232,112,58,0.1)}',
    '.im-nav-home svg{width:18px;height:18px;color:#E8703A}',
    // Section label
    '.im-nav-section{padding:20px 24px 8px;font-size:10px;font-weight:700;color:rgba(255,248,240,0.25);letter-spacing:3px;text-transform:uppercase}',
    // Nav item
    '.im-nav-item{display:flex;align-items:center;gap:12px;padding:10px 24px;color:rgba(255,248,240,0.6);text-decoration:none;font-size:13px;font-weight:500;transition:all .2s;border-left:3px solid transparent}',
    '.im-nav-item:hover{background:rgba(232,112,58,0.08);color:#FAF8F5}',
    '.im-nav-active{color:#E8703A;border-left-color:#E8703A;background:rgba(232,112,58,0.06);font-weight:700}',
    '.im-nav-icon{font-size:16px;width:24px;text-align:center;flex-shrink:0}',
    '.im-nav-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    // FAB button
    '.im-nav-fab{position:fixed;bottom:32px;left:32px;width:52px;height:52px;border-radius:16px;background:#1A1410;color:#FAF8F5;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:99989;box-shadow:0 4px 20px rgba(26,20,16,0.25);transition:all .3s cubic-bezier(0.175,0.885,0.32,1.275)}',
    '.im-nav-fab:hover{background:#E8703A;transform:scale(1.08)}',
    '.im-nav-fab svg{width:22px;height:22px}',
    '.im-nav-fab.open svg{transform:rotate(90deg);transition:transform .3s}',
    // Mobile
    '@media(max-width:768px){.im-nav-fab{bottom:20px;left:20px;width:46px;height:46px;border-radius:14px}.im-nav-fab svg{width:20px;height:20px}.im-nav-sidebar{width:260px}}',
    // Print hide
    '@media print{.im-nav-fab,.im-nav-sidebar,.im-nav-overlay{display:none!important}}'
  ].join('\n');
  document.head.appendChild(style);

  // Inject HTML
  var wrapper = document.createElement('div');
  wrapper.innerHTML =
    '<div class="im-nav-overlay" id="imNavOverlay"></div>' +
    '<nav class="im-nav-sidebar" id="imNavSidebar">' +
      '<div class="im-nav-header">' +
        '<div class="im-nav-brand">IM AESTHETIC</div>' +
        '<div class="im-nav-sub">Wedding Care Specialist</div>' +
      '</div>' +
      '<a class="im-nav-home" href="/index.html">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
        'Home' +
      '</a>' +
      sidebarItems +
    '</nav>' +
    '<button class="im-nav-fab" id="imNavFab" aria-label="Navigation menu">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
    '</button>';

  // Append all children
  while (wrapper.firstChild) document.body.appendChild(wrapper.firstChild);

  // Sidebar toggle logic
  var fab = document.getElementById('imNavFab');
  var sidebar = document.getElementById('imNavSidebar');
  var overlay = document.getElementById('imNavOverlay');

  function openNav() { sidebar.classList.add('open'); overlay.classList.add('open'); fab.classList.add('open'); }
  function closeNav() { sidebar.classList.remove('open'); overlay.classList.remove('open'); fab.classList.remove('open'); }

  fab.addEventListener('click', function() {
    if (sidebar.classList.contains('open')) closeNav(); else openNav();
  });
  overlay.addEventListener('click', closeNav);

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeNav();
  });
})();
