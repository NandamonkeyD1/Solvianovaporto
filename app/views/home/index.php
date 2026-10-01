<?php /* HOME PAGE */ ?>
<!-- HERO SECTION -->
<section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-transparent">
  <!-- Subtle gradient glow overlays -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-1/4 left-10 w-96 h-96 bg-[#ffde59]/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-16 items-center z-10">
    <!-- Left Column -->
    <div data-aos="fade-right">
      <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-[#dbe7ff] text-xs font-semibold uppercase tracking-widest mb-6">
        <span class="dot-glow"></span>
        DIGITAL SOLUTION STUDIO
      </div>
      <h1 class="text-5xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight mb-6">
        Solvia.<span class="text-nova-yellow">Nova</span>
      </h1>
      <p class="text-[#aebddd] text-base lg:text-xl leading-relaxed mb-8 max-w-xl">
        <span class="text-white font-bold">Understand Problems First, Build Solutions.</span><br>
        Konsep, teknologi, dan solusi digital dalam satu ekosistem yang dirancang untuk berkembang.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 mb-8">
        <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5">
          <?= __e('home.hero_cta_primary') ?>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
        <a href="<?= url('/portfolio') ?>" class="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all duration-200">
          <?= __e('home.hero_cta_secondary') ?>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Category Chips -->
      <div class="flex flex-wrap gap-2.5 mb-10">
        <div class="chip-3d">Web Development</div>
        <div class="chip-3d">Custom System</div>
        <div class="chip-3d">IoT</div>
        <div class="chip-3d">Digital Solution</div>
      </div>

      <!-- Stats row -->
      <div class="flex flex-wrap gap-8 pt-6 border-t border-white/10">
        <?php foreach([
          ['50+', __('home.stat_projects')],
          ['20+', __('home.stat_partners')],
          ['100%', __('home.stat_custom')],
          ['3+', __('home.stat_experience')]
        ] as [$num, $label]): ?>
        <div>
          <div class="text-2xl font-bold text-white"><?= $num ?></div>
          <div class="text-slate-400 text-xs font-medium mt-0.5"><?= e($label) ?></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Right: Dashboard Mockup -->
    <div data-aos="fade-left" class="relative hidden lg:block">
      <div class="relative">
        <div class="absolute inset-0 bg-blue-500/15 rounded-3xl blur-3xl scale-110"></div>
        <div class="relative bg-[#06132f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            <div class="text-slate-400 text-xs font-mono">solvianova.3d.dashboard</div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-5">
            <?php foreach([['Total Projects','50+','↑ 12%','blue'],['Active Clients','28','↑ 8%','emerald'],['Revenue','98%','↑ 24%','violet']] as [$t,$v,$c,$color]): ?>
            <div class="bg-white/5 rounded-xl p-3 border border-white/5">
              <div class="text-slate-400 text-xs mb-2"><?= $t ?></div>
              <div class="text-white font-bold text-xl"><?= $v ?></div>
              <div class="text-<?= $color ?>-400 text-xs mt-1"><?= $c ?></div>
            </div>
            <?php endforeach; ?>
          </div>
          <div class="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
            <div class="text-slate-400 text-xs mb-3">Project Delivery Rate</div>
            <div class="flex items-end gap-2 h-16">
              <?php foreach([60,80,55,90,75,95,70,88,65,92,78,100] as $h): ?>
              <div class="flex-1 bg-blue-500/30 rounded-sm hover:bg-blue-500/60 transition-colors" style="height:<?= $h ?>%"></div>
              <?php endforeach; ?>
            </div>
          </div>
          <div class="space-y-2">
            <?php foreach([['E-Commerce Platform','Website','✓'],['ERP System','System','✓'],['Brand Identity','Branding','⟳']] as [$name,$cat,$status]): ?>
            <div class="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <div class="text-white text-xs font-medium"><?= $name ?></div>
                <div class="text-slate-400 text-xs"><?= $cat ?></div>
              </div>
              <span class="text-<?= $status==='✓'?'emerald':'blue' ?>-400 text-xs font-semibold"><?= $status==='✓'? __e('portfolio.done') : __e('portfolio.active') ?></span>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <div class="absolute -top-4 -right-4 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-xl rounded-xl px-4 py-2 text-emerald-300 text-xs font-semibold">
          ✓ 100% On-Time Delivery
        </div>
        <div class="absolute -bottom-4 -left-4 bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-xl rounded-xl px-4 py-2 text-[#ffde59] text-xs font-semibold">
          ⚡ 3D Interactive Ecosystem
        </div>
      </div>
    </div>
  </div>
  
  <!-- Interactive hint bottom right -->
  <div class="hidden lg:block absolute right-8 bottom-6 text-[#7182a4] text-xs font-medium tracking-widest uppercase z-10 pointer-events-none">
    MOVE YOUR CURSOR · EXPLORE THE NOVA
  </div>
</section>

<!-- TRUST INDICATORS -->
<section class="py-16 border-y border-white/5 bg-[#0F172A]/40">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <?php foreach([
        ['50+', __('home.stat_projects'),    __('home.trust_projects_sub')],
        ['20+', __('home.stat_partners'),    __('home.trust_partners_sub')],
        ['100%',__('home.stat_custom'),      __('home.trust_custom_sub')],
        ['3+',  __('home.stat_experience'),  __('home.trust_exp_sub')],
      ] as [$num,$title,$sub]): ?>
      <div class="text-center" data-aos="fade-up">
        <div class="text-4xl font-bold text-white mb-1"><?= $num ?></div>
        <div class="text-blue-400 font-semibold text-sm mb-1"><?= e($title) ?></div>
        <div class="text-slate-500 text-xs"><?= e($sub) ?></div>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="text-center">
      <p class="text-slate-600 text-xs uppercase tracking-widest mb-6"><?= __e('home.trusted_by') ?></p>
      <?php
        $trustedRaw  = $settings['trusted_clients'] ?? '';
        $trustedList = array_filter(array_map('trim', explode("\n", $trustedRaw)));
      ?>
      <?php if(!empty($trustedList)): ?>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <?php foreach($trustedList as $client):
          $parts      = explode('|', $client, 2);
          $clientName = trim($parts[0]);
          $logoUrl    = isset($parts[1]) ? trim($parts[1]) : '';
        ?>
        <div class="flex items-center justify-center px-5 py-2.5 bg-white/5 border border-white/8 rounded-xl hover:border-white/15 transition-colors">
          <?php if(!empty($logoUrl)): ?>
          <img src="<?= e($logoUrl) ?>" alt="<?= e($clientName) ?>" class="h-6 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" loading="lazy">
          <?php else: ?>
          <span class="text-slate-400 text-sm font-medium"><?= e($clientName) ?></span>
          <?php endif; ?>
        </div>
        <?php endforeach; ?>
      </div>
      <?php else: ?>
      <div class="flex flex-wrap items-center justify-center gap-8 opacity-30">
        <?php for($i=1;$i<=6;$i++): ?><div class="h-7 w-24 bg-white/10 rounded-lg"></div><?php endfor; ?>
      </div>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- ABOUT SECTION -->
<section class="py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div data-aos="fade-right">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('home.about_badge') ?></div>
        <h2 class="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
          <?= __e('home.about_h2') ?><br>
          <span class="text-blue-400"><?= __e('home.about_h2_highlight') ?></span> <?= __e('home.about_h2_end') ?>
        </h2>
        <p class="text-slate-400 leading-relaxed mb-6"><?= __e('home.about_p1') ?></p>
        <p class="text-slate-400 leading-relaxed mb-8"><?= __e('home.about_p2') ?></p>
        <div class="grid grid-cols-2 gap-4 mb-8">
          <?php foreach([
            ['🚀', __('value.innovation_title'), __('value.innovation_desc')],
            ['🤝', __('value.partnership_title'),__('value.partnership_desc')],
            ['⚡', __('value.performance_title'),__('value.performance_desc')],
            ['🎯', __('value.mission_title'),    __('value.mission_desc')],
          ] as [$icon,$title,$desc]): ?>
          <div class="bg-white/3 border border-white/8 rounded-xl p-4">
            <div class="text-2xl mb-2"><?= $icon ?></div>
            <div class="text-white font-semibold text-sm mb-1"><?= e($title) ?></div>
            <div class="text-slate-500 text-xs leading-relaxed"><?= e($desc) ?></div>
          </div>
          <?php endforeach; ?>
        </div>
        <a href="<?= url('/about') ?>" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
          <?= __e('home.about_learn_more') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
      <div data-aos="fade-left" class="relative">
        <div class="absolute inset-0 bg-blue-500/10 rounded-3xl blur-3xl"></div>
        <div class="relative space-y-4">
          <?php foreach([
            [__('home.vision'),     __('home.vision_text'),    'eye'],
            [__('home.philosophy'), __('home.philosophy_text'),'lightbulb'],
            [__('home.commitment'), __('home.commitment_text'),'shield-check'],
          ] as [$title,$text,$icon]): ?>
          <div class="bg-[#0F172A]/80 border border-white/8 rounded-2xl p-6 backdrop-blur-sm">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <?php if($icon==='eye'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <?php elseif($icon==='lightbulb'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  <?php else: ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  <?php endif; ?>
                </svg>
              </div>
              <div>
                <div class="text-white font-semibold mb-2"><?= e($title) ?></div>
                <div class="text-slate-400 text-sm leading-relaxed"><?= e($text) ?></div>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES SECTION -->
<section class="py-24 bg-[#0F172A]/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('home.services_badge') ?></div>
      <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4"><?= __e('home.services_h2') ?></h2>
      <p class="text-slate-400"><?= __e('home.services_desc') ?></p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <?php
      $serviceCategories = __('services.categories');
      $icons  = ['globe-alt','cpu-chip','paint-brush','bolt'];
      $colors = ['blue','violet','pink','emerald'];
      ?>
      <?php foreach($serviceCategories as $i => [$catTitle,$catDesc,$items]):
        $icon  = $icons[$i]  ?? 'bolt';
        $color = $colors[$i] ?? 'blue';
      ?>
      <div class="group bg-[#0F172A]/60 border border-white/8 hover:border-<?= $color ?>-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-<?= $color ?>-500/10" data-aos="fade-up" data-aos-delay="<?= $i*100 ?>">
        <div class="w-12 h-12 rounded-xl bg-<?= $color ?>-500/15 border border-<?= $color ?>-500/20 flex items-center justify-center mb-5 group-hover:bg-<?= $color ?>-500/25 transition-colors">
          <svg class="w-6 h-6 text-<?= $color ?>-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <?php if($icon==='globe-alt'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
            <?php elseif($icon==='cpu-chip'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
            <?php elseif($icon==='paint-brush'): ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
            <?php else: ?><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            <?php endif; ?>
          </svg>
        </div>
        <h3 class="text-white font-bold text-lg mb-3"><?= e($catTitle) ?></h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-5"><?= e($catDesc) ?></p>
        <ul class="space-y-2">
          <?php foreach($items as [$itemTitle,$itemDesc]): ?>
          <li class="flex items-center gap-2 text-slate-400 text-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-<?= $color ?>-400 flex-shrink-0"></span>
            <?= e($itemTitle) ?>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endforeach; ?>
    </div>
    <div class="text-center mt-10">
      <a href="<?= url('/services') ?>" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all duration-200 text-sm">
        <?= __e('home.services_see_all') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- PORTFOLIO SECTION -->
<section class="py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12" data-aos="fade-up">
      <div>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-4"><?= __e('home.portfolio_badge') ?></div>
        <h2 class="text-3xl lg:text-4xl font-bold text-white"><?= __e('home.portfolio_h2') ?></h2>
      </div>
      <a href="<?= url('/portfolio') ?>" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors flex-shrink-0">
        <?= __e('home.portfolio_see_all') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
    <?php if(!empty($portfolios)): ?>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach($portfolios as $i => $p): ?>
      <a href="<?= url('/portfolio/'.e($p['slug'])) ?>" class="group block bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10" data-aos="fade-up" data-aos-delay="<?= ($i%3)*100 ?>">
        <div class="aspect-video bg-gradient-to-br from-blue-900/40 to-slate-900/60 overflow-hidden relative">
          <?php if(!empty($p['thumbnail'])): ?>
          <img src="<?= url($p['thumbnail']) ?>" alt="<?= e($p['name']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
          <?php else: ?>
          <div class="w-full h-full flex items-center justify-center"><div class="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"><svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div></div>
          <?php endif; ?>
          <div class="absolute top-3 left-3"><span class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 text-xs font-medium rounded-full"><?= e($p['category']) ?></span></div>
        </div>
        <div class="p-5">
          <h3 class="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors"><?= e($p['name']) ?></h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2"><?= e($p['short_desc'] ?? '') ?></p>
          <?php if(!empty($p['tech_stack'])): ?>
          <div class="flex flex-wrap gap-2">
            <?php foreach(array_slice(explode(',', $p['tech_stack']), 0, 3) as $tech): ?>
            <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-lg"><?= e(trim($tech)) ?></span>
            <?php endforeach; ?>
          </div>
          <?php endif; ?>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
    <?php else: ?>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach([['E-Commerce Platform','Website','Laravel, Vue.js, MySQL'],['ERP Manufacturing','System','PHP, React, PostgreSQL'],['Brand Identity FMCG','Branding','Figma, Illustrator'],['HR Management System','System','PHP Native, MySQL'],['Company Profile Premium','Website','PHP, TailwindCSS'],['WhatsApp Automation','Automation','Node.js, WhatsApp API']] as $i => [$name,$cat,$tech]): ?>
      <div class="group bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= ($i%3)*100 ?>">
        <div class="aspect-video bg-gradient-to-br from-blue-900/30 to-slate-900/60 flex items-center justify-center">
          <div class="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"><svg class="w-8 h-8 text-blue-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div>
        </div>
        <div class="p-5">
          <span class="inline-block px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full mb-3"><?= $cat ?></span>
          <h3 class="text-white font-bold text-lg mb-2"><?= $name ?></h3>
          <div class="flex flex-wrap gap-2"><?php foreach(explode(', ', $tech) as $t): ?><span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-lg"><?= $t ?></span><?php endforeach; ?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
  </div>
</section>

<!-- TEAM SECTION -->
<section class="py-24 bg-[#0F172A]/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('home.team_badge') ?></div>
      <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4"><?= __e('home.team_h2') ?></h2>
      <p class="text-slate-400"><?= __e('home.team_desc') ?></p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      <?php if(!empty($teams)): ?>
      <?php foreach($teams as $i => $member): ?>
      <div class="group bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= $i*80 ?>">
        <div class="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/10">
          <?php if(!empty($member['photo'])): ?>
          <img src="<?= url($member['photo']) ?>" alt="<?= e($member['name']) ?>" class="w-full h-full object-cover">
          <?php else: ?>
          <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center text-blue-400 font-bold text-xl"><?= strtoupper(substr($member['name'], 0, 1)) ?></div>
          <?php endif; ?>
        </div>
        <div class="text-white font-bold text-sm mb-1"><?= e($member['name']) ?></div>
        <div class="text-blue-400 text-xs font-medium mb-3"><?= e($member['position'] ?? '') ?></div>
        <p class="text-slate-500 text-xs leading-relaxed mb-3"><?= e(excerpt($member['bio'] ?? '', 80)) ?></p>
        <?php if(!empty($member['skills'])): ?>
        <div class="flex flex-wrap gap-1 justify-center">
          <?php foreach(array_slice(explode(',', $member['skills']), 0, 2) as $skill): ?>
          <span class="px-2 py-0.5 bg-white/5 border border-white/10 text-slate-500 text-xs rounded"><?= e(trim($skill)) ?></span>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>
      </div>
      <?php endforeach; ?>
      <?php else: ?>
      <div class="col-span-5 text-center py-8 text-slate-600 text-sm"><?= __e('home.team_empty') ?></div>
      <?php endif; ?>
    </div>
    <div class="text-center mt-8">
      <a href="<?= url('/team') ?>" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
        <?= __e('home.team_see_all') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="py-24">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('home.testimonials_badge') ?></div>
      <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4"><?= __e('home.testimonials_h2') ?></h2>
      <p class="text-slate-400"><?= __e('home.testimonials_desc') ?></p>
    </div>
    <?php
    $defaultTestimonials = [
      ['Budi Santoso','CEO, PT Maju Bersama','Solvia Nova benar-benar mengubah cara kami beroperasi. Sistem ERP yang mereka bangun sangat intuitif dan tim kami langsung bisa adaptasi.','5'],
      ['Rina Wijaya','Founder, Toko Online Nusantara','Website e-commerce kami sekarang jauh lebih profesional. Penjualan meningkat 40% dalam 3 bulan pertama setelah launch.','5'],
      ['Ahmad Fauzi','Marketing Director, Brand Lokal','Branding yang mereka rancang benar-benar merepresentasikan nilai brand kami. Sangat puas dengan hasilnya.','5'],
    ];
    $displayTestimonials = !empty($testimonials) ? $testimonials : $defaultTestimonials;
    ?>
    <div class="grid md:grid-cols-3 gap-6">
      <?php foreach($displayTestimonials as $i => $t):
        $name    = is_array($t) ? ($t['client_name'] ?? $t[0]) : $t;
        $company = is_array($t) ? ($t['company'] ?? $t[1]) : '';
        $text    = is_array($t) ? ($t['testimonial'] ?? $t[2]) : '';
        $rating  = is_array($t) ? ($t['rating'] ?? $t[3] ?? 5) : 5;
      ?>
      <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="<?= $i*100 ?>">
        <div class="flex gap-1 mb-4"><?php for($s=0;$s<5;$s++): ?><svg class="w-4 h-4 <?= $s<(int)$rating?'text-yellow-400':'text-slate-700' ?>" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><?php endfor; ?></div>
        <p class="text-slate-300 text-sm leading-relaxed mb-6 italic">"<?= e($text) ?>"</p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-700/30 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm"><?= strtoupper(substr($name, 0, 1)) ?></div>
          <div>
            <div class="text-white font-semibold text-sm"><?= e($name) ?></div>
            <div class="text-slate-500 text-xs"><?= e($company) ?></div>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ARTICLES -->
<?php if(!empty($articles)): ?>
<section class="py-24 bg-[#0F172A]/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12" data-aos="fade-up">
      <div>
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-4"><?= __e('home.articles_badge') ?></div>
        <h2 class="text-3xl lg:text-4xl font-bold text-white"><?= __e('home.articles_h2') ?></h2>
      </div>
      <a href="<?= url('/articles') ?>" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors flex-shrink-0">
        <?= __e('home.articles_see_all') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <?php foreach($articles as $i => $article): ?>
      <a href="<?= url('/articles/'.e($article['slug'])) ?>" class="group block bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1" data-aos="fade-up" data-aos-delay="<?= $i*100 ?>">
        <div class="aspect-video bg-gradient-to-br from-blue-900/30 to-slate-900/60 overflow-hidden">
          <?php if(!empty($article['thumbnail'])): ?><img src="<?= url($article['thumbnail']) ?>" alt="<?= e($article['title']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"><?php endif; ?>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full"><?= e($article['category'] ?? 'Insight') ?></span>
            <span class="text-slate-600 text-xs"><?= reading_time($article['content'] ?? '') ?> <?= __e('articles.min_read') ?></span>
          </div>
          <h3 class="text-white font-bold text-base mb-2 group-hover:text-blue-300 transition-colors line-clamp-2"><?= e($article['title']) ?></h3>
          <p class="text-slate-400 text-sm line-clamp-2"><?= e(excerpt($article['excerpt'] ?? $article['content'] ?? '', 100)) ?></p>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- SOCIAL MEDIA & VIDEO SECTION -->
<section class="py-24 bg-[#0F172A]/30">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('home.social_badge') ?></div>
      <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4"><?= __e('home.social_h2') ?></h2>
      <p class="text-slate-400"><?= __e('home.social_desc') ?></p>
    </div>
    <div class="flex flex-wrap justify-center gap-4 mb-16" data-aos="fade-up">
      <?php
      $socmedLinks = [];
      if(!empty($settings['site_instagram'])) $socmedLinks[] = ['Instagram', $settings['site_instagram'], 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', 'from-pink-500 to-orange-400'];
      if(!empty($settings['site_tiktok']))    $socmedLinks[] = ['TikTok',     $settings['site_tiktok'],    'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z', 'from-slate-700 to-slate-900'];
      if(!empty($settings['site_youtube']))   $socmedLinks[] = ['YouTube',    $settings['site_youtube'],   'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', 'from-red-600 to-red-700'];
      if(!empty($settings['site_linkedin']))  $socmedLinks[] = ['LinkedIn',   $settings['site_linkedin'],  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', 'from-blue-600 to-blue-700'];
      foreach($socmedLinks as [$label, $href, $svgPath, $gradient]):
      ?>
      <a href="<?= e($href) ?>" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-200 hover:-translate-y-0.5">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br <?= $gradient ?> flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="<?= $svgPath ?>"/></svg></div>
        <div><div class="text-white font-semibold text-sm"><?= $label ?></div></div>
        <svg class="w-4 h-4 text-slate-600 group-hover:text-slate-400 ml-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
      </a>
      <?php endforeach; ?>
    </div>
    <?php
    $videos = [];
    for($v=1;$v<=3;$v++){ $vid=$settings['social_video_'.$v]??''; if(!empty($vid)) $videos[]=$vid; }
    if(!empty($videos)):
    ?>
    <div class="mb-6" data-aos="fade-up">
      <h3 class="text-white font-bold text-xl text-center mb-8"><?= __e('home.social_latest_videos') ?></h3>
      <div class="grid md:grid-cols-<?= count($videos)===1?'1 max-w-2xl mx-auto':(count($videos)===2?'2':'3') ?> gap-6">
        <?php foreach($videos as $i => $videoUrl):
          $embedUrl=$videoUrl;
          if(preg_match('/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/',$videoUrl,$m)) $embedUrl='https://www.youtube.com/embed/'.$m[1];
          elseif(preg_match('/youtu\.be\/([a-zA-Z0-9_-]+)/',$videoUrl,$m)) $embedUrl='https://www.youtube.com/embed/'.$m[1];
          elseif(preg_match('/tiktok\.com\/@[^\/]+\/video\/(\d+)/',$videoUrl,$m)) $embedUrl='https://www.tiktok.com/embed/'.$m[1];
        ?>
        <div class="rounded-2xl overflow-hidden border border-white/8 bg-[#0F172A]/60" data-aos="fade-up" data-aos-delay="<?= $i*100 ?>">
          <div class="relative" style="padding-bottom:56.25%"><iframe src="<?= e($embedUrl) ?>" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>
  </div>
</section>

<!-- CTA SECTION -->
<section class="py-24">
  <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center" data-aos="fade-up">
    <div class="relative bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 rounded-3xl p-12 overflow-hidden">
      <div class="absolute inset-0 bg-[#0F172A]/60"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"></div>
      <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="relative">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6"><?= __e('home.cta_badge') ?></div>
        <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          <?= __e('home.cta_h2') ?> <span class="text-blue-400"><?= __e('home.cta_h2_highlight') ?></span>
        </h2>
        <p class="text-slate-400 text-lg mb-10 max-w-2xl mx-auto"><?= __e('home.cta_desc') ?></p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a href="<?= url('/contact') ?>" class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5">
            <?= __e('home.cta_start') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
          <a href="https://wa.me/<?= e($settings['site_whatsapp'] ?? '6283148801578') ?>" target="_blank" class="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold rounded-xl transition-all duration-200">
            <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <?= __e('home.cta_wa') ?>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
