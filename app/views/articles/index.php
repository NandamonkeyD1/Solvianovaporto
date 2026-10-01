<!-- ARTICLES PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up"><?= __e('articles.badge') ?></div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100"><?= __e('articles.h1') ?></h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200"><?= __e('articles.desc') ?></p>
  </div>
</section>

<section class="py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">

    <!-- Category filter -->
    <div class="flex flex-wrap gap-2 justify-center mb-12" data-aos="fade-up">
      <?php
      $filterCats = [__('articles.all'),'Digital Transformation','Web Development','System Design','Branding','Automation','Business'];
      foreach($filterCats as $cat):
        $isAll    = ($cat === __('articles.all'));
        $isActive = ($isAll && !isset($active_category)) || (isset($active_category) && $active_category === $cat);
        $href     = $isAll ? url('/articles') : url('/articles/category/'.slug($cat));
      ?>
      <a href="<?= $href ?>"
         class="px-5 py-2.5 border rounded-xl text-sm font-medium transition-all duration-200
                <?= $isActive ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20' ?>">
        <?= e($cat) ?>
      </a>
      <?php endforeach; ?>
    </div>

    <?php if(!empty($articles)): ?>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach($articles as $i => $article): ?>
      <a href="<?= url('/articles/'.e($article['slug'])) ?>" class="group block bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= ($i%3)*80 ?>">
        <div class="aspect-video bg-gradient-to-br from-blue-900/30 to-slate-900/60 overflow-hidden">
          <?php if(!empty($article['thumbnail'])): ?>
          <img src="<?= url($article['thumbnail']) ?>" alt="<?= e($article['title']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <?php else: ?>
          <div class="w-full h-full flex items-center justify-center">
            <svg class="w-12 h-12 text-blue-400/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <?php endif; ?>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full"><?= e($article['category'] ?? 'Insight') ?></span>
            <span class="text-slate-600 text-xs"><?= reading_time($article['content'] ?? '') ?> <?= __e('articles.min_read') ?></span>
          </div>
          <h2 class="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors line-clamp-2"><?= e($article['title']) ?></h2>
          <p class="text-slate-400 text-sm line-clamp-3 mb-4"><?= e(excerpt($article['excerpt'] ?? $article['content'] ?? '', 120)) ?></p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                <?= strtoupper(substr($article['author_name'] ?? 'S', 0, 1)) ?>
              </div>
              <span class="text-slate-500 text-xs"><?= e($article['author_name'] ?? 'Solvia Nova') ?></span>
            </div>
            <span class="text-slate-600 text-xs"><?= format_date($article['published_at'] ?? $article['created_at'] ?? date('Y-m-d')) ?></span>
          </div>
        </div>
      </a>
      <?php endforeach; ?>
    </div>

    <!-- Pagination -->
    <?php if(!empty($pagination) && $pagination['last_page'] > 1): ?>
    <div class="flex items-center justify-center gap-2 mt-12">
      <?php for($p=1; $p<=$pagination['last_page']; $p++): ?>
      <a href="?page=<?= $p ?>" class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
             <?= $p===$pagination['current_page'] ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20' ?>">
        <?= $p ?>
      </a>
      <?php endfor; ?>
    </div>
    <?php endif; ?>

    <?php else: ?>
    <div class="text-center py-20">
      <div class="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      </div>
      <p class="text-slate-500"><?= __e('articles.empty') ?></p>
    </div>
    <?php endif; ?>

  </div>
</section>
