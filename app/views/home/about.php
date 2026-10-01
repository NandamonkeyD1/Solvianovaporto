<!-- ABOUT PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
    <div class="max-w-3xl" data-aos="fade-up">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('about.badge') ?></div>
      <h1 class="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
        <?= __e('about.h1') ?><br><span class="text-blue-400"><?= __e('about.h1_highlight') ?></span>
      </h1>
      <p class="text-slate-400 text-xl leading-relaxed"><?= __e('about.hero_desc') ?></p>
    </div>
  </div>
</section>

<!-- STORY -->
<section class="py-20">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div data-aos="fade-right">
        <h2 class="text-3xl font-bold text-white mb-6"><?= __e('about.story_h2') ?></h2>
        <div class="space-y-4 text-slate-400 leading-relaxed">
          <p><?= __e('about.story_p1') ?></p>
          <p><?= __e('about.story_p2') ?></p>
          <p><?= __e('about.story_p3') ?></p>
        </div>
      </div>
      <div data-aos="fade-left">
        <div class="grid grid-cols-2 gap-4">
          <?php foreach([
            ['🚀',__('value.innovation_title'), __('value.innovation_desc')],
            ['🤝',__('value.partnership_title'),__('value.partnership_desc')],
            ['⚡',__('value.performance_title'),__('value.performance_desc')],
            ['🎯',__('value.mission_title'),    __('value.mission_desc')],
          ] as [$icon,$title,$desc]): ?>
          <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-5">
            <div class="text-3xl mb-3"><?= $icon ?></div>
            <div class="text-white font-bold text-sm mb-2"><?= e($title) ?></div>
            <div class="text-slate-500 text-xs leading-relaxed"><?= e($desc) ?></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="py-20 bg-[#0F172A]/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <!-- Visi & Misi -->
    <div class="grid lg:grid-cols-2 gap-8 mb-16">
      <div class="bg-[#0F172A]/60 border border-blue-500/20 rounded-2xl p-8" data-aos="fade-right">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </div>
          <h3 class="text-white font-bold text-xl"><?= __e('about.vision_h') ?></h3>
        </div>
        <p class="text-slate-300 leading-relaxed"><?= __e('about.vision_text') ?></p>
      </div>
      <div class="space-y-4" data-aos="fade-left">
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 rounded-lg bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <h4 class="text-white font-bold"><?= __e('about.philosophy_h') ?></h4>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed"><?= __e('about.philosophy_text') ?></p>
        </div>
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h4 class="text-white font-bold"><?= __e('about.commitment_h') ?></h4>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed"><?= __e('about.commitment_text') ?></p>
        </div>
      </div>
    </div>

    <!-- Mission -->
    <div class="mb-16" data-aos="fade-up">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-white mb-3"><?= __e('about.mission_h2') ?></h2>
        <p class="text-slate-400 max-w-xl mx-auto"><?= __e('about.mission_desc') ?></p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <?php $emojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'];
        foreach(__('about.missions') as $i => [$mTitle,$mDesc]): ?>
        <div class="bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= $i*80 ?>">
          <div class="text-3xl mb-4"><?= $emojis[$i] ?? ($i+1) ?></div>
          <h3 class="text-white font-bold text-sm mb-3 leading-snug"><?= e($mTitle) ?></h3>
          <p class="text-slate-400 text-xs leading-relaxed"><?= e($mDesc) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Core Values -->
    <div data-aos="fade-up">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-white mb-3"><?= __e('about.values_h2') ?></h2>
        <p class="text-slate-400 max-w-xl mx-auto"><?= __e('about.values_desc') ?></p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <?php foreach([
          ['🚀',__('value.innovation_title'), __('value.innovation_desc'), 'blue'],
          ['🤝',__('value.partnership_title'),__('value.partnership_desc'),'emerald'],
          ['⚡',__('value.performance_title'),__('value.performance_desc'),'yellow'],
          ['🎯',__('value.mission_title'),    __('value.mission_desc'),    'violet'],
        ] as $i => [$icon,$title,$desc,$color]): ?>
        <div class="bg-[#0F172A]/60 border border-white/8 hover:border-<?= $color ?>-500/30 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= $i*100 ?>">
          <div class="text-4xl mb-4"><?= $icon ?></div>
          <h3 class="text-white font-bold text-sm mb-3"><?= e($title) ?></h3>
          <p class="text-slate-400 text-xs leading-relaxed"><?= e($desc) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="py-20">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center mb-16" data-aos="fade-up">
      <h2 class="text-3xl font-bold text-white mb-4"><?= __e('about.team_h2') ?></h2>
      <p class="text-slate-400 max-w-xl mx-auto"><?= __e('about.team_desc') ?></p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php if(!empty($teams)): ?>
      <?php foreach($teams as $i => $member): ?>
      <div class="bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= ($i%3)*100 ?>">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-14 h-14 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
            <?php if(!empty($member['photo'])): ?>
            <img src="<?= url($member['photo']) ?>" alt="<?= e($member['name']) ?>" class="w-full h-full object-cover">
            <?php else: ?>
            <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center text-blue-400 font-bold text-xl"><?= strtoupper(substr($member['name'],0,1)) ?></div>
            <?php endif; ?>
          </div>
          <div>
            <div class="text-white font-bold"><?= e($member['name']) ?></div>
            <div class="text-blue-400 text-sm"><?= e($member['position'] ?? '') ?></div>
          </div>
        </div>
        <?php if(!empty($member['bio'])): ?>
        <p class="text-slate-400 text-sm leading-relaxed mb-4"><?= e(excerpt($member['bio'],100)) ?></p>
        <?php endif; ?>
        <?php if(!empty($member['skills'])): ?>
        <div class="flex flex-wrap gap-2">
          <?php foreach(explode(',',$member['skills']) as $skill): $skill=trim($skill); if(empty($skill)) continue; ?>
          <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-lg"><?= e($skill) ?></span>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>
      </div>
      <?php endforeach; ?>
      <?php else: ?>
      <div class="col-span-3 text-center py-10 text-slate-500"><?= __e('about.team_empty') ?></div>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-20">
  <div class="max-w-3xl mx-auto px-6 text-center" data-aos="fade-up">
    <div class="bg-gradient-to-br from-blue-600/15 to-blue-900/15 border border-blue-500/20 rounded-3xl p-10">
      <h2 class="text-3xl font-bold text-white mb-4"><?= __e('about.cta_h2') ?></h2>
      <p class="text-slate-400 mb-8"><?= __e('about.cta_desc') ?></p>
      <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30">
        <?= __e('about.cta_btn') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </div>
</section>
