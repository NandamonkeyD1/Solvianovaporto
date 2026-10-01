<div class="max-w-2xl">
  <a href="<?= url('/sso/messages') ?>" class="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    Kembali ke Messages
  </a>
  <div class="bg-[#0F172A]/60 border border-white/8 rounded-2xl p-6">
    <div class="grid md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/8">
      <?php foreach([['Nama',$message['name']],['Email',$message['email']],['WhatsApp',$message['phone'] ?: '-'],['Subject',$message['subject'] ?: '-'],['Waktu',format_date($message['created_at'],'d M Y H:i')]] as [$label,$value]): ?>
      <div><div class="text-slate-500 text-xs mb-1"><?= $label ?></div><div class="text-white text-sm font-medium"><?= e($value) ?></div></div>
      <?php endforeach; ?>
    </div>
    <div>
      <div class="text-slate-500 text-xs mb-2">Pesan</div>
      <div class="text-slate-300 leading-relaxed whitespace-pre-wrap"><?= e($message['message']) ?></div>
    </div>
    <div class="mt-6 flex gap-3">
      <?php if(!empty($message['email'])): ?>
      <a href="mailto:<?= e($message['email']) ?>" class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Balas via Email
      </a>
      <?php endif; ?>
      <?php if(!empty($message['phone'])): ?>
      <a href="https://wa.me/<?= preg_replace('/[^0-9]/','',$message['phone']) ?>" target="_blank" class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-400 text-sm font-semibold rounded-xl transition-all duration-200">
        Balas via WhatsApp
      </a>
      <?php endif; ?>
    </div>
  </div>
</div>
