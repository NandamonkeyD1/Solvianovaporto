<!-- Stats -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <?php foreach([
    ['Total Portfolio',$totalPortfolio,'blue','M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'],
    ['Total Artikel',$totalArticle,'violet','M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
    ['Total Pesan',$totalMessage,'emerald','M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
    ['Pesan Belum Dibaca',$unreadMessage,'red','M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'],
  ] as [$label,$value,$color,$svgPath]): ?>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-5">
    <div class="flex items-center justify-between mb-3">
      <div class="w-9 h-9 rounded-xl bg-<?= $color ?>-500/15 border border-<?= $color ?>-500/20 flex items-center justify-center">
        <svg class="w-4.5 h-4.5 text-<?= $color ?>-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="<?= $svgPath ?>"/></svg>
      </div>
    </div>
    <div class="text-3xl font-bold text-white mb-1"><?= $value ?></div>
    <div class="text-slate-500 text-sm"><?= $label ?></div>
  </div>
  <?php endforeach; ?>
</div>

<!-- Quick actions -->
<div class="grid lg:grid-cols-2 gap-6 mb-8">
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold mb-4">Quick Actions</h3>
    <div class="grid grid-cols-2 gap-3">
      <?php foreach([
        ['/sso/portfolio/create','Tambah Portfolio','blue'],
        ['/sso/articles/create','Tulis Artikel','violet'],
        ['/sso/gallery/create','Upload Gallery','emerald'],
        ['/sso/team/create','Tambah Tim','pink'],
      ] as [$href,$label,$color]): ?>
      <a href="<?= url($href) ?>" class="flex items-center gap-2 px-4 py-3 bg-<?= $color ?>-500/10 border border-<?= $color ?>-500/20 hover:bg-<?= $color ?>-500/20 text-<?= $color ?>-400 rounded-xl text-sm font-medium transition-all duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        <?= $label ?>
      </a>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Recent messages -->
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-white font-bold">Pesan Terbaru</h3>
      <a href="<?= url('/sso/messages') ?>" class="text-blue-400 hover:text-blue-300 text-xs transition-colors">Lihat semua</a>
    </div>
    <?php if(!empty($recentMessages)): ?>
    <div class="space-y-3">
      <?php foreach($recentMessages as $msg): ?>
      <div class="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
        <div class="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs flex-shrink-0">
          <?= strtoupper(substr($msg['name'], 0, 1)) ?>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="text-white text-sm font-medium"><?= e($msg['name']) ?></span>
            <?php if(!$msg['is_read']): ?>
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <?php endif; ?>
          </div>
          <p class="text-slate-500 text-xs truncate"><?= e($msg['subject'] ?: $msg['message']) ?></p>
        </div>
        <span class="text-slate-600 text-xs flex-shrink-0"><?= time_ago($msg['created_at']) ?></span>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?>
    <p class="text-slate-500 text-sm">Belum ada pesan masuk.</p>
    <?php endif; ?>
  </div>
</div>

<!-- Nav shortcuts -->
<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
  <h3 class="text-white font-bold mb-4">Kelola Konten</h3>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <?php foreach([
      ['/sso/portfolio','Portfolio','M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'],
      ['/sso/services','Services','M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
      ['/sso/gallery','Gallery','M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
      ['/sso/team','Team','M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'],
      ['/sso/articles','Articles','M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
      ['/sso/testimonials','Testimonials','M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'],
      ['/sso/messages','Messages','M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
      ['/sso/seo','SEO','M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'],
    ] as [$href,$label,$svgPath]): ?>
    <a href="<?= url($href) ?>" class="flex items-center gap-3 px-4 py-3 bg-white/3 border border-white/8 hover:border-blue-500/30 hover:bg-blue-500/5 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-all duration-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="<?= $svgPath ?>"/></svg>
      <?= $label ?>
    </a>
    <?php endforeach; ?>
  </div>
</div>
