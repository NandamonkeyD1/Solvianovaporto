<div class="flex items-center justify-between mb-6">
  <div></div>
  <a href="<?= url('/sso/categories/create') ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Tambah Kategori
  </a>
</div>

<?php
// Group by type
$grouped = [];
foreach ($categories as $cat) {
    $grouped[$cat['type']][] = $cat;
}
$typeLabels = ['portfolio' => 'Portfolio', 'service' => 'Services', 'article' => 'Articles'];
$typeColors = ['portfolio' => 'blue', 'service' => 'violet', 'article' => 'emerald'];
?>

<?php if(empty($categories)): ?>
<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-12 text-center">
  <svg class="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
  <p class="text-slate-400 mb-4">Belum ada kategori. Tambahkan kategori pertama.</p>
  <a href="<?= url('/sso/categories/create') ?>" class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all">
    + Tambah Kategori
  </a>
</div>
<?php else: ?>

<div class="grid md:grid-cols-3 gap-6">
  <?php foreach (['portfolio','service','article'] as $type):
    $color = $typeColors[$type];
    $label = $typeLabels[$type];
    $items = $grouped[$type] ?? [];
  ?>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-white/8">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-<?= $color ?>-400"></span>
        <h3 class="text-white font-semibold text-sm"><?= $label ?></h3>
        <span class="px-2 py-0.5 bg-<?= $color ?>-500/15 text-<?= $color ?>-400 text-xs rounded-full"><?= count($items) ?></span>
      </div>
      <a href="<?= url('/sso/categories/create?type='.$type) ?>" class="text-slate-500 hover:text-<?= $color ?>-400 transition-colors" title="Tambah">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      </a>
    </div>
    <!-- Items -->
    <div class="divide-y divide-white/5">
      <?php if(empty($items)): ?>
      <div class="px-5 py-6 text-center text-slate-600 text-sm">Belum ada kategori</div>
      <?php else: ?>
      <?php foreach ($items as $cat): ?>
      <div class="flex items-center justify-between px-5 py-3 hover:bg-white/3 transition-colors group">
        <div class="flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-<?= $color ?>-400/60 flex-shrink-0"></span>
          <span class="text-slate-300 text-sm"><?= e($cat['name']) ?></span>
          <?php if($cat['sort_order'] > 0): ?>
          <span class="text-slate-600 text-xs">#<?= $cat['sort_order'] ?></span>
          <?php endif; ?>
        </div>
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <a href="<?= url('/sso/categories/edit/'.$cat['id']) ?>"
             class="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </a>
          <form action="<?= url('/sso/categories/delete/'.$cat['id']) ?>" method="POST" onsubmit="return confirm('Hapus kategori ini?')">
            <?= csrf_field() ?>
            <button type="submit" class="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </form>
        </div>
      </div>
      <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
  <?php endforeach; ?>
</div>

<?php endif; ?>
