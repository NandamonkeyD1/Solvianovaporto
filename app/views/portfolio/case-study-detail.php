<!-- CASE STUDY DETAIL -->
<section class="relative pt-32 pb-12 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-5xl mx-auto px-6 lg:px-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <a href="<?= url('/') ?>" class="hover:text-white transition-colors">Home</a>
      <span>/</span>
      <a href="<?= url('/case-study') ?>" class="hover:text-white transition-colors">Case Study</a>
      <span>/</span>
      <span class="text-slate-300"><?= e($portfolio['name']) ?></span>
    </nav>

    <div class="flex flex-wrap items-center gap-3 mb-6">
      <span class="px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-medium rounded-full"><?= e($portfolio['category']) ?></span>
      <?php if(!empty($portfolio['year'])): ?>
      <span class="text-slate-500 text-sm"><?= e($portfolio['year']) ?></span>
      <?php endif; ?>
    </div>

    <h1 class="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6" data-aos="fade-up">
      Case Study: <?= e($portfolio['name']) ?>
    </h1>
    <p class="text-slate-400 text-xl leading-relaxed max-w-3xl" data-aos="fade-up" data-aos-delay="100">
      <?= e($portfolio['short_desc'] ?? '') ?>
    </p>
  </div>
</section>

<!-- Thumbnail -->
<?php if(!empty($portfolio['thumbnail'])): ?>
<div class="max-w-5xl mx-auto px-6 lg:px-8 mb-16">
  <div class="rounded-2xl overflow-hidden border border-white/8">
    <img src="<?= url($portfolio['thumbnail']) ?>" alt="<?= e($portfolio['name']) ?>" class="w-full object-cover">
  </div>
</div>
<?php endif; ?>

<!-- Project Info Bar -->
<section class="py-8 border-y border-white/5 bg-[#0F172A]/30">
  <div class="max-w-5xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <?php if(!empty($portfolio['client'])): ?>
      <div>
        <div class="text-slate-500 text-xs uppercase tracking-wide mb-1">Client</div>
        <div class="text-white font-semibold"><?= e($portfolio['client']) ?></div>
      </div>
      <?php endif; ?>
      <?php if(!empty($portfolio['year'])): ?>
      <div>
        <div class="text-slate-500 text-xs uppercase tracking-wide mb-1">Tahun</div>
        <div class="text-white font-semibold"><?= e($portfolio['year']) ?></div>
      </div>
      <?php endif; ?>
      <?php if(!empty($portfolio['category'])): ?>
      <div>
        <div class="text-slate-500 text-xs uppercase tracking-wide mb-1">Kategori</div>
        <div class="text-white font-semibold"><?= e($portfolio['category']) ?></div>
      </div>
      <?php endif; ?>
      <?php if(!empty($portfolio['tech_stack'])): ?>
      <div>
        <div class="text-slate-500 text-xs uppercase tracking-wide mb-2">Teknologi</div>
        <div class="flex flex-wrap gap-1">
          <?php foreach(array_slice(explode(',', $portfolio['tech_stack']), 0, 3) as $tech): ?>
          <span class="px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 text-xs rounded"><?= e(trim($tech)) ?></span>
          <?php endforeach; ?>
        </div>
      </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- Case Study Content -->
<?php
$cs = [];
if (!empty($portfolio['case_study'])) {
    $cs = json_decode($portfolio['case_study'], true) ?? [];
}
?>
<section class="py-16">
  <div class="max-w-5xl mx-auto px-6 lg:px-8">
    <?php if (!empty($cs)): ?>
    <div class="space-y-8">
      <?php
      $sections = [
        ['Problem',  'Masalah yang Dihadapi',  'red',     'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'],
        ['Analysis', 'Analisis Mendalam',       'yellow',  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
        ['Solution', 'Solusi yang Diterapkan',  'blue',    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'],
        ['Technology','Teknologi yang Digunakan','violet',  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'],
        ['Result',   'Hasil yang Dicapai',      'emerald', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
      ];
      foreach ($sections as $idx => [$key, $label, $color, $svgPath]):
        if (empty($cs[$key])) continue;
      ?>
      <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="<?= $idx * 80 ?>">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-12 h-12 rounded-xl bg-<?= $color ?>-500/15 border border-<?= $color ?>-500/20 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-<?= $color ?>-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="<?= $svgPath ?>"/>
            </svg>
          </div>
          <div>
            <div class="text-<?= $color ?>-400 text-xs font-semibold uppercase tracking-widest mb-0.5"><?= $key ?></div>
            <h2 class="text-white font-bold text-xl"><?= $label ?></h2>
          </div>
        </div>
        <p class="text-slate-400 leading-relaxed text-base"><?= e($cs[$key]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?>
    <!-- No case study data -->
    <div class="text-center py-16">
      <div class="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      </div>
      <p class="text-slate-500">Detail case study belum tersedia.</p>
    </div>
    <?php endif; ?>

    <!-- Description if available -->
    <?php if(!empty($portfolio['description'])): ?>
    <div class="mt-12 pt-12 border-t border-white/8">
      <h2 class="text-2xl font-bold text-white mb-6">Detail Project</h2>
      <div class="article-content text-slate-300 leading-relaxed">
        <?= $portfolio['description'] ?>
      </div>
    </div>
    <?php endif; ?>
  </div>
</section>

<!-- CTA -->
<section class="py-16">
  <div class="max-w-3xl mx-auto px-6 text-center" data-aos="fade-up">
    <div class="bg-gradient-to-br from-blue-600/15 to-blue-900/15 border border-blue-500/20 rounded-3xl p-10">
      <h2 class="text-2xl font-bold text-white mb-4">Ingin Hasil Serupa untuk Bisnis Anda?</h2>
      <p class="text-slate-400 mb-8">Mari diskusikan bagaimana kami bisa membantu transformasi digital bisnis Anda.</p>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30">
          Konsultasi Gratis <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
        <a href="<?= url('/portfolio') ?>" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl transition-all duration-200">
          Lihat Portfolio Lainnya
        </a>
      </div>
    </div>
  </div>
</section>
