/**
 * Solvia Nova — Main JavaScript
 * Lightweight utilities (Tailwind & Alpine loaded via CDN in HTML)
 */

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

/* ============================================================
   FLASH MESSAGE AUTO DISMISS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var flash = document.getElementById('flash-message');
  if (flash) {
    setTimeout(function () {
      flash.style.transition = 'opacity 0.5s ease';
      flash.style.opacity = '0';
      setTimeout(function () { flash.remove(); }, 500);
    }, 4000);
  }
});

/* ============================================================
   GALLERY LIGHTBOX (vanilla JS fallback)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var lightboxEl = document.getElementById('lightbox');
  if (!lightboxEl) return;

  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(function (item) {
    item.addEventListener('click', function () {
      var src = this.dataset.lightbox;
      var caption = this.dataset.caption || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightboxEl.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxEl.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightboxEl.addEventListener('click', function (e) {
    if (e.target === lightboxEl) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});

/* ============================================================
   COPY TO CLIPBOARD
   ============================================================ */
window.copyToClipboard = function (text) {
  navigator.clipboard.writeText(text).then(function () {
    var el = document.createElement('div');
    el.className = 'fixed bottom-6 right-6 z-50 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm rounded-xl';
    el.textContent = 'Copied!';
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2000);
  });
};

/* ============================================================
   PORTFOLIO FILTER (Alpine component)
   ============================================================ */
window.portfolioFilter = function () {
  return { filter: 'all' };
};

/* ============================================================
   LIGHTBOX ALPINE COMPONENT
   ============================================================ */
window.lightbox = function () {
  return {
    open: false,
    src: '',
    caption: '',
    show: function (src, caption) {
      this.src = src;
      this.caption = caption || '';
      this.open = true;
      document.body.style.overflow = 'hidden';
    },
    close: function () {
      this.open = false;
      document.body.style.overflow = '';
    }
  };
};

console.log('%c Solvia Nova ', 'background:#3b82f6;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;', '— Premium Digital Solution');
