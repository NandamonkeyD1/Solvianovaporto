<div class="max-w-lg">
  <a href="<?= url('/sso/categories') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Kategori
  </a>

  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="" method="POST" class="space-y-5">
      <?= csrf_field() ?>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Nama Kategori <span class="text-red-400">*</span></label>
        <input type="text" name="name" value="<?= e($category['name'] ?? '') ?>" required autofocus
          placeholder="Contoh: Mobile App, UI/UX, Branding..."
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Tipe <span class="text-red-400">*</span></label>
        <?php
        // Pre-select type from query string if creating new
        $selectedType = $category['type'] ?? ($_GET['type'] ?? 'portfolio');
        ?>
        <div class="grid grid-cols-3 gap-3">
          <?php foreach ($types as $type):
            $typeLabels = ['portfolio' => '🗂 Portfolio', 'service' => '⚙️ Services', 'article' => '📝 Articles'];
            $typeColors = ['portfolio' => 'blue', 'service' => 'violet', 'article' => 'emerald'];
            $color = $typeColors[$type];
          ?>
          <label class="relative cursor-pointer">
            <input type="radio" name="type" value="<?= $type ?>" <?= $selectedType === $type ? 'checked' : '' ?> class="peer sr-only">
            <div class="px-3 py-3 rounded-xl border border-white/10 text-center text-sm font-medium text-slate-400
                        peer-checked:border-<?= $color ?>-500/50 peer-checked:bg-<?= $color ?>-500/10 peer-checked:text-<?= $color ?>-400
                        hover:border-white/20 hover:text-white transition-all cursor-pointer">
              <?= $typeLabels[$type] ?>
            </div>
          </label>
          <?php endforeach; ?>
        </div>
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Sort Order <span class="text-slate-600 font-normal">(opsional, angka kecil tampil duluan)</span></label>
        <input type="number" name="sort_order" value="<?= e($category['sort_order'] ?? 0) ?>" min="0"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>

      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">
          <?= $category ? 'Simpan Perubahan' : 'Tambah Kategori' ?>
        </button>
        <a href="<?= url('/sso/categories') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm">
          Batal
        </a>
      </div>
    </form>
  </div>
</div>
