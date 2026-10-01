<!DOCTYPE html>
<html lang="<?= lang() ?>" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php seo_meta($meta ?? []); ?>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="<?= asset('images/favicon.svg') ?>">
    <link rel="apple-touch-icon" href="<?= asset('images/apple-touch-icon.png') ?>">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- TailwindCSS — self-hosted (no CDN dependency) -->
    <script>
      window.tailwind = window.tailwind || {};
    </script>
    <script src="<?= asset('js/tailwind.min.js') ?>"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: { primary: '#060816', secondary: '#0F172A' },
            fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
          }
        }
      }
    </script>

    <!-- AlpineJS — self-hosted -->
    <script defer src="<?= asset('js/alpine.min.js') ?>"></script>

    <!-- Main CSS -->
    <link rel="stylesheet" href="<?= asset('css/app.css') ?>">

    <!-- Three.js Importmap -->
    <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/"
      }
    }
    </script>

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Solvia Nova",
        "url": "<?= APP_URL ?>",
        "logo": "<?= asset('images/logo.svg') ?>",
        "description": "<?= e(SEO_DESC) ?>",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "ID"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "Indonesian"
        },
        "sameAs": [
            "https://instagram.com/solvianova",
            "https://linkedin.com/company/solvianova"
        ]
    }
    </script>
    <style>
      #scene { position: fixed; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; pointer-events: none; }
      .overlay-3d { position: fixed; inset: 0; pointer-events: none; z-index: 0; background:
        radial-gradient(circle at 50% 45%,rgba(255,222,89,.08),transparent 28%),
        radial-gradient(circle at 80% 20%,rgba(59,130,246,.12),transparent 32%),
        linear-gradient(180deg,rgba(4,13,35,.08),rgba(4,13,35,.28)); }
      .dot-glow { width:7px; height:7px; background:#ffde59; border-radius:50%; box-shadow:0 0 18px #ffde59; }
      .text-nova-yellow { color:#ffde59; text-shadow:0 0 35px rgba(255,222,89,.18); }
      .chip-3d { padding:9px 13px; border-radius:12px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.09); color:#9eafd0; font-size:11px; letter-spacing:.08em; text-transform:uppercase; backdrop-filter:blur(12px); }
    </style>
</head>
<body class="bg-[#06132f] text-white antialiased overflow-x-hidden relative" x-data="{ mobileMenu: false }">

    <!-- 3D Scene Canvas & Glow Overlay -->
    <canvas id="scene"></canvas>
    <div class="overlay-3d"></div>

    <!-- Noise texture overlay (subtle) -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style="background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);background-size:20px 20px;"></div>

    <!-- Navbar -->
    <?php
    // Load settings globally for navbar, footer, and all components
    if (!isset($settings)) {
        require_once APP_PATH . '/models/Setting.php';
        $settingModel = new Setting();
        $settings = $settingModel->getAll();
    }
    component('navbar') ?>

    <!-- Main Content -->
    <main id="main-content">
        <?= $content ?>
    </main>

    <!-- Footer -->
    <?php component('footer') ?>

    <!-- Scripts (AOS + utilities only, Tailwind/Alpine loaded in head) -->
    <script>
    // Lightweight AOS init
    document.addEventListener('DOMContentLoaded', function() {
      const els = document.querySelectorAll('[data-aos]');
      if (!els.length) return;
      const obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            const d = parseInt(e.target.getAttribute('data-aos-delay') || '0');
            setTimeout(function() { e.target.classList.add('aos-animate'); }, d);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function(el) { obs.observe(el); });
    });
    </script>

    <!-- Flash Message -->
    <?php $flash = get_flash(); if ($flash): ?>
    <div id="flash-message" class="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl text-sm font-medium shadow-2xl
        <?= $flash['type'] === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/20 border border-red-500/30 text-red-300' ?>">
        <?= e($flash['message']) ?>
    </div>
    <script>
        setTimeout(() => {
            const el = document.getElementById('flash-message');
            if (el) el.style.opacity = '0', el.style.transition = 'opacity 0.5s', setTimeout(() => el.remove(), 500);
        }, 4000);
    </script>
    <?php endif; ?>

    <!-- Solvia Nova 3D Scene Script -->
    <script type="module" src="<?= asset('js/nova-3d.js') ?>"></script>
</body>
</html>
