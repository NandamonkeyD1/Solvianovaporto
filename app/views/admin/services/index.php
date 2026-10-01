<div class="flex items-center justify-between mb-6">
  <div></div>
  <a href="<?= url('/sso/services/create') ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Tambah Service
  </a>
</div>
<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl overflow-hidden">
  <table class="w-full">
    <thead><tr class="border-b border-white/8">
      <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Nama</th>
      <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Kategori</th>
      <th class="text-center px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Status</th>
      <th class="text-right px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Aksi</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <?php if(!empty($services)): foreach($services as $s): ?>
      <tr class="hover:bg-white/2 transition-colors">
        <td class="px-5 py-4"><div class="text-white font-medium text-sm"><?= e($s['name']) ?></div><div class="text-slate-500 text-xs"><?= e($s['slug']) ?></div></td>
        <td class="px-5 py-4 hidden md:table-cell"><span class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full"><?= e($s['category']) ?></span></td>
        <td class="px-5 py-4 text-center"><span class="px-2.5 py-1 rounded-full text-xs font-medium <?= $s['is_active'] ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/15 text-slate-400 border border-slate-500/20' ?>"><?= $s['is_active'] ? 'Aktif' : 'Nonaktif' ?></span></td>
        <td class="px-5 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <a href="<?= url('/sso/services/edit/'.$s['id']) ?>" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 text-xs rounded-lg transition-all duration-200">Edit</a>
            <form action="<?= url('/sso/services/delete/'.$s['id']) ?>" method="POST" onsubmit="return confirm('Hapus?')"><?= csrf_field() ?><button type="submit" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs rounded-lg transition-all duration-200">Hapus</button></form>
          </div>
        </td>
      </tr>
      <?php endforeach; else: ?>
      <tr><td colspan="4" class="px-5 py-12 text-center text-slate-500">Belum ada service.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
