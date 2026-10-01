<div class="max-w-lg">
  <a href="<?= url('/sso/gallery') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Gallery
  </a>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="" method="POST" enctype="multipart/form-data" class="space-y-5">
      <?= csrf_field() ?>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Foto <span class="text-red-400">*</span></label>
        <input type="file" name="image" accept="image/*" required
          class="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl px-4 py-3 text-sm outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-medium">
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Caption</label>
        <input type="text" name="caption" placeholder="Deskripsi singkat foto..."
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Sort Order</label>
        <input type="number" name="sort_order" value="0"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <div class="flex gap-3">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">Upload Foto</button>
        <a href="<?= url('/sso/gallery') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm">Batal</a>
      </div>
    </form>
  </div>
</div>
