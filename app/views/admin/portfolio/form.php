<div class="max-w-3xl">
  <a href="<?= url('/sso/portfolio') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Portfolio
  </a>

  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="" method="POST" enctype="multipart/form-data" class="space-y-5">
      <?= csrf_field() ?>

      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Nama Project <span class="text-red-400">*</span></label>
          <input type="text" name="name" value="<?= e($portfolio['name'] ?? '') ?>" required
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Kategori</label>
          <select name="category" class="w-full bg-[#0F172A] border border-white/10 focus:border-blue-500/50 text-slate-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
            <?php
            // Load from DB if available, fallback to defaults
            $catOptions = [];
            try {
                require_once APP_PATH . '/models/Category.php';
                $catModel = new Category();
                $catOptions = $catModel->getNamesForType('portfolio');
            } catch (Exception $e) {}
            if (empty($catOptions)) {
                $catOptions = ['Website','Dashboard','Branding','Automation','Mobile','Enterprise','System'];
            }
            foreach($catOptions as $cat): ?>
            <option value="<?= e($cat) ?>" <?= ($portfolio['category'] ?? '') === $cat ? 'selected' : '' ?>><?= e($cat) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Deskripsi Singkat</label>
        <input type="text" name="short_desc" value="<?= e($portfolio['short_desc'] ?? '') ?>" placeholder="Deskripsi singkat 1-2 kalimat"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Deskripsi Lengkap</label>
        <textarea name="description" rows="5" placeholder="Deskripsi lengkap project..."
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($portfolio['description'] ?? '') ?></textarea>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Teknologi (pisah koma)</label>
          <input type="text" name="tech_stack" value="<?= e($portfolio['tech_stack'] ?? '') ?>" placeholder="Laravel, Vue.js, MySQL"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Client</label>
          <input type="text" name="client" value="<?= e($portfolio['client'] ?? '') ?>"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Tahun</label>
          <input type="text" name="year" value="<?= e($portfolio['year'] ?? date('Y')) ?>"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">URL Project (Live)</label>
          <input type="url" name="project_url" value="<?= e($portfolio['project_url'] ?? '') ?>" placeholder="https://"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Sort Order</label>
          <input type="number" name="sort_order" value="<?= e($portfolio['sort_order'] ?? 0) ?>"
            class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
        </div>
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">
          <svg class="w-4 h-4 inline mr-1 mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          URL GitHub (opsional)
        </label>
        <input type="url" name="github_url" value="<?= e($portfolio['github_url'] ?? '') ?>" placeholder="https://github.com/username/repo"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Thumbnail</label>
        <?php if(!empty($portfolio['thumbnail'])): ?>
        <div class="mb-3"><img src="<?= url($portfolio['thumbnail']) ?>" alt="" class="h-24 rounded-xl object-cover border border-white/10"></div>
        <?php endif; ?>
        <input type="file" name="thumbnail" accept="image/*"
          class="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl px-4 py-3 text-sm outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-medium">
      </div>

      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Case Study (JSON)</label>
        <textarea name="case_study" rows="4" placeholder='{"Problem":"...","Analysis":"...","Solution":"...","Result":"..."}'
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none font-mono"><?= e($portfolio['case_study'] ?? '') ?></textarea>
      </div>

      <div class="flex items-center gap-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_active" value="1" <?= ($portfolio['is_active'] ?? 1) ? 'checked' : '' ?> class="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600">
          <span class="text-slate-300 text-sm">Aktif / Tampilkan di website</span>
        </label>
      </div>

      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">
          <?= $portfolio ? 'Simpan Perubahan' : 'Tambah Portfolio' ?>
        </button>
        <a href="<?= url('/sso/portfolio') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm">Batal</a>
      </div>
    </form>
  </div>
</div>
