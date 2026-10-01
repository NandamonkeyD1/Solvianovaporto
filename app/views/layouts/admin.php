<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= isset($pageTitle) ? e($pageTitle).' — ' : '' ?>Admin Solvia Nova</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <!-- TailwindCSS — self-hosted -->
  <script src="<?= asset('js/tailwind.min.js') ?>"></script>
  <script>tailwind.config={theme:{extend:{colors:{primary:'#060816',secondary:'#0F172A'},fontFamily:{sans:['Inter','system-ui','sans-serif']}}}}</script>
  <!-- AlpineJS — self-hosted -->
  <script defer src="<?= asset('js/alpine.min.js') ?>"></script>
  <link rel="stylesheet" href="<?= asset('css/app.css') ?>">
</head>
<body class="bg-[#060816] text-white antialiased" x-data="{ sidebarOpen: true }">

<div class="flex min-h-screen">
  <!-- Sidebar -->
  <aside :class="sidebarOpen ? 'w-64' : 'w-16'" class="fixed left-0 top-0 h-full bg-[#0F172A] border-r border-white/8 transition-all duration-300 z-40 flex flex-col">
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 py-5 border-b border-white/8">
      <img src="<?= asset('images/Solvia.png') ?>" alt="Solvia Nova" class="h-8 w-auto object-contain flex-shrink-0">
      <span x-show="sidebarOpen" class="text-white font-bold text-sm truncate">Solvia <span class="text-blue-400">Nova</span></span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-4 overflow-y-auto">
      <?php
      $adminNav = [
        ['dashboard','Dashboard','M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'],
        ['portfolio','Portfolio','M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'],
        ['services','Services','M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
        ['categories','Kategori','M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'],
        ['gallery','Gallery','M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
        ['team','Team','M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'],
        ['articles','Articles','M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
        ['testimonials','Testimonials','M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'],
        ['messages','Messages','M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
        ['seo','SEO','M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'],
        ['invoice','Invoice','M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'],
        ['settings','Settings','M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'],
      ];
      $currentPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
      foreach($adminNav as [$key,$label,$svgPath]):
        $href = url('/sso/'.($key === 'dashboard' ? 'dashboard' : $key));
        $isActive = str_contains($currentPath, '/sso/'.$key) || ($key === 'dashboard' && $currentPath === '/sso/dashboard');
      ?>
      <a href="<?= $href ?>" class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-200 group
                <?= $isActive ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5' ?>">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="<?= $svgPath ?>"/></svg>
        <span x-show="sidebarOpen" class="text-sm font-medium"><?= $label ?></span>
      </a>
      <?php endforeach; ?>
    </nav>

    <!-- Bottom -->
    <div class="p-4 border-t border-white/8">
      <a href="<?= url('/sso/logout') ?>" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        <span x-show="sidebarOpen" class="text-sm font-medium">Logout</span>
      </a>
    </div>
  </aside>

  <!-- Main -->
  <div :class="sidebarOpen ? 'ml-64' : 'ml-16'" class="flex-1 transition-all duration-300">
    <!-- Top bar -->
    <header class="sticky top-0 z-30 bg-[#060816]/90 backdrop-blur-xl border-b border-white/8 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="sidebarOpen = !sidebarOpen" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <h1 class="text-white font-semibold"><?= isset($pageTitle) ? e($pageTitle) : 'Dashboard' ?></h1>
      </div>
      <div class="flex items-center gap-3">
        <a href="<?= url('/') ?>" target="_blank" class="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs rounded-lg transition-colors flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          View Site
        </a>
        <div class="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
          <?= strtoupper(substr($_SESSION['admin_name'] ?? 'A', 0, 1)) ?>
        </div>
      </div>
    </header>

    <!-- Flash -->
    <?php $flash = get_flash(); if($flash): ?>
    <div class="mx-6 mt-4 px-5 py-3 rounded-xl text-sm font-medium <?= $flash['type'] === 'success' ? 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-300' : 'bg-red-500/15 border border-red-500/25 text-red-300' ?>">
      <?= e($flash['message']) ?>
    </div>
    <?php endif; ?>

    <!-- Content -->
    <main class="p-6">
      <?= $content ?>
    </main>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded',function(){
  var els=document.querySelectorAll('[data-aos]');
  if(!els.length)return;
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){var d=parseInt(e.target.getAttribute('data-aos-delay')||'0');setTimeout(function(){e.target.classList.add('aos-animate');},d);obs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){obs.observe(el);});
});
</script>
</body>
</html>
