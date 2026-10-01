<div class="flex items-center justify-between mb-6">
  <div></div>
  <a href="<?= url('/sso/team/create') ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Tambah Anggota
  </a>
</div>
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  <?php if(!empty($members)): foreach($members as $m): ?>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-5 flex items-start gap-4">
    <div class="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
      <?php if(!empty($m['photo'])): ?>
      <img src="<?= url($m['photo']) ?>" alt="" class="w-full h-full object-cover">
      <?php else: ?>
      <div class="w-full h-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold"><?= strtoupper(substr($m['name'],0,1)) ?></div>
      <?php endif; ?>
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-white font-semibold text-sm"><?= e($m['name']) ?></div>
      <div class="text-blue-400 text-xs mb-2"><?= e($m['position']) ?></div>
      <div class="flex gap-2">
        <a href="<?= url('/sso/team/edit/'.$m['id']) ?>" class="px-3 py-1 bg-white/5 border border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 text-xs rounded-lg transition-all duration-200">Edit</a>
        <form action="<?= url('/sso/team/delete/'.$m['id']) ?>" method="POST" onsubmit="return confirm('Hapus?')">
          <?= csrf_field() ?>
          <button type="submit" class="px-3 py-1 bg-white/5 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs rounded-lg transition-all duration-200">Hapus</button>
        </form>
      </div>
    </div>
  </div>
  <?php endforeach; else: ?>
  <div class="col-span-full py-12 text-center text-slate-500">Belum ada anggota tim. <a href="<?= url('/sso/team/create') ?>" class="text-blue-400 hover:text-blue-300">Tambah sekarang</a></div>
  <?php endif; ?>
</div>
