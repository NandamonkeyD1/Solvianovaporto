<!-- TEAM PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up"><?= __e('team.badge') ?></div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100"><?= __e('team.h1') ?></h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200"><?= __e('team.desc') ?></p>
  </div>
</section>

<section class="py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <?php if(!empty($teams)): ?>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach($teams as $i => $member): ?>
      <div class="bg-[#0F172A]/60 border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group" data-aos="fade-up" data-aos-delay="<?= ($i%3)*100 ?>">
        <div class="h-48 bg-gradient-to-br from-blue-900/30 to-slate-900/60 relative overflow-hidden">
          <?php if(!empty($member['photo'])): ?>
          <img src="<?= url($member['photo']) ?>" alt="<?= e($member['name']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <?php else: ?>
          <div class="w-full h-full flex items-center justify-center">
            <div class="w-20 h-20 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-3xl"><?= strtoupper(substr($member['name'],0,1)) ?></div>
          </div>
          <?php endif; ?>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
        </div>
        <div class="p-6 -mt-4 relative">
          <div class="text-white font-bold text-xl mb-1"><?= e($member['name']) ?></div>
          <div class="text-blue-400 text-sm font-medium mb-4"><?= e($member['position'] ?? '') ?></div>
          <?php if(!empty($member['bio'])): ?>
          <p class="text-slate-400 text-sm leading-relaxed mb-5"><?= e($member['bio']) ?></p>
          <?php endif; ?>
          <?php if(!empty($member['skills'])): ?>
          <div class="flex flex-wrap gap-2">
            <?php foreach(explode(',',$member['skills']) as $skill): $skill=trim($skill); if(empty($skill)) continue; ?>
            <span class="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-xs rounded-lg"><?= e($skill) ?></span>
            <?php endforeach; ?>
          </div>
          <?php endif; ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    <?php else: ?>
    <div class="text-center py-20 text-slate-500">
      <svg class="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      <p><?= __e('team.empty') ?></p>
    </div>
    <?php endif; ?>

    <!-- Join Team CTA -->
    <div class="mt-16 text-center" data-aos="fade-up">
      <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-10 max-w-2xl mx-auto">
        <div class="text-4xl mb-4">🚀</div>
        <h3 class="text-2xl font-bold text-white mb-3"><?= __e('team.join_title') ?></h3>
        <p class="text-slate-400 mb-6"><?= __e('team.join_desc') ?></p>
        <a href="mailto:career@solvianova.com" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200">
          <?= __e('team.join_btn') ?> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>
