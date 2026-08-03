/* Competitive Linux Gaming Guide — page logic.
   Fetches the markdown guide, renders it with marked, shifts heading
   levels (+1, cap h6), builds a scrollspy TOC, highlights labeled code
   blocks and adds copy buttons. Classic script: no build step, also runs
   from file:// (clipboard fallback included). */
(() => {
  'use strict';

  const MD_PATH = 'Competitive-Linux-Gaming-Guide.md';

  const article = document.getElementById('article');
  let scrollspy = null;

  /* ---------- Helpers ---------- */

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugify(text) {
    let slug = String(text).toLowerCase().replace(/\uFEFF/g, '');
    slug = slug.replace(/[^a-z0-9_\s-]+/g, '');
    slug = slug.trim().replace(/\s+/g, '-').replace(/-+/g, '-');
    slug = slug.replace(/^-+|-+$/g, '');
    return slug || 'section';
  }

  /* Allowlist of href schemes that may become live links/images: http,
     https, mailto, tel, and relative hrefs (#, /, ./ ../). Anything else
     (e.g. javascript:) is rejected by the renderer overrides below. */
  function isSafeHref(href) {
    const h = String(href).trim();
    return /^(#|\/|\.\/|\.\.\/)/.test(h) || /^(https?:|mailto:|tel:)/i.test(h);
  }

  /* ---------- Markdown rendering ---------- */

  if (typeof marked !== 'undefined' && typeof marked.use === 'function') {
    marked.use({
      gfm: true,
      renderer: {
        html(token) {
          return escapeHtml(token.text != null ? token.text : (token.raw != null ? token.raw : ''));
        },
        link(token) {
          const href = token.href != null ? token.href : '';
          if (isSafeHref(href)) {
            const title = token.title != null ? ' title="' + escapeHtml(token.title) + '"' : '';
            return '<a href="' + escapeHtml(href) + '"' + title + '>' +
              this.parser.parseInline(token.tokens) + '</a>';
          }
          return escapeHtml(token.text != null ? token.text : '');
        },
        image(token) {
          const href = token.href != null ? token.href : '';
          if (isSafeHref(href)) {
            const title = token.title != null ? ' title="' + escapeHtml(token.title) + '"' : '';
            return '<img src="' + escapeHtml(href) + '" alt="' +
              escapeHtml(token.text != null ? token.text : '') + '"' + title + '>';
          }
          return escapeHtml(token.text != null ? token.text : '');
        }
      }
    });
  }

  async function render() {
    const res = await fetch(MD_PATH);
    if (!res.ok) {
      throw new Error('Failed to fetch the guide (HTTP ' + res.status + ').');
    }
    let text = await res.text();
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.slice(1);
    }
    article.innerHTML = marked.parse(text);
    transform();
  }

  /* ---------- Post-processing ---------- */

  function transform() {
    /* a) heading level shift: h1..h6 -> h2..h6 (cap at h6), children preserved */
    const headings = Array.prototype.slice.call(article.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    for (const el of headings) {
      const level = parseInt(el.tagName.charAt(1), 10) + 1;
      if (level > 6) continue;
      const replacement = document.createElement('H' + level);
      while (el.firstChild) replacement.appendChild(el.firstChild);
      el.replaceWith(replacement);
    }

    /* b) unique ids for every heading */
    const seen = new Map();
    for (const h of article.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
      const base = slugify(h.textContent);
      const n = seen.get(base) || 0;
      h.id = n === 0 ? base : base + '-' + (n + 1);
      seen.set(base, n + 1);
    }

    /* c) highlight labeled code blocks only (unlabeled stay plain) */
    if (typeof window !== 'undefined' && window.hljs) {
      article.querySelectorAll('pre code').forEach((el) => {
        if (/language-[\w-]+/.test(el.className)) {
          hljs.highlightElement(el);
        }
      });
    }

    /* d) copy button on every code block */
    article.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;
      const code = pre.querySelector('code');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code block');
      btn.addEventListener('click', () => {
        const source = (code || pre).textContent;
        copyText(source).then(() => {
          flashCopyState(btn, 'Copied!', 'Copied code block');
        }).catch(() => {
          flashCopyState(btn, 'Copy failed', 'Copy failed');
        });
      });
      pre.appendChild(btn);
    });

    /* e) external links open in a new tab (scheme check on resolved href,
          case-insensitive: HTTPS:// and Http:// are caught too) */
    article.querySelectorAll('a').forEach((a) => {
      const href = String(a.href).trim().toLowerCase();
      if (href.startsWith('http://') || href.startsWith('https://')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    });

    /* f) table of contents (desktop sidebar + mobile details) */
    const tocHeadings = Array.prototype.slice.call(article.querySelectorAll('h2, h3, h4'));
    const desktopUl = document.querySelector('#toc > ul');
    const mobileUl = document.querySelector('#toc-mobile > ul');
    while (desktopUl.firstChild) desktopUl.removeChild(desktopUl.firstChild);
    while (mobileUl.firstChild) mobileUl.removeChild(mobileUl.firstChild);
    const desktopItems = [];
    const mobileItems = [];
    for (const h of tocHeadings) {
      desktopItems.push(makeTocItem(h));
      mobileItems.push(makeTocItem(h));
    }
    if (tocHeadings.length === 0) {
      document.getElementById('toc').style.display = 'none';
      document.getElementById('toc-mobile').style.display = 'none';
    } else {
      document.getElementById('toc').style.display = '';
      document.getElementById('toc-mobile').style.display = '';
      for (const li of desktopItems) desktopUl.appendChild(li);
      for (const li of mobileItems) mobileUl.appendChild(li);
    }

    /* g) scrollspy on h2/h3/h4 */
    if (scrollspy) scrollspy.disconnect();
    if (typeof IntersectionObserver !== 'undefined' && tocHeadings.length > 0) {
      const pairs = tocHeadings.map((h, i) => [h, desktopItems[i].firstElementChild, mobileItems[i].firstElementChild]);
      scrollspy = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const pair = pairs.find((p) => p[0] === entry.target);
          if (pair) setActiveToc(pair[1], pair[2]);
        }
      }, { rootMargin: '-15% 0px -75% 0px' });
      for (const pair of pairs) scrollspy.observe(pair[0]);
    }
  }

  function makeTocItem(heading) {
    const li = document.createElement('li');
    li.setAttribute('data-level', heading.tagName.charAt(1));
    const a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;
    li.appendChild(a);
    return li;
  }

  function setActiveToc(desktopLink, mobileLink) {
    const active = document.querySelectorAll('#toc .toc-active, #toc-mobile .toc-active');
    for (const el of active) {
      el.classList.remove('toc-active');
      el.removeAttribute('aria-current');
    }
    for (const el of [desktopLink, mobileLink]) {
      el.classList.add('toc-active');
      el.setAttribute('aria-current', 'true');
    }
  }

  /* ---------- Clipboard ---------- */

  function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    ta.remove();
    if (!ok) throw new Error('Clipboard copy failed.');
  }

  function flashCopyState(btn, label, ariaLabel) {
    btn.textContent = label;
    btn.classList.add('copied');
    btn.setAttribute('aria-label', ariaLabel);
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
      btn.setAttribute('aria-label', 'Copy code block');
    }, 2000);
  }

  /* ---------- Error handling + init ---------- */

  function showError(err) {
    console.error('Failed to render guide:', err);
    article.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'error-card';
    const title = document.createElement('p');
    title.className = 'error-title';
    title.textContent = 'Could not load the guide.';
    const message = document.createElement('p');
    message.className = 'error-message';
    message.textContent = err && err.message ? err.message : String(err);
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'retry-btn';
    retry.textContent = 'Retry';
    retry.addEventListener('click', loadGuide);
    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(retry);
    article.appendChild(card);
  }

  function loadGuide() {
    render().catch(showError);
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadGuide);
    } else {
      loadGuide();
    }
  }

  init();
})();
