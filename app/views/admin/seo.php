<div class="max-w-2xl">
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="<?= url('/sso/seo/update') ?>" method="POST" class="space-y-5">
      <?= csrf_field() ?>
      <div><label class="block text-slate-400 text-sm font-medium mb-2">Default SEO Title</label>
      <input type="text" name="seo_title" value="<?= e($settings['seo_title'] ?? SEO_TITLE) ?>" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
      <div><label class="block text-slate-400 text-sm font-medium mb-2">Default Meta Description</label>
      <textarea name="seo_description" rows="3" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($settings['seo_description'] ?? SEO_DESC) ?></textarea></div>
      <div><label class="block text-slate-400 text-sm font-medium mb-2">Keywords</label>
      <input type="text" name="seo_keywords" value="<?= e($settings['seo_keywords'] ?? SEO_KEYWORDS) ?>" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
      <div><label class="block text-slate-400 text-sm font-medium mb-2">Google Analytics ID</label>
      <input type="text" name="google_analytics" value="<?= e($settings['google_analytics'] ?? '') ?>" placeholder="G-XXXXXXXXXX" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
      <div><label class="block text-slate-400 text-sm font-medium mb-2">Google Search Console Verification</label>
      <input type="text" name="google_search_console" value="<?= e($settings['google_search_console'] ?? '') ?>" placeholder="verification code" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
      <div class="pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Simpan SEO Settings</button>
      </div>
    </form>
  </div>

  <!-- Sitemap & Robots info -->
  <div class="mt-6 bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <h3 class="text-white font-bold mb-4">Sitemap & Robots</h3>
    <div class="space-y-3">
      <div class="flex items-center justify-between py-2 border-b border-white/5">
        <div><div class="text-white text-sm font-medium">Sitemap XML</div><div class="text-slate-500 text-xs"><?= url('/sitemap.xml') ?></div></div>
        <a href="<?= url('/sitemap.xml') ?>" target="_blank" class="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs rounded-lg transition-colors">Lihat</a>
      </div>
      <div class="flex items-center justify-between py-2">
        <div><div class="text-white text-sm font-medium">Robots.txt</div><div class="text-slate-500 text-xs"><?= url('/robots.txt') ?></div></div>
        <a href="<?= url('/robots.txt') ?>" target="_blank" class="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs rounded-lg transition-colors">Lihat</a>
      </div>
    </div>
  </div>
</div>
