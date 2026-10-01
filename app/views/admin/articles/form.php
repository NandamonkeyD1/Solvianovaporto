<div class="max-w-3xl">
  <a href="<?= url('/sso/articles') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Articles
  </a>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <form action="" method="POST" enctype="multipart/form-data" class="space-y-5">
      <?= csrf_field() ?>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Judul Artikel <span class="text-red-400">*</span></label>
        <input type="text" name="title" value="<?= e($article['title'] ?? '') ?>" required
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Excerpt</label>
        <textarea name="excerpt" rows="2" placeholder="Ringkasan singkat artikel..."
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($article['excerpt'] ?? '') ?></textarea>
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Konten <span class="text-red-400">*</span></label>
        <textarea name="content" rows="12" required
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none font-mono"><?= e($article['content'] ?? '') ?></textarea>
        <p class="text-slate-600 text-xs mt-1">Mendukung HTML dasar.</p>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Kategori</label>
          <select name="category" class="w-full bg-[#0F172A] border border-white/10 focus:border-blue-500/50 text-slate-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
            <?php foreach(['Digital Transformation','Web Development','System Design','Branding','Automation','Business','Tutorial'] as $cat): ?>
            <option value="<?= $cat ?>" <?= ($article['category'] ?? '') === $cat ? 'selected' : '' ?>><?= $cat ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div>
          <label class="block text-slate-400 text-sm font-medium mb-2">Status</label>
          <select name="status" class="w-full bg-[#0F172A] border border-white/10 focus:border-blue-500/50 text-slate-300 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
            <option value="draft" <?= ($article['status'] ?? 'draft') === 'draft' ? 'selected' : '' ?>>Draft</option>
            <option value="published" <?= ($article['status'] ?? '') === 'published' ? 'selected' : '' ?>>Published</option>
          </select>
        </div>
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Tags (pisah koma)</label>
        <input type="text" name="tags" value="<?= e($article['tags'] ?? '') ?>" placeholder="php, web development, tutorial"
          class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
      </div>
      <div>
        <label class="block text-slate-400 text-sm font-medium mb-2">Thumbnail</label>
        <?php if(!empty($article['thumbnail'])): ?>
        <div class="mb-3"><img src="<?= url($article['thumbnail']) ?>" alt="" class="h-24 rounded-xl object-cover border border-white/10"></div>
        <?php endif; ?>
        <input type="file" name="thumbnail" accept="image/*"
          class="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl px-4 py-3 text-sm outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:text-xs file:font-medium">
      </div>
      <div class="border-t border-white/8 pt-5">
        <h4 class="text-white font-semibold text-sm mb-4">SEO Settings</h4>
        <div class="space-y-4">
          <div>
            <label class="block text-slate-400 text-sm font-medium mb-2">Meta Title</label>
            <input type="text" name="meta_title" value="<?= e($article['meta_title'] ?? '') ?>"
              class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors">
          </div>
          <div>
            <label class="block text-slate-400 text-sm font-medium mb-2">Meta Description</label>
            <textarea name="meta_desc" rows="2"
              class="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"><?= e($article['meta_desc'] ?? '') ?></textarea>
          </div>
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm">
          <?= $article ? 'Simpan Perubahan' : 'Publish Artikel' ?>
        </button>
        <a href="<?= url('/sso/articles') ?>" class="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm">Batal</a>
      </div>
    </form>
  </div>
</div>
