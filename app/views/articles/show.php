<!-- ARTICLE DETAIL -->
<section class="relative pt-32 pb-12 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
  </div>
  <div class="relative max-w-4xl mx-auto px-6 lg:px-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <a href="<?= url('/') ?>" class="hover:text-white transition-colors">Home</a>
      <span>/</span>
      <a href="<?= url('/articles') ?>" class="hover:text-white transition-colors">Articles</a>
      <span>/</span>
      <span class="text-slate-300 line-clamp-1"><?= e($article['title']) ?></span>
    </nav>
    <!-- Category & meta -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <span class="px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-medium rounded-full"><?= e($article['category'] ?? 'Insight') ?></span>
      <span class="text-slate-500 text-sm"><?= reading_time($article['content'] ?? '') ?> min read</span>
      <span class="text-slate-500 text-sm"><?= format_date($article['published_at'] ?? $article['created_at'] ?? date('Y-m-d')) ?></span>
    </div>
    <h1 class="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6"><?= e($article['title']) ?></h1>
    <?php if(!empty($article['excerpt'])): ?>
    <p class="text-slate-400 text-xl leading-relaxed mb-8"><?= e($article['excerpt']) ?></p>
    <?php endif; ?>
    <!-- Author -->
    <div class="flex items-center gap-3 pb-8 border-b border-white/8">
      <div class="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
        <?= strtoupper(substr($article['author_name'] ?? 'S', 0, 1)) ?>
      </div>
      <div>
        <div class="text-white font-medium text-sm"><?= e($article['author_name'] ?? 'Tim Solvia Nova') ?></div>
        <div class="text-slate-500 text-xs">Solvia Nova</div>
      </div>
    </div>
  </div>
</section>

<!-- Thumbnail -->
<?php if(!empty($article['thumbnail'])): ?>
<div class="max-w-4xl mx-auto px-6 lg:px-8 mb-12">
  <div class="rounded-2xl overflow-hidden border border-white/8">
    <img src="<?= url($article['thumbnail']) ?>" alt="<?= e($article['title']) ?>" class="w-full object-cover">
  </div>
</div>
<?php endif; ?>

<!-- Content -->
<section class="py-8">
  <div class="max-w-4xl mx-auto px-6 lg:px-8">
    <div class="article-content text-slate-300 leading-relaxed">
      <?= $article['content'] ?>
    </div>

    <!-- Tags -->
    <?php if(!empty($article['tags'])): ?>
    <div class="mt-10 pt-8 border-t border-white/8">
      <div class="flex flex-wrap gap-2">
        <?php foreach(explode(',', $article['tags']) as $tag): ?>
        <span class="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 text-sm rounded-lg">#<?= e(trim($tag)) ?></span>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>

    <!-- Share -->
    <div class="mt-8 pt-8 border-t border-white/8 flex items-center gap-4">
      <span class="text-slate-500 text-sm">Share:</span>
      <a href="https://twitter.com/intent/tweet?url=<?= urlencode(APP_URL.'/articles/'.$article['slug']) ?>&text=<?= urlencode($article['title']) ?>" target="_blank" class="px-4 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg transition-colors">Twitter</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?= urlencode(APP_URL.'/articles/'.$article['slug']) ?>" target="_blank" class="px-4 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg transition-colors">LinkedIn</a>
      <a href="https://wa.me/?text=<?= urlencode($article['title'].' '.APP_URL.'/articles/'.$article['slug']) ?>" target="_blank" class="px-4 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg transition-colors">WhatsApp</a>
    </div>
  </div>
</section>

<!-- Related -->
<?php if(!empty($related)): ?>
<section class="py-16 bg-[#0F172A]/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <h2 class="text-2xl font-bold text-white mb-8">Artikel Terkait</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <?php foreach($related as $r): ?>
      <a href="<?= url('/articles/'.e($r['slug'])) ?>" class="group block bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div class="aspect-video bg-gradient-to-br from-blue-900/30 to-slate-900/60 overflow-hidden">
          <?php if(!empty($r['thumbnail'])): ?>
          <img src="<?= url($r['thumbnail']) ?>" alt="<?= e($r['title']) ?>" class="w-full h-full object-cover" loading="lazy">
          <?php endif; ?>
        </div>
        <div class="p-4">
          <div class="text-blue-400 text-xs mb-1"><?= e($r['category'] ?? 'Insight') ?></div>
          <div class="text-white font-semibold group-hover:text-blue-300 transition-colors line-clamp-2"><?= e($r['title']) ?></div>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>
