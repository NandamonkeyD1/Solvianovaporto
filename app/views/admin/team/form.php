<div class="max-w-lg">
  <a href="<?= url('/sso/team') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Team
  </a>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="" method="POST" enctype="multipart/form-data" class="space-y-5">
      <?= csrf_field() ?>
      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Nama <span class="text-red-400">*</span></label>
          <input type="text" name="name" value="<?= e($member['name'] ?? '') ?>" required
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Posisi</label>
          <input type="text" name="position" value="<?= e($member['position'] ?? '') ?>" placeholder="Fullstack Developer"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Bio</label>
        <textarea name="bio" rows="3"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($member['bio'] ?? '') ?></textarea>
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Skills <span class="text-slate-500 font-normal">(pisah koma)</span></label>
        <textarea name="skills" rows="3" placeholder="Laravel, Python, CodeIgniter, MySQL, REST API, Node.js, Backend..."
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($member['skills'] ?? '') ?></textarea>
        <p class="text-slate-600 text-xs mt-1">Pisahkan setiap skill dengan koma. Contoh: Laravel, Vue.js, MySQL, Docker</p>
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Foto</label>
        <?php if(!empty($member['photo'])): ?>
        <div class="mb-3"><img src="<?= url($member['photo']) ?>" alt="" class="w-16 h-16 rounded-xl object-cover border border-white/10"></div>
        <?php endif; ?>
        <input type="file" name="photo" accept="image/*"
          class="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl px-4 py-3 text-sm outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-medium">
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Sort Order</label>
        <input type="number" name="sort_order" value="<?= e($member['sort_order'] ?? 0) ?>"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <div class="flex gap-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" value="1" <?= ($member['is_active'] ?? 1) ? 'checked' : '' ?> class="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600">
          <span class="text-slate-300 text-sm">Aktif / Tampilkan di website</span>
        </label>
      </div>
      <div class="flex gap-3">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">
          <?= $member ? 'Simpan Perubahan' : 'Tambah Anggota' ?>
        </button>
        <a href="<?= url('/sso/team') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm">Batal</a>
      </div>
    </form>
  </div>
</div>
