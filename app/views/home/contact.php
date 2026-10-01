<!-- CONTACT PAGE -->
<section class="relative pt-32 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-[#060816]">
    <div class="absolute inset-0" style="background-image:linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-6" data-aos="fade-up"><?= __e('contact.badge') ?></div>
    <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100"><?= __e('contact.h1') ?></h1>
    <p class="text-slate-400 text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200"><?= __e('contact.hero_desc') ?></p>
  </div>
</section>

<section class="py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid lg:grid-cols-3 gap-12">

      <!-- Contact Info -->
      <div data-aos="fade-right">
        <h2 class="text-2xl font-bold text-white mb-8"><?= __e('contact.info_h2') ?></h2>
        <div class="space-y-6 mb-10">
          <?php
          $setting = new Setting();
          $s = $setting->getAll();
          foreach([
            ['Email',     $s['site_email']    ?? 'hello@solvianova.com', 'mailto:'.($s['site_email'] ?? 'hello@solvianova.com'),             'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
            ['WhatsApp',  $s['site_phone']    ?? '+62 831-4880-1578',    'https://wa.me/'.($s['site_whatsapp'] ?? '6283148801578'),           'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
            ['Instagram', $s['site_instagram']?? '@solvianova',          'https://instagram.com/'.ltrim($s['site_instagram'] ?? 'solvianova','@'), 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z'],
          ] as [$label,$value,$href,$svgPath]): ?>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="<?= $svgPath ?>"/></svg>
            </div>
            <div>
              <div class="text-slate-500 text-xs mb-1"><?= $label ?></div>
              <a href="<?= e($href) ?>" target="_blank" class="text-white font-medium hover:text-blue-400 transition-colors"><?= e($value) ?></a>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-5">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span class="text-emerald-400 text-sm font-medium"><?= __e('contact.active_label') ?></span>
          </div>
          <p class="text-slate-400 text-sm"><?= __('contact.response_text') ?></p>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-2" data-aos="fade-left">
        <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-8">
          <h3 class="text-xl font-bold text-white mb-6"><?= __e('contact.form_h3') ?></h3>

          <?php $flash = get_flash(); if($flash): ?>
          <div class="mb-5 px-4 py-3 rounded-xl text-sm font-medium <?= $flash['type']==='success' ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/15 border border-red-500/30 text-red-300' ?>">
            <?= e($flash['message']) ?>
          </div>
          <?php endif; ?>

          <form action="<?= url('/contact') ?>" method="POST" class="space-y-5">
            <?= csrf_field() ?>
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-slate-400 text-sm font-medium mb-2"><?= __e('contact.label_name') ?> <span class="text-red-400">*</span></label>
                <input type="text" name="name" value="<?= old('name') ?>" required placeholder="<?= __e('contact.placeholder_name') ?>"
                  class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
              </div>
              <div>
                <label class="block text-slate-400 text-sm font-medium mb-2"><?= __e('contact.label_email') ?> <span class="text-red-400">*</span></label>
                <input type="email" name="email" value="<?= old('email') ?>" required placeholder="<?= __e('contact.placeholder_email') ?>"
                  class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-slate-400 text-sm font-medium mb-2"><?= __e('contact.label_phone') ?></label>
                <input type="text" name="phone" value="<?= old('phone') ?>" placeholder="<?= __e('contact.placeholder_phone') ?>"
                  class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
              </div>
              <div>
                <label class="block text-slate-400 text-sm font-medium mb-2"><?= __e('contact.label_need') ?></label>
                <select name="subject" class="w-full bg-[#0F172A] border border-white/10 focus:border-blue-500/50 text-slate-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
                  <option value=""><?= __e('contact.placeholder_need') ?></option>
                  <?php foreach(__('contact.subjects') as $subj): ?>
                  <option value="<?= e($subj) ?>" <?= old('subject')===$subj?'selected':'' ?>><?= e($subj) ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-slate-400 text-sm font-medium mb-2"><?= __e('contact.label_message') ?> <span class="text-red-400">*</span></label>
              <textarea name="message" required rows="5" placeholder="<?= __e('contact.placeholder_message') ?>"
                class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= old('message') ?></textarea>
            </div>
            <button type="submit" class="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 flex items-center justify-center gap-2">
              <?= __e('contact.send_btn') ?>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</section>
