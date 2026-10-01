<div class="max-w-lg">
  <a href="<?= url('/sso/testimonials') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali
  </a>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="" method="POST" enctype="multipart/form-data" class="space-y-5">
      <?= csrf_field() ?>
      <div class="grid md:grid-cols-2 gap-5">
        <div><label class="block text-slate-400 text-sm font-medium mb-2">Nama Client</label>
        <input type="text" name="client_name" value="<?= e($testimonial['client_name'] ?? '') ?>" required class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
        <div><label class="block text-slate-400 text-sm font-medium mb-2">Perusahaan</label>
        <input type="text" name="company" value="<?= e($testimonial['company'] ?? '') ?>" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
      </div>
      <div><label class="block text-slate-400 text-sm font-medium mb-2">Testimonial</label>
      <textarea name="testimonial" rows="4" required class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($testimonial['testimonial'] ?? '') ?></textarea></div>
      <div class="grid md:grid-cols-2 gap-5">
        <div><label class="block text-slate-400 text-sm font-medium mb-2">Rating (1-5)</label>
        <input type="number" name="rating" min="1" max="5" value="<?= e($testimonial['rating'] ?? 5) ?>" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
        <div><label class="block text-slate-400 text-sm font-medium mb-2">Sort Order</label>
        <input type="number" name="sort_order" value="<?= e($testimonial['sort_order'] ?? 0) ?>" class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"></div>
      </div>
      <div class="flex gap-3">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm"><?= $testimonial ? 'Simpan' : 'Tambah' ?></button>
        <a href="<?= url('/sso/testimonials') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm">Batal</a>
      </div>
    </form>
  </div>
</div>
