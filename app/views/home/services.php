<!-- SERVICES PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up"><?= __e('services.badge') ?></div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100"><?= __e('services.h1') ?></h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200"><?= __e('services.hero_desc') ?></p>
  </div>
</section>

<?php
$serviceData = __('services.categories');
$icons  = ['globe-alt','cpu-chip','paint-brush','bolt'];
$colors = ['blue','violet','pink','emerald'];
foreach($serviceData as $i => [$catTitle,$catDesc,$items]):
  $icon    = $icons[$i]  ?? 'bolt';
  $color   = $colors[$i] ?? 'blue';
  $isEven  = $i % 2 === 0;
?>
<section class="py-20 <?= $isEven ? '' : 'bg-[#0F172A]/30' ?>">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-start">
      <div class="<?= $isEven ? '' : 'lg:order-2' ?>" data-aos="<?= $isEven ? 'fade-right' : 'fade-left' ?>">
        <div class="w-14 h-14 rounded-2xl bg-<?= $color ?>-500/15 border border-<?= $color ?>-500/20 flex items-center justify-center mb-6">
          <svg class="w-7 h-7 text-<?= $color ?>-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <?php if($icon==='globe-alt'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            <?php elseif($icon==='cpu-chip'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
            <?php elseif($icon==='paint-brush'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
            <?php else: ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            <?php endif; ?>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white mb-4"><?= e($catTitle) ?></h2>
        <p class="text-slate-400 leading-relaxed mb-8"><?= e($catDesc) ?></p>
        <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-6 py-3 bg-<?= $color ?>-600/20 hover:bg-<?= $color ?>-600/30 border border-<?= $color ?>-500/30 text-<?= $color ?>-400 font-medium rounded-xl transition-all duration-200 text-sm">
          <?= __e('services.discuss_btn') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
      <div class="<?= $isEven ? '' : 'lg:order-1' ?> grid grid-cols-1 gap-4" data-aos="<?= $isEven ? 'fade-left' : 'fade-right' ?>">
        <?php foreach($items as $j => [$itemTitle,$itemDesc]): ?>
        <div class="bg-[#0F172A]/60 border border-white/8 hover:border-<?= $color ?>-500/30 rounded-xl p-5 transition-all duration-200 group">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-lg bg-<?= $color ?>-500/15 border border-<?= $color ?>-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-<?= $color ?>-400 text-xs font-bold"><?= str_pad($j+1,2,'0',STR_PAD_LEFT) ?></span>
            </div>
            <div>
              <h3 class="text-white font-semibold mb-1 group-hover:text-<?= $color ?>-300 transition-colors"><?= e($itemTitle) ?></h3>
              <p class="text-slate-400 text-sm leading-relaxed"><?= e($itemDesc) ?></p>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
<?php endforeach; ?>

<!-- CTA -->
<section class="py-20">
  <div class="max-w-3xl mx-auto px-6 text-center" data-aos="fade-up">
    <div class="bg-gradient-to-br from-blue-600/15 to-blue-900/15 border border-blue-500/20 rounded-3xl p-10">
      <h2 class="text-3xl font-bold text-white mb-4"><?= __e('services.cta_h2') ?></h2>
      <p class="text-slate-400 mb-8"><?= __e('services.cta_desc') ?></p>
      <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30">
        <?= __e('services.cta_btn') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </div>
</section>
