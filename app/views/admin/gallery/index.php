<div class="flex items-center justify-between mb-6">
  <div></div>
  <a href="<?= url('/sso/gallery/create') ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Upload Foto
  </a>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  <?php if(!empty($galleries)): foreach($galleries as $g): ?>
  <div class="group relative rounded-xl overflow-hidden border border-white/8 hover:border-red-500/30 transition-all duration-200">
    <img src="<?= url($g['image']) ?>" alt="<?= e($g['caption'] ?? '') ?>" class="w-full aspect-square object-cover">
    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <form action="<?= url('/sso/gallery/delete/'.$g['id']) ?>" method="POST" onsubmit="return confirm('Hapus foto ini?')">
        <?= csrf_field() ?>
        <button type="submit" class="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors">Hapus</button>
      </form>
    </div>
    <?php if(!empty($g['caption'])): ?>
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
      <p class="text-white text-xs truncate"><?= e($g['caption']) ?></p>
    </div>
    <?php endif; ?>
  </div>
  <?php endforeach; else: ?>
  <div class="col-span-full py-12 text-center text-slate-500">Belum ada foto. <a href="<?= url('/sso/gallery/create') ?>" class="text-blue-400 hover:text-blue-300">Upload sekarang</a></div>
  <?php endif; ?>
</div>
