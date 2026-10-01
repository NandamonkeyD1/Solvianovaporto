<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl overflow-hidden">
  <table class="w-full">
    <thead><tr class="border-b border-white/8">
      <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Pengirim</th>
      <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide hidden md:table-cell">Subject</th>
      <th class="text-left px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide hidden lg:table-cell">Waktu</th>
      <th class="text-right px-5 py-4 text-slate-400 text-xs font-semibold uppercase tracking-wide">Aksi</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <?php if(!empty($messages)): foreach($messages as $m): ?>
      <tr class="hover:bg-white/2 transition-colors <?= !$m['is_read'] ? 'bg-blue-500/3' : '' ?>">
        <td class="px-5 py-4">
          <div class="flex items-center gap-2">
            <?php if(!$m['is_read']): ?><span class="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span><?php endif; ?>
            <div>
              <div class="text-white font-medium text-sm"><?= e($m['name']) ?></div>
              <div class="text-slate-500 text-xs"><?= e($m['email']) ?></div>
            </div>
          </div>
        </td>
        <td class="px-5 py-4 hidden md:table-cell text-slate-400 text-sm"><?= e(excerpt($m['subject'] ?: $m['message'], 50)) ?></td>
        <td class="px-5 py-4 hidden lg:table-cell text-slate-500 text-xs"><?= time_ago($m['created_at']) ?></td>
        <td class="px-5 py-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <a href="<?= url('/sso/messages/'.$m['id']) ?>" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 text-xs rounded-lg transition-all duration-200">Baca</a>
            <form action="<?= url('/sso/messages/delete/'.$m['id']) ?>" method="POST" onsubmit="return confirm('Hapus?')"><?= csrf_field() ?><button type="submit" class="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs rounded-lg transition-all duration-200">Hapus</button></form>
          </div>
        </td>
      </tr>
      <?php endforeach; else: ?>
      <tr><td colspan="4" class="px-5 py-12 text-center text-slate-500">Belum ada pesan masuk.</td></tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
