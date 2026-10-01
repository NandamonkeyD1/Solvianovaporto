<div class="flex items-center justify-between mb-6">
  <div></div>
  <a href="<?= url('/sso/testimonials/create') ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Tambah Testimonial
  </a>
</div>
<div class="grid md:grid-cols-2 gap-4">
  <?php if(!empty($testimonials)): foreach($testimonials as $t): ?>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-5">
    <div class="flex items-start justify-between gap-3 mb-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm"><?= strtoupper(substr($t['client_name'],0,1)) ?></div>
        <div><div class="text-white font-semibold text-sm"><?= e($t['client_name']) ?></div><div class="text-slate-500 text-xs"><?= e($t['company']) ?></div></div>
      </div>
      <div class="flex gap-2">
        <a href="<?= url('/sso/testimonials/edit/'.$t['id']) ?>" class="px-3 py-1 bg-white/5 border border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 text-xs rounded-lg transition-all duration-200">Edit</a>
        <form action="<?= url('/sso/testimonials/delete/'.$t['id']) ?>" method="POST" onsubmit="return confirm('Hapus?')"><?= csrf_field() ?><button type="submit" class="px-3 py-1 bg-white/5 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs rounded-lg transition-all duration-200">Hapus</button></form>
      </div>
    </div>
    <p class="text-slate-400 text-sm italic">"<?= e(excerpt($t['testimonial'],100)) ?>"</p>
  </div>
  <?php endforeach; else: ?>
  <div class="col-span-full py-12 text-center text-slate-500">Belum ada testimonial.</div>
  <?php endif; ?>
</div>
