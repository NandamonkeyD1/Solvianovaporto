<div class="flex items-center justify-between mb-6">
  <div>
    <h2 class="text-white font-bold text-lg">Invoice</h2>
    <p class="text-slate-500 text-sm">Kelola invoice client</p>
  </div>
  <a href="<?= url('/sso/invoice/create') ?>" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-600/30">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    Buat Invoice Baru
  </a>
</div>

<?php if (empty($invoices)): ?>
<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-12 text-center">
  <svg class="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
  <p class="text-slate-400 text-sm mb-4">Belum ada invoice. Buat invoice pertama Anda.</p>
  <a href="<?= url('/sso/invoice/create') ?>" class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">Buat Invoice &rarr;</a>
</div>
<?php else: ?>
<div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-white/8">
          <th class="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">No. Invoice</th>
          <th class="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Klien</th>
          <th class="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Project</th>
          <th class="text-left px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Tanggal</th>
          <th class="text-right px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Total</th>
          <th class="text-center px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Status</th>
          <th class="text-right px-5 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($invoices as $inv): 
          $statusColor = match($inv['status']) {
            'paid'      => 'emerald',
            'sent'      => 'blue',
            'cancelled' => 'red',
            default     => 'yellow',
          };
          $statusLabel = match($inv['status']) {
            'paid'      => 'Lunas',
            'sent'      => 'Terkirim',
            'cancelled' => 'Batal',
            default     => 'Draft',
          };
        ?>
        <tr class="border-b border-white/5 hover:bg-white/3 transition-colors">
          <td class="px-5 py-4">
            <a href="<?= url('/sso/invoice/' . $inv['id']) ?>" class="text-blue-400 hover:text-blue-300 font-medium transition-colors"><?= e($inv['invoice_number']) ?></a>
          </td>
          <td class="px-5 py-4 text-white"><?= e($inv['client_name']) ?></td>
          <td class="px-5 py-4 text-slate-400"><?= e($inv['project_name']) ?></td>
          <td class="px-5 py-4 text-slate-400"><?= date('d/m/Y', strtotime($inv['invoice_date'])) ?></td>
          <td class="px-5 py-4 text-white text-right font-semibold">Rp <?= number_format($inv['total'], 0, ',', '.') ?></td>
          <td class="px-5 py-4 text-center">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-<?= $statusColor ?>-500/10 border border-<?= $statusColor ?>-500/20 text-<?= $statusColor ?>-400">
              <span class="w-1.5 h-1.5 rounded-full bg-<?= $statusColor ?>-400"></span>
              <?= $statusLabel ?>
            </span>
          </td>
          <td class="px-5 py-4 text-right">
            <div class="flex items-center justify-end gap-2">
              <a href="<?= url('/sso/invoice/' . $inv['id']) ?>" class="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all" title="Lihat">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </a>
              <a href="<?= url('/sso/invoice/' . $inv['id'] . '/edit') ?>" class="p-2 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all" title="Edit">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </a>
              <form action="<?= url('/sso/invoice/' . $inv['id'] . '/delete') ?>" method="POST" class="inline" onsubmit="return confirm('Hapus invoice ini?')">
                <?= csrf_field() ?>
                <button type="submit" class="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Hapus">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>
<?php endif; ?>
