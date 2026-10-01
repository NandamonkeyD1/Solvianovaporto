<!-- PORTFOLIO DETAIL -->
<section class="relative pt-32 pb-12 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <a href="<?= url('/') ?>" class="hover:text-white transition-colors">Home</a>
      <span>/</span>
      <a href="<?= url('/portfolio') ?>" class="hover:text-white transition-colors">Portfolio</a>
      <span>/</span>
      <span class="text-slate-300"><?= e($portfolio['name']) ?></span>
    </nav>
    <div class="grid lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <span class="inline-block px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-medium rounded-full mb-4"><?= e($portfolio['category']) ?></span>
        <h1 class="text-3xl lg:text-5xl font-bold text-white mb-6"><?= e($portfolio['name']) ?></h1>
        <p class="text-slate-400 text-lg leading-relaxed"><?= e($portfolio['short_desc'] ?? '') ?></p>
      </div>
      <div class="space-y-4">
        <?php if(!empty($portfolio['client'])): ?>
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-xl p-4">
          <div class="text-slate-500 text-xs mb-1">Client</div>
          <div class="text-white font-medium"><?= e($portfolio['client']) ?></div>
        </div>
        <?php endif; ?>
        <?php if(!empty($portfolio['year'])): ?>
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-xl p-4">
          <div class="text-slate-500 text-xs mb-1">Tahun</div>
          <div class="text-white font-medium"><?= e($portfolio['year']) ?></div>
        </div>
        <?php endif; ?>
        <?php if(!empty($portfolio['tech_stack'])): ?>
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-xl p-4">
          <div class="text-slate-500 text-xs mb-2">Teknologi</div>
          <div class="flex flex-wrap gap-2">
            <?php foreach(explode(',', $portfolio['tech_stack']) as $tech): ?>
            <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs rounded-lg"><?= e(trim($tech)) ?></span>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>
        <?php if(!empty($portfolio['project_url'])): ?>
        <a href="<?= e($portfolio['project_url']) ?>" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">
          Lihat Live Project <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
        <?php endif; ?>
        <?php if(!empty($portfolio['github_url'])): ?>
        <a href="<?= e($portfolio['github_url']) ?>" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all duration-200 text-sm">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          Lihat di GitHub
        </a>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<!-- Thumbnail -->
<?php if(!empty($portfolio['thumbnail'])): ?>
<div class="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
  <div class="rounded-2xl overflow-hidden border border-white/8">
    <img src="<?= url($portfolio['thumbnail']) ?>" alt="<?= e($portfolio['name']) ?>" class="w-full object-cover">
  </div>
</div>
<?php endif; ?>

<!-- Content -->
<?php if(!empty($portfolio['description'])): ?>
<section class="py-12">
  <div class="max-w-4xl mx-auto px-6 lg:px-8">
    <div class="prose prose-invert prose-blue max-w-none text-slate-300 leading-relaxed">
      <?= $portfolio['description'] ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Case Study if available -->
<?php if(!empty($portfolio['case_study'])): ?>
<section class="py-12 bg-[#0F172A]/30">
  <div class="max-w-4xl mx-auto px-6 lg:px-8">
    <h2 class="text-2xl font-bold text-white mb-8">Case Study</h2>
    <?php $cs = json_decode($portfolio['case_study'], true) ?? []; ?>
    <div class="space-y-6">
      <?php foreach([['Problem','Masalah yang Dihadapi','red'],['Analysis','Analisis Mendalam','yellow'],['Solution','Solusi yang Diterapkan','blue'],['Result','Hasil yang Dicapai','emerald']] as [$key,$label,$color]): ?>
      <?php if(!empty($cs[$key])): ?>
      <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-<?= $color ?>-500/15 border border-<?= $color ?>-500/20 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-<?= $color ?>-400"></div>
          </div>
          <h3 class="text-white font-bold"><?= $label ?></h3>
        </div>
        <p class="text-slate-400 leading-relaxed"><?= e($cs[$key]) ?></p>
      </div>
      <?php endif; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Related -->
<?php if(!empty($related)): ?>
<section class="py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <h2 class="text-2xl font-bold text-white mb-8">Project Terkait</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <?php foreach($related as $r): ?>
      <a href="<?= url('/portfolio/'.e($r['slug'])) ?>" class="group block bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div class="aspect-video bg-gradient-to-br from-blue-900/30 to-slate-900/60">
          <?php if(!empty($r['thumbnail'])): ?>
          <img src="<?= url($r['thumbnail']) ?>" alt="<?= e($r['name']) ?>" class="w-full h-full object-cover" loading="lazy">
          <?php endif; ?>
        </div>
        <div class="p-4">
          <div class="text-blue-400 text-xs mb-1"><?= e($r['category']) ?></div>
          <div class="text-white font-semibold group-hover:text-blue-300 transition-colors"><?= e($r['name']) ?></div>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>
