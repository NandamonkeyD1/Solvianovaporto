<div class="flex items-center justify-between mb-6">
  <div></div>
  <a href="<?= url('/sso/portfolio/create') ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Tambah Portfolio
  </a>
</div>

<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl overflow-hidden">
  <table class="w-full">
    <thead>
      <tr class="border-b border-white/8">
        <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Project</th>
        <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Kategori</th>
        <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Teknologi</th>
        <th class="text-center px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Status</th>
        <th class="text-right px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Aksi</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-white/5">
      <?php if(!empty($portfolios)): ?>
      <?php foreach($portfolios as $p): ?>
      <tr class="hover:bg-white/2 transition-colors">
        <td class="px-5 py-4">
          <div class="flex items-center gap-3">
            <?php if(!empty($p['thumbnail'])): ?>
            <img src="<?= url($p['thumbnail']) ?>" alt="" class="w-10 h-10 rounded-lg object-cover border border-white/10">
            <?php else: ?>
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <?php endif; ?>
            <div>
              <div class="text-white font-medium text-sm"><?= e($p['name']) ?></div>
              <div class="text-slate-500 text-xs"><?= e($p['slug']) ?></div>
            </div>
          </div>
        </td>
        <td class="px-5 py-4 hidden md:table-cell">
          <span class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full"><?= e($p['category']) ?></span>
        </td>
        <td class="px-5 py-4 hidden lg:table-cell">
          <span class="text-slate-400 text-xs"><?= e(substr($p['tech_stack'] ?? '', 0, 40)) ?><?= strlen($p['tech_stack'] ?? '') > 40 ? '...' : '' ?></span>
        </td>
        <td class="px-5 py-4 text-center">
          <span class="px-2.5 py-1 rounded-full text-xs font-medium <?= $p['is_active'] ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/15 text-slate-400 border border-slate-500/20' ?>">
            <?= $p['is_active'] ? 'Aktif' : 'Draft' ?>
          </span>
        </td>
        <td class="px-5 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <a href="<?= url('/sso/portfolio/edit/'.$p['id']) ?>" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 text-xs rounded-lg transition-all duration-200">Edit</a>
            <form action="<?= url('/sso/portfolio/delete/'.$p['id']) ?>" method="POST" onsubmit="return confirm('Hapus portfolio ini?')">
              <?= csrf_field() ?>
              <button type="submit" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs rounded-lg transition-all duration-200">Hapus</button>
            </form>
          </div>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php else: ?>
      <tr><td colspan="5" class="px-5 py-12 text-center text-slate-500">Belum ada portfolio. <a href="<?= url('/sso/portfolio/create') ?>" class="text-blue-400 hover:text-blue-300">Tambah sekarang</a></td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
